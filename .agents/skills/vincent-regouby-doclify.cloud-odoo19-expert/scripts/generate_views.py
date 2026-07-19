#!/usr/bin/env python3
"""
Generate Odoo 19 views (form, tree, search, kanban) following OCA guidelines.
Usage: python generate_views.py <model_name> --module <module_path> --views form,tree,search
"""

import os
import argparse
from pathlib import Path


def snake_case(name):
    """Convert name to snake_case."""
    return name.lower().replace('-', '_').replace(' ', '_').replace('.', '_')


def generate_form_view(model_name, view_name):
    """Generate form view template."""
    return f'''
    <record id="{view_name}_form" model="ir.ui.view">
        <field name="name">{model_name}.form</field>
        <field name="model">{model_name}</field>
        <field name="arch" type="xml">
            <form string="{model_name.replace('.', ' ').title()}">
                <header>
                    <button name="action_confirm" string="Confirm" type="object"
                            invisible="state != 'draft'" class="oe_highlight"/>
                    <button name="action_cancel" string="Cancel" type="object"
                            invisible="state in ('cancelled', 'done')"/>
                    <button name="action_draft" string="Reset to Draft" type="object"
                            invisible="state == 'draft'"/>
                    <field name="state" widget="statusbar"
                           statusbar_visible="draft,confirmed,done"/>
                </header>
                <sheet>
                    <div class="oe_button_box" name="button_box">
                        <!-- Add stat buttons here -->
                    </div>
                    <widget name="web_ribbon" title="Archived" bg_color="text-bg-danger"
                            invisible="active"/>
                    <group>
                        <group name="main_info">
                            <field name="name"/>
                            <field name="active" invisible="1"/>
                            <field name="company_id" groups="base.group_multi_company"/>
                        </group>
                        <group name="additional_info">
                            <!-- Add more fields here -->
                        </group>
                    </group>
                    <notebook>
                        <page string="Description" name="description">
                            <field name="description"/>
                        </page>
                        <!-- Add more pages here -->
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
'''


def generate_tree_view(model_name, view_name):
    """Generate tree view template."""
    return f'''
    <record id="{view_name}_tree" model="ir.ui.view">
        <field name="name">{model_name}.tree</field>
        <field name="model">{model_name}</field>
        <field name="arch" type="xml">
            <tree string="{model_name.replace('.', ' ').title()}"
                  sample="1"
                  multi_edit="1">
                <field name="name"/>
                <field name="state" widget="badge"
                       decoration-success="state == 'done'"
                       decoration-info="state == 'confirmed'"
                       decoration-warning="state == 'draft'"
                       decoration-danger="state == 'cancelled'"/>
                <field name="company_id" groups="base.group_multi_company"/>
            </tree>
        </field>
    </record>
'''


def generate_search_view(model_name, view_name):
    """Generate search view template."""
    return f'''
    <record id="{view_name}_search" model="ir.ui.view">
        <field name="name">{model_name}.search</field>
        <field name="model">{model_name}</field>
        <field name="arch" type="xml">
            <search string="{model_name.replace('.', ' ').title()}">
                <field name="name" string="Name"
                       filter_domain="['|', ('name', 'ilike', self), ('description', 'ilike', self)]"/>
                <separator/>
                <filter string="Draft" name="filter_draft"
                        domain="[('state', '=', 'draft')]"/>
                <filter string="Confirmed" name="filter_confirmed"
                        domain="[('state', '=', 'confirmed')]"/>
                <filter string="Done" name="filter_done"
                        domain="[('state', '=', 'done')]"/>
                <separator/>
                <filter string="Archived" name="filter_inactive"
                        domain="[('active', '=', False)]"/>
                <separator/>
                <filter string="My Records" name="filter_my_records"
                        domain="[('create_uid', '=', uid)]"/>
                <group expand="0" string="Group By">
                    <filter string="Status" name="group_state"
                            context="{{'group_by': 'state'}}"/>
                    <filter string="Company" name="group_company"
                            context="{{'group_by': 'company_id'}}"
                            groups="base.group_multi_company"/>
                </group>
                <searchpanel>
                    <field name="state" icon="fa-check-circle" enable_counters="1"/>
                </searchpanel>
            </search>
        </field>
    </record>
'''


def generate_kanban_view(model_name, view_name):
    """Generate kanban view template."""
    return f'''
    <record id="{view_name}_kanban" model="ir.ui.view">
        <field name="name">{model_name}.kanban</field>
        <field name="model">{model_name}</field>
        <field name="arch" type="xml">
            <kanban string="{model_name.replace('.', ' ').title()}"
                    sample="1"
                    default_group_by="state">
                <field name="name"/>
                <field name="state"/>
                <field name="active"/>
                <templates>
                    <t t-name="kanban-box">
                        <div class="oe_kanban_global_click">
                            <div class="o_kanban_record_top">
                                <div class="o_kanban_record_headings">
                                    <strong class="o_kanban_record_title">
                                        <field name="name"/>
                                    </strong>
                                </div>
                                <div class="o_dropdown_kanban dropdown">
                                    <a class="dropdown-toggle o-no-caret btn" role="button"
                                       data-bs-toggle="dropdown" href="#" aria-label="Dropdown menu"
                                       title="Dropdown menu">
                                        <span class="fa fa-ellipsis-v"/>
                                    </a>
                                    <div class="dropdown-menu" role="menu">
                                        <a role="menuitem" type="edit" class="dropdown-item">Edit</a>
                                        <a role="menuitem" type="delete" class="dropdown-item">Delete</a>
                                    </div>
                                </div>
                            </div>
                            <div class="o_kanban_record_body">
                                <field name="description"/>
                            </div>
                            <div class="o_kanban_record_bottom">
                                <div class="oe_kanban_bottom_left">
                                    <!-- Add left elements here -->
                                </div>
                                <div class="oe_kanban_bottom_right">
                                    <!-- Add right elements here -->
                                </div>
                            </div>
                        </div>
                    </t>
                </templates>
            </kanban>
        </field>
    </record>
'''


def generate_action(model_name, view_name):
    """Generate window action."""
    return f'''
    <record id="{view_name}_action" model="ir.actions.act_window">
        <field name="name">{model_name.replace('.', ' ').title()}</field>
        <field name="res_model">{model_name}</field>
        <field name="view_mode">tree,form,kanban</field>
        <field name="context">{{}}</field>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
                Create your first {model_name.replace('.', ' ')}!
            </p>
        </field>
    </record>
'''


def generate_views(model_name, module_path, views_types):
    """Generate views for a model."""
    module_path = Path(module_path)
    views_dir = module_path / "views"
    
    if not views_dir.exists():
        print(f"❌ Error: views directory not found at {views_dir}")
        return
    
    model_name_snake = snake_case(model_name.replace('.', '_'))
    view_file = views_dir / f"{model_name_snake}_views.xml"
    
    # Generate XML content
    xml_content = '<?xml version="1.0" encoding="utf-8"?>\n<odoo>\n'
    
    if 'form' in views_types:
        xml_content += generate_form_view(model_name, model_name_snake)
    
    if 'tree' in views_types:
        xml_content += generate_tree_view(model_name, model_name_snake)
    
    if 'search' in views_types:
        xml_content += generate_search_view(model_name, model_name_snake)
    
    if 'kanban' in views_types:
        xml_content += generate_kanban_view(model_name, model_name_snake)
    
    # Add action
    xml_content += generate_action(model_name, model_name_snake)
    
    xml_content += '\n</odoo>\n'
    
    # Write views file
    with open(view_file, "w") as f:
        f.write(xml_content)
    
    print(f"✅ Views for '{model_name}' created successfully at {view_file}")
    print(f"\nGenerated views: {', '.join(views_types)}")
    print("\nNext steps:")
    print(f"1. Customize the views in {view_file}")
    print(f"2. Add the views file to __manifest__.py data section")
    print(f"3. Create menu entries in views/menu.xml")
    
    return str(view_file)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Odoo 19 views (OCA compliant)")
    parser.add_argument("model_name", help="Model name (e.g., my.custom.model)")
    parser.add_argument("--module", required=True, help="Path to the module directory")
    parser.add_argument("--views", default="form,tree,search", help="Comma-separated view types (form,tree,search,kanban)")
    
    args = parser.parse_args()
    
    views_types = [v.strip() for v in args.views.split(',')]
    generate_views(args.model_name, args.module, views_types)
