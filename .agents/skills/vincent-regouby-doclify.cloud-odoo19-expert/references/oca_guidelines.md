# OCA Guidelines Reference for Odoo 19

This document provides comprehensive guidelines from the Odoo Community Association (OCA) for developing high-quality Odoo 19 modules.

## Code Structure & Naming Conventions

### Module Structure

```
module_name/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── model_name.py
├── views/
│   ├── menu.xml
│   └── model_views.xml
├── security/
│   ├── security.xml
│   └── ir.model.access.csv
├── data/
│   └── data.xml
├── demo/
│   └── demo_data.xml
├── static/
│   ├── description/
│   │   ├── icon.png
│   │   └── index.html
│   └── src/
│       ├── js/
│       ├── css/
│       └── xml/
├── i18n/
├── tests/
│   ├── __init__.py
│   └── test_model.py
└── README.rst
```

### Naming Conventions

**Module Names:**

- Use snake_case: `sale_order_approval`
- Prefix with main dependency: `account_invoice_approval`
- Be descriptive and specific

**Model Names:**

- Use dot notation: `sale.order.line`
- Follow existing Odoo conventions
- Inherit: `_inherit = 'sale.order'`
- New models: `_name = 'custom.model'`

**Field Names:**

- Use snake_case: `partner_id`, `invoice_date`
- Boolean fields: prefix with `is_` or `has_`: `is_active`, `has_discount`
- Date fields: suffix with `_date`: `start_date`, `end_date`
- Many2one: suffix with `_id`: `partner_id`, `product_id`
- Many2many/One2many: suffix with `_ids`: `line_ids`, `tag_ids`

**Method Names:**

- Use snake_case
- Action methods: prefix with `action_`: `action_confirm()`, `action_cancel()`
- Compute methods: prefix with `_compute_`: `_compute_amount_total()`
- Constraint methods: prefix with `_check_`: `_check_dates()`
- Onchange methods: prefix with `_onchange_`: `_onchange_partner_id()`

**XML IDs:**

- Use snake_case
- Format: `{module}_{object_type}_{description}`
- Examples: `sale_order_approval_view_form`, `account_move_rule_company`

## Python Code Standards

### Import Order

```python
# 1. Standard library imports
import logging
from datetime import datetime

# 2. Third-party imports
import requests

# 3. Odoo imports
from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools import float_compare, float_is_zero

# 4. Relative imports
from .other_module import helper_function
```

### Class Definition

```python
class SaleOrder(models.Model):
    """
    Sale Order extension with approval workflow.

    This model extends the base sale.order to add multi-level
    approval functionality based on order amounts.
    """
    _inherit = "sale.order"
    _description = "Sale Order with Approval"

    # Fields definition here
```

### Field Definition Best Practices

```python
# Good: Comprehensive field definition
amount_total = fields.Monetary(
    string="Total Amount",
    compute="_compute_amount_total",
    store=True,
    currency_field="currency_id",
    help="Total amount including taxes",
)

# Many2one with proper attributes
partner_id = fields.Many2one(
    comodel_name="res.partner",
    string="Customer",
    required=True,
    ondelete="restrict",
    index=True,
    tracking=True,
)

# Selection with clear states
state = fields.Selection(
    selection=[
        ("draft", "Draft"),
        ("sent", "Quotation Sent"),
        ("sale", "Sales Order"),
        ("done", "Locked"),
        ("cancel", "Cancelled"),
    ],
    string="Status",
    default="draft",
    required=True,
    tracking=True,
    copy=False,
)
```

### Computed Fields

```python
# Use @api.depends for computed fields
@api.depends("order_line.price_total")
def _compute_amount_total(self):
    """Compute the total amount of the order."""
    for order in self:
        order.amount_total = sum(order.order_line.mapped("price_total"))

# Inverse method when needed
@api.depends("partner_id.name", "partner_id.ref")
def _compute_partner_display_name(self):
    for record in self:
        if record.partner_id.ref:
            record.partner_display_name = f"[{record.partner_id.ref}] {record.partner_id.name}"
        else:
            record.partner_display_name = record.partner_id.name

def _inverse_partner_display_name(self):
    for record in self:
        # Handle inverse computation
        pass
```

### Constraints

```python
# SQL Constraints (preferred when possible)
_sql_constraints = [
    (
        "name_company_uniq",
        "UNIQUE(name, company_id)",
        "The name must be unique per company!",
    ),
    (
        "check_amount_positive",
        "CHECK(amount >= 0)",
        "The amount must be positive!",
    ),
]

# Python Constraints (for complex logic)
@api.constrains("date_start", "date_end")
def _check_dates(self):
    """Ensure end date is after start date."""
    for record in self:
        if record.date_end and record.date_start:
            if record.date_end < record.date_start:
                raise ValidationError(
                    _("End date must be after start date!")
                )
```

### CRUD Methods

```python
# Create
@api.model_create_multi
def create(self, vals_list):
    """Override create to add sequence number."""
    for vals in vals_list:
        if vals.get("name", "/") == "/":
            vals["name"] = self.env["ir.sequence"].next_by_code(
                "sale.order"
            ) or "/"
    records = super().create(vals_list)
    records._post_create_hook()
    return records

# Write
def write(self, vals):
    """Override write to validate state changes."""
    if "state" in vals:
        self._validate_state_change(vals["state"])
    res = super().write(vals)
    if "partner_id" in vals:
        self._update_partner_info()
    return res

# Unlink
def unlink(self):
    """Prevent deletion of confirmed orders."""
    for record in self:
        if record.state not in ("draft", "cancel"):
            raise UserError(
                _("Cannot delete order %s in state %s!")
                % (record.name, record.state)
            )
    return super().unlink()
```

### Action Methods

```python
def action_confirm(self):
    """Confirm the sale order."""
    self.ensure_one()
    if not self.order_line:
        raise UserError(_("Cannot confirm an order without lines!"))

    self.write({
        "state": "sale",
        "date_order": fields.Datetime.now(),
    })
    self._send_confirmation_email()
    return True

def action_cancel(self):
    """Cancel the order and related documents."""
    for order in self:
        if order.invoice_ids.filtered(lambda inv: inv.state == "posted"):
            raise UserError(
                _("Cannot cancel order %s with posted invoices!")
                % order.name
            )

    self.write({"state": "cancel"})
    return True
```

## XML Standards

### View Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>

    <!-- Form View -->
    <record id="view_model_form" model="ir.ui.view">
        <field name="name">model.name.form</field>
        <field name="model">model.name</field>
        <field name="arch" type="xml">
            <form string="Model Title">
                <header>
                    <!-- Status bar and buttons -->
                </header>
                <sheet>
                    <div class="oe_button_box" name="button_box">
                        <!-- Smart buttons -->
                    </div>
                    <widget name="web_ribbon" title="Archived"
                            bg_color="text-bg-danger"
                            invisible="active"/>
                    <group>
                        <group name="left">
                            <!-- Left column fields -->
                        </group>
                        <group name="right">
                            <!-- Right column fields -->
                        </group>
                    </group>
                    <notebook>
                        <page string="Page 1" name="page1">
                            <!-- Page content -->
                        </page>
                    </notebook>
                </sheet>
                <chatter>
                    <field name="message_follower_ids"/>
                    <field name="activity_ids"/>
                    <field name="message_ids"/>
                </chatter>
            </form>
        </field>
    </record>

</odoo>
```

### Tree View Best Practices

```xml
<record id="view_model_tree" model="ir.ui.view">
    <field name="name">model.name.tree</field>
    <field name="model">model.name</field>
    <field name="arch" type="xml">
        <tree string="Model Records"
              sample="1"
              multi_edit="1"
              export_xlsx="0">
            <field name="name" readonly="state != 'draft'"/>
            <field name="partner_id"/>
            <field name="date"/>
            <field name="amount_total" sum="Total"/>
            <field name="state"
                   widget="badge"
                   decoration-success="state == 'done'"
                   decoration-info="state == 'confirmed'"
                   decoration-warning="state == 'draft'"
                   decoration-danger="state == 'cancelled'"/>
        </tree>
    </field>
</record>
```

### Search View with Filters

```xml
<record id="view_model_search" model="ir.ui.view">
    <field name="name">model.name.search</field>
    <field name="model">model.name</field>
    <field name="arch" type="xml">
        <search string="Search Model">
            <!-- Search fields -->
            <field name="name"
                   filter_domain="['|', ('name', 'ilike', self), ('reference', 'ilike', self)]"/>
            <field name="partner_id"/>

            <separator/>

            <!-- Filters -->
            <filter string="Draft" name="filter_draft"
                    domain="[('state', '=', 'draft')]"/>
            <filter string="Confirmed" name="filter_confirmed"
                    domain="[('state', '=', 'confirmed')]"/>

            <separator/>

            <filter string="My Records" name="filter_my"
                    domain="[('create_uid', '=', uid)]"/>

            <separator/>

            <filter string="Archived" name="filter_inactive"
                    domain="[('active', '=', False)]"/>

            <!-- Group By -->
            <group expand="0" string="Group By">
                <filter string="Status" name="group_state"
                        context="{'group_by': 'state'}"/>
                <filter string="Partner" name="group_partner"
                        context="{'group_by': 'partner_id'}"/>
                <filter string="Date" name="group_date"
                        context="{'group_by': 'date:month'}"/>
            </group>

            <!-- Search Panel -->
            <searchpanel>
                <field name="state" icon="fa-check-circle" enable_counters="1"/>
                <field name="company_id" groups="base.group_multi_company"
                       icon="fa-building" enable_counters="1"/>
            </searchpanel>
        </search>
    </field>
</record>
```

## Security

### Access Rights (ir.model.access.csv)

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_model_user,model.user,model_model_name,base.group_user,1,0,0,0
access_model_manager,model.manager,model_model_name,group_module_manager,1,1,1,1
```

### Record Rules

```xml
<!-- Multi-company rule -->
<record id="model_company_rule" model="ir.rule">
    <field name="name">Model: multi-company</field>
    <field name="model_id" ref="model_model_name"/>
    <field name="global" eval="True"/>
    <field name="domain_force">[
        '|',
            ('company_id', '=', False),
            ('company_id', 'in', company_ids),
    ]</field>
</record>

<!-- User-specific rule -->
<record id="model_user_rule" model="ir.rule">
    <field name="name">Model: user own records</field>
    <field name="model_id" ref="model_model_name"/>
    <field name="domain_force">[('create_uid', '=', user.id)]</field>
    <field name="groups" eval="[(4, ref('base.group_user'))]"/>
</record>
```

## Performance Optimization

### Efficient Queries

```python
# Bad: Multiple database queries in loop
for order in self:
    partner = order.partner_id
    print(partner.name)

# Good: Prefetch all partners at once
orders = self
partners = orders.mapped('partner_id')
for order in orders:
    print(order.partner_id.name)

# Bad: Searching in loop
for line in self.order_line:
    product = self.env['product.product'].search([('id', '=', line.product_id.id)])

# Good: Use recordset operations
products = self.order_line.mapped('product_id')
```

### Batch Operations

```python
# Use create_multi for bulk creation
@api.model_create_multi
def create(self, vals_list):
    return super().create(vals_list)

# Batch write operations
records.write({'state': 'done'})  # Single SQL UPDATE

# Use SQL for mass updates when appropriate
self.env.cr.execute("""
    UPDATE sale_order
    SET state = 'done'
    WHERE id IN %s
""", (tuple(self.ids),))
```

### Computed Fields Storage

```python
# Store computed fields when frequently accessed
amount_total = fields.Monetary(
    compute="_compute_amount_total",
    store=True,  # Store to avoid recomputation
)

# Use appropriate depends
@api.depends("line_ids.price_subtotal", "line_ids.tax_ids")
def _compute_amount_total(self):
    for order in self:
        order.amount_total = sum(order.line_ids.mapped("price_total"))
```

## Testing

### Unit Tests Structure

```python
from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError


class TestSaleOrder(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.partner = cls.env.ref("base.res_partner_1")
        cls.product = cls.env.ref("product.product_product_1")

    def test_create_order(self):
        """Test order creation."""
        order = self.env["sale.order"].create({
            "partner_id": self.partner.id,
        })
        self.assertTrue(order)
        self.assertEqual(order.state, "draft")

    def test_order_validation(self):
        """Test order validation constraints."""
        order = self.env["sale.order"].create({
            "partner_id": self.partner.id,
        })
        with self.assertRaises(ValidationError):
            order.action_confirm()  # Should fail without lines
```

## Odoo 19 Specific Features

### OWL Components

```javascript
/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class CustomWidget extends Component {
    static template = "module_name.CustomWidget";
    static props = {
        value: String,
    };
}

registry.category("fields").add("custom_widget", CustomWidget);
```

### New API Features

- Enhanced search panel with better UX
- Improved multi-edit capabilities
- Better mobile responsiveness
- Enhanced JavaScript framework (OWL)

## Documentation

### README.rst Structure

```rst
=============
Module Name
=============

.. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !! This file is generated by oca-gen-addon-readme !!
   !! changes will be overwritten.                   !!
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

.. |badge1| image:: https://img.shields.io/badge/maturity-Beta-yellow.png
    :target: https://odoo-community.org/page/development-status
    :alt: Beta

|badge1|

This module allows you to...

**Table of contents**

.. contents::
   :local:

Configuration
=============

To configure this module, you need to:

#. Go to Settings > Technical > ...
#. Configure ...

Usage
=====

To use this module, you need to:

#. Go to ...
#. ...

Bug Tracker
===========

Bugs are tracked on `GitHub Issues
<https://github.com/OCA/project-name/issues>`_.

Credits
=======

Authors
~~~~~~~

* Your Company

Contributors
~~~~~~~~~~~~

* Your Name <your.email@example.com>

Maintainers
~~~~~~~~~~~

This module is maintained by the OCA.
```

## Common Patterns

### Workflow State Management

```python
def _get_next_state(self, current_state):
    """Get next workflow state."""
    transitions = {
        'draft': 'confirmed',
        'confirmed': 'done',
        'done': False,
    }
    return transitions.get(current_state)
```

### Smart Buttons

```python
# Compute method for count
@api.depends('invoice_ids')
def _compute_invoice_count(self):
    for order in self:
        order.invoice_count = len(order.invoice_ids)

# Action method
def action_view_invoices(self):
    self.ensure_one()
    return {
        'type': 'ir.actions.act_window',
        'name': _('Invoices'),
        'res_model': 'account.move',
        'view_mode': 'tree,form',
        'domain': [('id', 'in', self.invoice_ids.ids)],
        'context': {'default_move_type': 'out_invoice'},
    }
```

## References

- OCA Guidelines: https://github.com/OCA/odoo-community.org
- OCA Maintainer Tools: https://github.com/OCA/maintainer-tools
- Odoo Development Documentation: https://www.odoo.com/documentation/19.0/developer.html
