#!/usr/bin/env python3
"""
Generate Odoo 19 model following OCA guidelines.
Usage: python generate_model.py <model_name> --module <module_path>
"""

import os
import argparse
from pathlib import Path


def snake_case(name):
    """Convert name to snake_case."""
    return name.lower().replace('-', '_').replace(' ', '_').replace('.', '_')


def camel_case(name):
    """Convert name to CamelCase."""
    parts = name.replace('.', '_').replace('-', '_').split('_')
    return ''.join(word.capitalize() for word in parts)


def generate_model(model_name, module_path, description="Model description"):
    """Generate a complete Odoo model file."""
    module_path = Path(module_path)
    models_dir = module_path / "models"
    
    if not models_dir.exists():
        print(f"❌ Error: models directory not found at {models_dir}")
        return
    
    # Model names
    model_name_snake = snake_case(model_name)
    model_name_odoo = model_name.replace('_', '.')
    class_name = camel_case(model_name)
    
    # Model file content
    model_content = f'''# Copyright YEAR YOUR_NAME
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError


class {class_name}(models.Model):
    """
    {description}
    """
    _name = "{model_name_odoo}"
    _description = "{description}"
    _order = "name"
    
    # Fields
    name = fields.Char(
        string="Name",
        required=True,
        index=True,
        copy=False,
    )
    
    active = fields.Boolean(
        string="Active",
        default=True,
    )
    
    description = fields.Text(
        string="Description",
    )
    
    state = fields.Selection(
        selection=[
            ("draft", "Draft"),
            ("confirmed", "Confirmed"),
            ("done", "Done"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        default="draft",
        required=True,
        tracking=True,
    )
    
    company_id = fields.Many2one(
        comodel_name="res.company",
        string="Company",
        default=lambda self: self.env.company,
        required=True,
    )
    
    # Relational fields example
    # partner_id = fields.Many2one(
    #     comodel_name="res.partner",
    #     string="Partner",
    #     required=True,
    #     ondelete="restrict",
    # )
    
    # Computed fields example
    # amount_total = fields.Float(
    #     string="Total Amount",
    #     compute="_compute_amount_total",
    #     store=True,
    # )
    
    # SQL Constraints
    _sql_constraints = [
        (
            "name_company_uniq",
            "UNIQUE(name, company_id)",
            "The name must be unique per company!",
        ),
    ]
    
    # Computed methods
    # @api.depends("line_ids.amount")
    # def _compute_amount_total(self):
    #     for record in self:
    #         record.amount_total = sum(record.line_ids.mapped("amount"))
    
    # Constraint methods
    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name:
                raise ValidationError(_("Name cannot be empty!"))
    
    # CRUD methods
    @api.model_create_multi
    def create(self, vals_list):
        """Override create to add custom logic."""
        records = super().create(vals_list)
        # Add your custom logic here
        return records
    
    def write(self, vals):
        """Override write to add custom logic."""
        res = super().write(vals)
        # Add your custom logic here
        return res
    
    def unlink(self):
        """Override unlink to add custom logic."""
        for record in self:
            if record.state not in ("draft", "cancelled"):
                raise UserError(
                    _("You cannot delete a record in state %s!") % record.state
                )
        return super().unlink()
    
    # Action methods
    def action_confirm(self):
        """Confirm the record."""
        self.ensure_one()
        self.write({{"state": "confirmed"}})
    
    def action_cancel(self):
        """Cancel the record."""
        self.ensure_one()
        self.write({{"state": "cancelled"}})
    
    def action_draft(self):
        """Reset to draft."""
        self.ensure_one()
        self.write({{"state": "draft"}})
    
    # Name methods
    def name_get(self):
        """Override name_get to customize display name."""
        result = []
        for record in self:
            name = record.name
            # Add custom logic to build display name
            result.append((record.id, name))
        return result
    
    @api.model
    def _name_search(self, name="", args=None, operator="ilike", limit=100, name_get_uid=None):
        """Override _name_search for custom search behavior."""
        args = args or []
        if name:
            args = [("name", operator, name)] + args
        return self._search(args, limit=limit, access_rights_uid=name_get_uid)
'''
    
    # Write model file
    model_file = models_dir / f"{model_name_snake}.py"
    with open(model_file, "w") as f:
        f.write(model_content)
    
    # Update models/__init__.py
    init_file = models_dir / "__init__.py"
    with open(init_file, "r") as f:
        init_content = f.read()
    
    import_line = f"from . import {model_name_snake}\n"
    if import_line not in init_content:
        # Add import before the last line or at the end
        lines = init_content.splitlines(keepends=True)
        if lines and not lines[-1].strip().startswith("from"):
            lines.insert(-1, import_line)
        else:
            lines.append(import_line)
        
        with open(init_file, "w") as f:
            f.writelines(lines)
    
    print(f"✅ Model '{model_name_odoo}' created successfully at {model_file}")
    print(f"✅ Updated {init_file}")
    print("\nNext steps:")
    print(f"1. Customize the model fields in {model_file}")
    print(f"2. Create corresponding views in views/")
    print(f"3. Add security rules in security/ir.model.access.csv")
    
    return str(model_file)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Odoo 19 model (OCA compliant)")
    parser.add_argument("model_name", help="Model name (e.g., my.custom.model or my_custom_model)")
    parser.add_argument("--module", required=True, help="Path to the module directory")
    parser.add_argument("--description", default="Model description", help="Model description")
    
    args = parser.parse_args()
    
    generate_model(args.model_name, args.module, args.description)
