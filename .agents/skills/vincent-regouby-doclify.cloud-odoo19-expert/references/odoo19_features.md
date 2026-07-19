# Odoo 19 New Features and Optimizations

This document covers the major changes, new features, and optimizations introduced in Odoo 19.

## Core Framework Changes

### OWL 2.0 (Odoo Web Library)

Odoo 19 fully migrates to OWL 2.0, the modern JavaScript framework for building reactive components.

**Key Changes:**

```javascript
/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class MyComponent extends Component {
    static template = "my_module.MyComponent";
    static props = {
        recordId: Number,
        mode: { type: String, optional: true },
    };

    setup() {
        this.state = useState({
            data: [],
            isLoading: false,
        });
        this.orm = useService("orm");
        this.action = useService("action");
    }

    async loadData() {
        this.state.isLoading = true;
        try {
            this.state.data = await this.orm.call(
                "my.model",
                "search_read",
                [],
                { fields: ["name", "value"] },
            );
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("fields").add("my_widget", MyComponent);
```

### Python 3.11+ Support

Odoo 19 requires Python 3.11 or higher, enabling:

- Performance improvements (10-15% faster)
- Better error messages
- New type hinting features

### Database Optimization

**Indexing Improvements:**

```python
class MyModel(models.Model):
    _name = "my.model"

    name = fields.Char(index=True)  # Standard index

    # Composite index for better query performance
    _sql_constraints = [
        (
            "idx_partner_date",
            "CREATE INDEX IF NOT EXISTS idx_partner_date ON my_model (partner_id, date)",
            "Composite index on partner and date"
        ),
    ]
```

**Query Optimization:**

```python
# Use `_search` instead of `search` for better performance
def get_records(self):
    # Old way (slower)
    records = self.env["sale.order"].search([("state", "=", "draft")])

    # New optimized way
    record_ids = self.env["sale.order"]._search([("state", "=", "draft")])
    records = self.env["sale.order"].browse(record_ids)
```

## New Model Features

### Enhanced Computed Fields

```python
class SaleOrder(models.Model):
    _inherit = "sale.order"

    # Precompute with better caching
    amount_total = fields.Monetary(
        compute="_compute_amount_total",
        precompute=True,  # New in Odoo 19
        readonly=False,
        store=True,
    )

    @api.depends("order_line.price_total")
    def _compute_amount_total(self):
        for order in self:
            order.amount_total = sum(order.order_line.mapped("price_total"))
```

### Improved Many2many Fields

```python
# Better performance for many2many operations
class Product(models.Model):
    _inherit = "product.product"

    category_ids = fields.Many2many(
        "product.category",
        string="Categories",
        prefetch=True,  # Improved prefetching in Odoo 19
    )

    # Optimized many2many search
    @api.model
    def _search(self, domain, offset=0, limit=None, order=None, access_rights_uid=None):
        # Enhanced many2many domain handling
        return super()._search(domain, offset, limit, order, access_rights_uid)
```

### New Field Attributes

```python
class MyModel(models.Model):
    _name = "my.model"

    # New `prefetch` attribute for better performance
    partner_id = fields.Many2one(
        "res.partner",
        prefetch=True,  # Automatically prefetch related data
    )

    # Enhanced `tracking` with custom messages
    state = fields.Selection(
        [("draft", "Draft"), ("done", "Done")],
        tracking=True,
        track_sequence=10,  # Control tracking order
    )
```

## View Enhancements

### Enhanced Search Panel

```xml
<searchpanel>
    <!-- Multi-select support (new in Odoo 19) -->
    <field name="category_id"
           select="multi"
           enable_counters="1"
           icon="fa-tags"/>

    <!-- Hierarchical filters -->
    <field name="parent_id"
           hierarchize="1"
           icon="fa-folder"/>

    <!-- Dynamic ranges -->
    <field name="date_order"
           type="date_range"
           enable_counters="1"/>
</searchpanel>
```

### Improved Kanban Views

```xml
<kanban string="Tasks"
        sample="1"
        quick_create="1"
        quick_create_view="module.quick_create_view"
        records_draggable="1"
        group_create="1"
        group_delete="1"
        group_edit="1"
        archivable="1"
        default_group_by="stage_id">

    <!-- New progress bar widget -->
    <progressbar field="kanban_state"
                 colors='{"done": "success", "blocked": "danger"}'
                 sum_field="planned_hours"/>

    <templates>
        <t t-name="kanban-box">
            <div class="oe_kanban_global_click">
                <!-- Enhanced card layout -->
                <div class="o_kanban_image">
                    <img t-att-src="kanban_image('res.users', 'avatar_128', record.user_id.raw_value)"
                         alt="User Avatar"/>
                </div>
                <div class="oe_kanban_details">
                    <strong><field name="name"/></strong>
                    <div class="o_kanban_tags_section">
                        <field name="tag_ids" widget="many2many_tags"
                               options="{'color_field': 'color'}"/>
                    </div>
                </div>
            </div>
        </t>
    </templates>
</kanban>
```

### Enhanced List View Features

```xml
<tree string="Orders"
      multi_edit="1"
      sample="1"
      export_xlsx="1"
      import="1"
      editable="bottom"
      decoration-success="state == 'done'"
      decoration-warning="state == 'draft'"
      decoration-danger="state == 'cancelled'"
      default_order="date_order desc">

    <!-- Inline editing improvements -->
    <field name="name"
           required="1"
           readonly="state != 'draft'"/>

    <!-- Better aggregation display -->
    <field name="amount_total"
           sum="Total"
           avg="Average"
           widget="monetary"/>

    <!-- New expand/collapse for o2m fields -->
    <field name="order_line"
           widget="one2many_list"
           mode="tree"/>
</tree>
```

## JavaScript/OWL Improvements

### New Service Pattern

```javascript
/** @odoo-module **/

import { registry } from "@web/core/registry";

const myService = {
    dependencies: ["orm", "notification"],

    start(env, { orm, notification }) {
        return {
            async doSomething(recordId) {
                try {
                    const result = await orm.call("my.model", "custom_method", [
                        recordId,
                    ]);
                    notification.add("Success!", { type: "success" });
                    return result;
                } catch (error) {
                    notification.add("Error: " + error.message, {
                        type: "danger",
                    });
                }
            },
        };
    },
};

registry.category("services").add("myService", myService);
```

### Enhanced Widget System

```javascript
/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class CustomFieldWidget extends Component {
    static template = "my_module.CustomFieldWidget";
    static props = {
        ...standardFieldProps,
        placeholder: { type: String, optional: true },
    };

    setup() {
        this.state = useState({
            value: this.props.record.data[this.props.name],
        });
    }

    get formattedValue() {
        // Custom formatting logic
        return this.state.value ? this.state.value.toUpperCase() : "";
    }

    async onChange(ev) {
        const newValue = ev.target.value;
        await this.props.record.update({
            [this.props.name]: newValue,
        });
    }
}

registry.category("fields").add("custom_field", {
    component: CustomFieldWidget,
    supportedTypes: ["char", "text"],
});
```

## Performance Optimizations

### Batch Loading

```python
class SaleOrder(models.Model):
    _inherit = "sale.order"

    @api.model
    def _read_group_raw(self, domain, fields, groupby, offset=0, limit=None,
                        orderby=False, lazy=True):
        """Optimized read_group for better performance."""
        # Batch load related data
        if 'partner_id' in groupby:
            self.env['res.partner'].browse()._prefetch_field('country_id')

        return super()._read_group_raw(
            domain, fields, groupby, offset, limit, orderby, lazy
        )
```

### Caching Improvements

```python
from odoo import tools

class ProductProduct(models.Model):
    _inherit = "product.product"

    @tools.ormcache('product_id')
    def _get_product_data(self, product_id):
        """Cache expensive computations."""
        product = self.browse(product_id)
        return {
            'name': product.name,
            'price': product.list_price,
            'qty_available': product.qty_available,
        }

    def invalidate_product_cache(self):
        """Clear cache when product changes."""
        self._get_product_data.clear_cache(self)
```

### SQL Optimization

```python
class StockMove(models.Model):
    _inherit = "stock.move"

    def _action_done(self):
        """Optimized done action with fewer SQL queries."""
        # Use SQL for bulk updates instead of ORM
        if len(self) > 100:
            self.env.cr.execute("""
                UPDATE stock_move
                SET state = 'done',
                    date = NOW()
                WHERE id IN %s
            """, (tuple(self.ids),))
            self.invalidate_recordset(['state', 'date'])
        else:
            return super()._action_done()
```

## API Changes

### New ORM Methods

```python
# Enhanced search with better performance
records = self.env["sale.order"].search_fetch(
    [("state", "=", "draft")],
    ["name", "partner_id", "amount_total"]
)

# Batch read with prefetching
data = self.env["product.product"].browse(product_ids).read(
    ["name", "list_price", "qty_available"],
    load="_classic_write"
)

# Improved exists() method
if records.exists():  # More efficient in Odoo 19
    records.action_confirm()
```

### Enhanced Domain Support

```python
# New domain operators
domain = [
    ("date", ">=", "2024-01-01"),
    ("amount_total", "in_range", [100, 1000]),  # New operator
    ("partner_id.country_id.code", "=like", "US%"),  # Enhanced pattern matching
]

# Better domain normalization
normalized = self.env["sale.order"]._normalize_domain(domain)
```

## Security Enhancements

### Improved Access Rights

```xml
<!-- More granular access control -->
<record id="sale_order_portal_rule" model="ir.rule">
    <field name="name">Portal User: see own orders</field>
    <field name="model_id" ref="model_sale_order"/>
    <field name="domain_force">[
        ('message_partner_ids', 'in', [user.partner_id.id])
    ]</field>
    <field name="groups" eval="[(4, ref('base.group_portal'))]"/>
    <field name="perm_read" eval="True"/>
    <field name="perm_write" eval="False"/>
    <field name="perm_create" eval="False"/>
    <field name="perm_unlink" eval="False"/>
</record>
```

### Enhanced Sudo Control

```python
class SaleOrder(models.Model):
    _inherit = "sale.order"

    def action_confirm(self):
        """Confirm with controlled sudo access."""
        # Use sudo only for specific operations
        self.check_access_rights('write')
        self.check_access_rule('write')

        # Controlled sudo for specific field
        self.sudo(lambda r: r.with_context(
            allowed_company_ids=r.company_id.ids
        )).write({'state': 'sale'})
```

## Migration Tips

### From Odoo 18 to 19

**Model Changes:**

```python
# Old (Odoo 18)
@api.multi
def my_method(self):
    for record in self:
        pass

# New (Odoo 19) - @api.multi removed
def my_method(self):
    for record in self:
        pass
```

**View Changes:**

```xml
<!-- Old class names -->
<button class="oe_highlight"/>

<!-- New class names (Bootstrap 5) -->
<button class="btn-primary"/>
```

**JavaScript Changes:**

```javascript
// Old (Odoo 18)
const MyWidget = Widget.extend({
    start: function () {
        // initialization
    },
});

// New (Odoo 19) - Pure OWL
export class MyWidget extends Component {
    setup() {
        // initialization
    }
}
```

## Best Practices for Odoo 19

### Use Async Operations

```python
from odoo import models, api
from odoo.addons.base.models.assetsbundle import AssetNotFound

class MyModel(models.Model):
    _name = "my.model"

    @api.model
    async def fetch_external_data(self):
        """Use async for I/O operations."""
        import aiohttp

        async with aiohttp.ClientSession() as session:
            async with session.get('https://api.example.com/data') as resp:
                return await resp.json()
```

### Leverage New Caching

```python
from functools import lru_cache

class ProductTemplate(models.Model):
    _inherit = "product.template"

    @lru_cache(maxsize=1000)
    def _get_tax_amount(self, price, tax_ids_tuple):
        """Use Python's lru_cache for pure computations."""
        taxes = self.env['account.tax'].browse(tax_ids_tuple)
        return taxes.compute_all(price, None, 1)['total_included']
```

### Optimize Database Queries

```python
# Use read_group instead of search + mapped
def get_order_totals_by_partner(self):
    # Bad
    orders = self.env["sale.order"].search([])
    totals = {}
    for partner_id in orders.mapped("partner_id.id"):
        totals[partner_id] = sum(
            orders.filtered(lambda o: o.partner_id.id == partner_id)
            .mapped("amount_total")
        )

    # Good
    totals = self.env["sale.order"].read_group(
        domain=[],
        fields=["partner_id", "amount_total:sum"],
        groupby=["partner_id"]
    )
```

## References

- Odoo 19 Official Documentation: https://www.odoo.com/documentation/19.0/
- OWL Documentation: https://github.com/odoo/owl
- Migration Guide: https://www.odoo.com/documentation/19.0/developer/howtos/upgrade.html
