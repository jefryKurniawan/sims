# Odoo Studio 19.0 Reference

Complete guide for customizing Odoo applications using Studio - the no-code customization toolkit.

## Overview

**Odoo Studio** is a powerful no-code customization tool that allows you to modify Odoo applications without writing Python code. It's perfect for:

- Adding custom fields to existing models
- Creating new views and customizing layouts
- Building automation rules and workflows
- Designing custom reports
- Rapid prototyping before coding modules

**Access Studio**: Navigate to any app → Click the **Toggle Studio** icon (🎨) in the top-right

**Documentation**: https://www.odoo.com/documentation/19.0/applications/studio.html

---

## Fields and Widgets

### Field Types (20 Available)

From a technical perspective, there are 15 field types in Odoo. Studio offers 20 field choices because some types appear multiple times with different default widgets.

#### Simple Fields

| Field                      | Description        | Use Case                           | Widget Options          |
| -------------------------- | ------------------ | ---------------------------------- | ----------------------- |
| **Text (Char)**            | Single-line text   | Names, titles, short descriptions  | -                       |
| **Multiline Text (Text)**  | Multi-line text    | Long descriptions, notes           | -                       |
| **Integer**                | Whole numbers      | Quantities, counts, years          | -                       |
| **Decimal (Float)**        | Decimal numbers    | Prices, measurements, rates        | Precision control       |
| **Monetary**               | Currency values    | Amounts, prices, costs             | Currency field required |
| **Html**                   | Rich text editor   | Formatted content, email templates | HTML widget             |
| **Date**                   | Date picker        | Birthdate, deadline, event date    | Calendar widget         |
| **Date & Time (Datetime)** | Date + time picker | Appointments, timestamps           | Datetime widget         |
| **Checkbox (Boolean)**     | True/False value   | Flags, yes/no questions            | Toggle, checkbox        |
| **Selection**              | Dropdown list      | Status, priority, category         | Selection widget        |

#### Relational Fields

| Field         | Description              | Use Case                   | Example              |
| ------------- | ------------------------ | -------------------------- | -------------------- |
| **Many2One**  | Link to one record       | Customer, product, user    | Invoice → Customer   |
| **One2Many**  | List of related records  | Order lines, invoice lines | Order → Order Lines  |
| **Many2Many** | Multiple selections      | Tags, categories, teams    | Product → Tags       |
| **Lines**     | Embedded list (one2many) | Editable grid within form  | Invoice lines editor |

#### Advanced Fields

| Field                    | Description              | Use Case               | Notes                |
| ------------------------ | ------------------------ | ---------------------- | -------------------- |
| **Related Field**        | Copy field from relation | Display related data   | Read-only by default |
| **Computed Field**       | Calculated value         | Total, count, average  | Requires Python code |
| **Image**                | Image upload             | Photo, logo, signature | Binary field         |
| **File**                 | File upload              | Documents, attachments | Binary field         |
| **Priority (Selection)** | Star rating              | Importance, urgency    | Star widget          |
| **Tag (Many2Many)**      | Color-coded tags         | Labels, categories     | Tag widget           |

### Field Configuration Options

When adding a field in Studio, configure:

```
Field Properties:
├── Label: Display name shown to users
├── Technical Name: Database column name (cannot change after creation)
├── Type: Field type (see table above)
├── Widget: Display widget (depends on field type)
├── Help: Tooltip text for users
├── Placeholder: Hint text in empty field
├── Required: Mandatory field (cannot be empty)
├── Readonly: Display only, cannot edit
├── Invisible: Hide field based on conditions
└── Default Value: Pre-filled value for new records
```

**Field Naming Convention**:

- Use snake_case: `customer_name`, `total_amount`
- Prefix custom fields: `x_custom_field` (optional but recommended)
- Avoid reserved names: `id`, `name`, `state`, `create_date`, etc.

---

## Views Customization

### View Types

Odoo Studio supports customization of 6 main view types:

| View         | Purpose              | Can Add New Fields? | Best For              |
| ------------ | -------------------- | ------------------- | --------------------- |
| **Form**     | Single record detail | ✅ Yes              | Detailed data entry   |
| **List**     | Table of records     | ✅ Yes              | Bulk viewing, sorting |
| **Kanban**   | Card-based board     | ❌ Existing only    | Visual workflows      |
| **Calendar** | Calendar grid        | ❌ Existing only    | Scheduling, events    |
| **Map**      | Geographic map       | ❌ Existing only    | Location-based data   |
| **Timeline** | Gantt chart          | ❌ Existing only    | Project planning      |

⚠️ **Important**: New fields can ONLY be added in Form and List views. Other views can only display existing fields.

### Form View Customization

**Layout Elements**:

```
Form Components:
├── Fields: Database fields
├── Tabs: Group related fields
├── Groups: Column layouts (1-4 columns)
├── Separators: Visual dividers
├── Notebook: Tabbed sections
├── Chatter: Messages and activities (at bottom)
├── Buttons: Actions (Header or Form buttons)
└── Smart Buttons: Related record counts (top-right)
```

**Best Practices**:

1. **Group Related Fields**: Use groups and tabs for organization

    ```xml
    <!-- Example structure -->
    <group name="customer_info" string="Customer Information">
      <field name="customer_name"/>
      <field name="customer_email"/>
    </group>
    ```

2. **Use 2-Column Layout**: Most readable for forms

    ```xml
    <group col="2">
      <field name="field1"/>
      <field name="field2"/>
    </group>
    ```

3. **Smart Buttons**: Show related record counts

    ```
    [📦 10 Orders] [📄 5 Invoices] [📞 3 Activities]
    ```

4. **Statusbar**: Show record progression
    ```
    Draft → Confirmed → Done → Cancelled
    ```

### List View Customization

**Configuration**:

```
List View Settings:
├── Columns: Select fields to display
├── Column Order: Drag to reorder
├── Column Width: Auto or fixed
├── Editable: List or inline edit
├── Groupable: Allow grouping by field
├── Sortable: Allow sorting by column
├── Filters: Add default filters
└── Actions: Bulk actions
```

**List Editing Modes**:

- **Readonly**: Click row to open form
- **Inline Edit (Top)**: Edit at top of list
- **Inline Edit (Bottom)**: Edit at bottom of list

**Best Practices**:

- Limit to 5-8 columns for readability
- Put most important field first (usually `name`)
- Enable inline edit for quick data entry
- Add filters for common queries

### Kanban View Customization

**Structure**:

```
Kanban Card:
├── Image/Avatar (optional)
├── Title: Main identifier
├── Subtitle: Secondary info
├── Tags/Priority: Visual indicators
├── Progress Bar (optional)
└── Action Buttons
```

**Kanban Stages**:

- Group by selection field (e.g., `state`, `stage_id`)
- Drag-and-drop between stages
- Color-coded cards

**Best Practices**:

- Keep cards compact (3-5 lines max)
- Use color for status/priority
- Show key metrics only
- Enable quick create for efficiency

### Calendar View Customization

**Required Fields**:

```
Calendar Configuration:
├── Date Start: Required (when event starts)
├── Date Stop: Optional (when event ends)
├── All Day: Optional (boolean for all-day events)
├── Color: Optional (color-code events)
└── Mode: Day, Week, Month view
```

**Example Use Cases**:

- Employee leave calendar
- Project milestones
- Maintenance schedules
- Appointment booking

### Map View Customization

**Required**:

- **Address field** or **Coordinates** (lat/long)
- Geo-localization enabled

**Configuration**:

```
Map Settings:
├── Address Field: res.partner.address
├── Route: Enable route planning
├── Geo Localization: Automatic lookup
└── Marker Info: Fields to display in popup
```

**Use Cases**:

- Customer locations
- Delivery routes
- Store locator
- Field service planning

### Timeline View (Gantt)

**Required Fields**:

```
Timeline Configuration:
├── Date Start: Task start date
├── Date Stop: Task end date
├── Resource: Who/what is assigned
├── Color: Optional grouping
└── Progress: Optional % complete
```

**Use Cases**:

- Project planning
- Resource scheduling
- Manufacturing orders
- Event planning

---

## Automation Rules

Automation rules execute actions automatically when triggers occur.

**Documentation**: https://www.odoo.com/documentation/19.0/applications/studio/automated_actions.html

### Automation Structure

```
Automation Rule:
├── Trigger: What starts the automation
├── Filter (Conditions): When to execute
└── Actions: What to do
```

### Trigger Types

| Trigger                  | When It Fires       | Use Case                        |
| ------------------------ | ------------------- | ------------------------------- |
| **On Creation**          | New record created  | Welcome email, default values   |
| **On Update**            | Record modified     | Status change notifications     |
| **On Creation & Update** | Create or edit      | Data validation, calculations   |
| **On Deletion**          | Record deleted      | Archive related records         |
| **Form Modification**    | Field changed in UI | Real-time validation            |
| **Timed Condition**      | Scheduled check     | Deadline reminders, escalations |

### Filter Conditions

**Domain Syntax**:

```python
# Examples of filter conditions
[('state', '=', 'done')]                    # Status is "done"
[('amount', '>', 1000)]                     # Amount greater than 1000
[('partner_id.country_id.code', '=', 'PH')] # Customer from Philippines
[('date', '>=', '2025-01-01')]              # Date in 2025 or later
[('tag_ids', 'in', [tag_urgent.id])]        # Has "Urgent" tag
```

**Operators**:

- `=`, `!=`: Equal, not equal
- `>`, `<`, `>=`, `<=`: Comparisons
- `in`, `not in`: List membership
- `like`, `ilike`: String matching (case-sensitive, case-insensitive)
- `=like`, `=ilike`: Pattern matching

### Action Types

| Action                  | Description         | Example                    |
| ----------------------- | ------------------- | -------------------------- |
| **Update Record**       | Modify field values | Set stage to "Approved"    |
| **Create Record**       | Generate new record | Create task from lead      |
| **Send Email**          | Email notification  | Invoice ready notification |
| **Add Followers**       | Subscribe users     | Add manager as follower    |
| **Create Activity**     | Schedule todo       | Reminder for follow-up     |
| **Execute Python Code** | Custom logic        | Complex calculations       |
| **Send SMS**            | Text message        | Order confirmation SMS     |
| **Execute Webhook**     | External API call   | Sync with external system  |

### Automation Examples

#### Example 1: Auto-Approve Small Expenses

```
Name: Auto-Approve Expenses Under $50
Model: hr.expense
Trigger: On Creation & Update
Filter: [('total_amount', '<', 50), ('state', '=', 'draft')]
Action: Update Record
  - state → 'approved'
  - approved_by → current user
```

#### Example 2: Send Welcome Email to New Customers

```
Name: Welcome Email for New Customers
Model: res.partner
Trigger: On Creation
Filter: [('customer_rank', '>', 0)]
Action: Send Email
  - Template: "Customer Welcome Email"
  - To: {{ object.email }}
```

#### Example 3: Escalate Overdue Tasks

```
Name: Escalate Overdue Tasks
Model: project.task
Trigger: Timed Condition (Run every 1 day)
Filter: [('date_deadline', '<', datetime.now()), ('stage_id.is_closed', '=', False)]
Action: Create Activity
  - Activity Type: Todo
  - Assigned To: Project Manager
  - Summary: "Task {{ object.name }} is overdue"
```

#### Example 4: Update Computed Total

```
Name: Calculate Order Total
Model: sale.order
Trigger: On Update
Filter: Domain = []  # All records
When: order_line field changes
Action: Execute Python Code

# Python code:
for record in records:
    record.amount_total = sum(record.order_line.mapped('price_subtotal'))
```

### Automation Best Practices

1. **Use Specific Filters**: Narrow conditions to avoid unnecessary execution
2. **Test Thoroughly**: Use duplicates/test database first
3. **Avoid Loops**: Don't create automation that triggers itself
4. **Log Actions**: Add chatter message for audit trail
5. **Performance**: Limit timed automations frequency
6. **Error Handling**: Use try/except in Python code actions

---

## Studio Workflow Examples

### Workflow 1: Add Custom Fields to Invoice

**Scenario**: Add "PO Number" and "Payment Terms" to customer invoices

**Steps**:

1. **Open Studio**:
    - Go to: Accounting → Invoices
    - Click: 🎨 Toggle Studio

2. **Add Fields**:
    - Click: "+ Field" on form view
    - Field 1:
        - Label: "PO Number"
        - Type: Text
        - Technical Name: `x_po_number`
    - Field 2:
        - Label: "Payment Terms"
        - Type: Multiline Text
        - Technical Name: `x_payment_terms`

3. **Position Fields**:
    - Drag "PO Number" to header area
    - Drag "Payment Terms" below invoice lines

4. **Add to List View**:
    - Switch to List view in Studio
    - Add columns: PO Number, Payment Terms

5. **Activate Changes**:
    - Click: "Close Studio" (changes auto-save)

### Workflow 2: Create Custom Kanban Pipeline

**Scenario**: Project task pipeline with custom stages

**Steps**:

1. **Create Selection Field**:
    - Open: Project → Tasks → Studio
    - Add Field:
        - Type: Selection
        - Label: "Project Stage"
        - Values:
            ```
            backlog: Backlog
            in_progress: In Progress
            review: In Review
            done: Done
            ```

2. **Configure Kanban View**:
    - Switch to Kanban view
    - Group By: "Project Stage"
    - Customize card:
        - Title: Task name
        - Subtitle: Assigned to
        - Add: Priority stars
        - Add: Deadline date

3. **Enable Drag-Drop**:
    - Kanban automatically enables drag between stages

4. **Add Quick Create**:
    - Enable "Quick Create" for fast task entry

### Workflow 3: Automate Lead Assignment

**Scenario**: Assign leads to sales team based on country

**Steps**:

1. **Create Automation**:
    - Go to: Settings → Technical → Automation → Automated Actions
    - Or: Studio → Automations tab

2. **Configure Trigger**:
    - Name: "Auto-assign Leads by Country"
    - Model: CRM Lead
    - Trigger: On Creation

3. **Add Conditions**:
    - Filter: `[('country_id.code', '=', 'PH')]` # Philippines

4. **Add Action**:
    - Action: Update Record
    - Field: `user_id` (Salesperson)
    - Value: Select PH sales rep

5. **Duplicate for Other Countries**:
    - Copy rule for US, SG, etc.

### Workflow 4: Custom Report Design

**Scenario**: Design custom invoice report with company branding

**Steps**:

1. **Open Reports in Studio**:
    - Accounting → Invoices → Studio
    - Click: "Reports" tab

2. **Add Report**:
    - Click: "+ Report"
    - Template: Invoice
    - Name: "Company Branded Invoice"

3. **Customize Layout**:
    - Add logo/header
    - Modify colors/fonts
    - Add custom footer
    - Include payment QR code

4. **Set as Default**:
    - Make default report for invoices

---

## OCA Alternatives to Studio

If you need advanced customization beyond Studio's capabilities, use these **free OCA modules**:

| Studio Feature       | OCA Alternative                   | Repository                  |
| -------------------- | --------------------------------- | --------------------------- |
| Custom fields/models | `base_view_inheritance_extension` | server-tools                |
| Form designer        | `web_studio_like`                 | web                         |
| Automated actions    | `base_automation`                 | server-tools (core)         |
| Custom reports       | `report_py3o`, `report_xlsx`      | reporting-engine            |
| Dashboard builder    | `mis_builder`                     | account-financial-reporting |
| Workflow automation  | `base_automation_webhook`         | server-tools                |

**Note**: Studio is Odoo Enterprise only ($$$). OCA modules are FREE and often more powerful.

---

## Studio Limitations

### What Studio CANNOT Do

1. **Complex Business Logic**: Use Python modules instead
2. **Custom Wizards**: Requires transient models in code
3. **External API Integration**: Use Python or OCA connectors
4. **Complex Calculations**: Limited to simple Python expressions
5. **Custom Widgets**: Requires JavaScript development
6. **Database Migrations**: Use Odoo migration scripts
7. **Multi-model Relations**: Limited to simple relations
8. **Performance Optimization**: Requires SQL indexing, database tuning

### When to Use Python Modules Instead

Use custom Python modules when you need:

- Complex validation logic
- External API calls
- Custom wizards/popups
- Advanced calculations
- Custom widgets
- Migration scripts
- Performance-critical code
- Unit tests

**Migration Path**:

1. Prototype in Studio
2. Export Studio customizations
3. Convert to Python module
4. Add unit tests
5. Version control with git

---

## Tips and Best Practices

### Performance Tips

1. **Limit Computed Fields**: They recalculate often
2. **Index Search Fields**: Add `index=True` in Python
3. **Avoid Heavy Automation**: Don't process large recordsets
4. **Cache Related Fields**: Use `related` for read-only copies
5. **Optimize Domains**: Specific filters are faster

### UX Best Practices

1. **Consistent Naming**: Use clear, consistent field labels
2. **Group Logically**: Related fields together
3. **Required Fields**: Mark truly required fields only
4. **Help Text**: Add tooltips for complex fields
5. **Placeholder Text**: Show examples in empty fields
6. **Smart Defaults**: Pre-fill common values

### Security Considerations

1. **Access Rights**: Set proper model access rules
2. **Record Rules**: Limit visibility by user/group
3. **Field Security**: Hide sensitive fields from groups
4. **Audit Trail**: Enable chatter for critical models
5. **Automation Security**: Validate data before updates

### Maintenance Tips

1. **Document Changes**: Add notes in Studio
2. **Version Control**: Export and commit customizations
3. **Test in Staging**: Never customize production directly
4. **Backup Before Changes**: Export database before major changes
5. **Review Regularly**: Audit unused fields/automations

---

## Studio vs Code Development Comparison

| Aspect              | Studio (No-Code)            | Python Modules (Code)        |
| ------------------- | --------------------------- | ---------------------------- |
| **Skill Required**  | No coding                   | Python, XML, JavaScript      |
| **Speed**           | Fast prototyping            | Slower development           |
| **Flexibility**     | Limited to Studio features  | Unlimited                    |
| **Version Control** | Export XML files            | Git repository               |
| **Testing**         | Manual testing              | Unit tests, CI/CD            |
| **Cost**            | Enterprise license required | Free (Community)             |
| **Maintenance**     | GUI-based                   | Code editing                 |
| **Migration**       | Can export to code          | Native code                  |
| **Performance**     | Good for simple cases       | Optimized for complex logic  |
| **Collaboration**   | Single user at a time       | Multi-developer git workflow |

---

## Additional Resources

### Official Documentation

- **Main Studio Docs**: https://www.odoo.com/documentation/19.0/applications/studio.html
- **Views Reference**: https://www.odoo.com/documentation/19.0/applications/studio/views.html
- **Fields Reference**: https://www.odoo.com/documentation/19.0/applications/studio/fields.html
- **Automation Rules**: https://www.odoo.com/documentation/19.0/applications/studio/automated_actions.html

### Video Tutorials

- **Odoo eLearning**: https://www.odoo.com/slides
- **Studio Customization**: https://www.odoo.com/slides/slide/customize-views-4614

### Community Resources

- **Odoo Forum**: https://www.odoo.com/forum/help-1
- **OCA GitHub**: https://github.com/OCA
- **Odoo Community Docs**: https://odoo-community.org/

---

## Quick Reference: Common Tasks

### Add a Field

```
Studio → "+ Field" → Configure → Drag to position
```

### Add a View Column

```
Studio → List View → "+ Column" → Select field
```

### Create Automation

```
Studio → Automations → "+ Automation" → Configure trigger/action
```

### Customize Kanban

```
Studio → Kanban View → Edit card template → Add fields
```

### Add Smart Button

```
Studio → Form View → "+ Smart Button" → Select related model
```

### Create Report

```
Studio → Reports → "+ Report" → Design layout
```

### Export Customizations

```
Studio → "⋮" menu → Export → Download XML
```

### Import Customizations

```
Studio → "⋮" menu → Import → Upload XML
```

---

**Last Updated**: 2025-11-04
**Odoo Version**: 19.0
**Status**: Production Ready ✅
