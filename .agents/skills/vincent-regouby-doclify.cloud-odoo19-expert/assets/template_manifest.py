# Copyright YEAR AUTHOR
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "Module Name",
    "summary": "Short description (max 80 chars)",
    "version": "19.0.1.0.0",
    "category": "Category Name",
    "website": "https://github.com/OCA/project-name",
    "author": "Your Company, Odoo Community Association (OCA)",
    "maintainers": ["github_username"],
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "auto_install": False,
    "depends": [
        "base",
    ],
    "external_dependencies": {
        "python": [],
        "bin": [],
    },
    "data": [
        "security/security.xml",
        "security/ir.model.access.csv",
        "data/data.xml",
        "views/menu.xml",
        "views/model_views.xml",
        "reports/report_template.xml",
    ],
    "demo": [
        "demo/demo_data.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "module_name/static/src/**/*",
        ],
    },
    "development_status": "Beta",
    # "development_status": "Alpha | Beta | Production/Stable | Mature"
}
