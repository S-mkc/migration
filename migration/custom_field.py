import frappe
from dataclasses import fields
from frappe import _


# def create_custom_fields():
#     # Define the doctypes and their respective custom fields
#     custom_fields_names = []
#     custom_fields = {
#         "Employee": [
#             {"fieldname": "date_picker", "label": "Date Picker", "fieldtype": "Date", "insert_after": "gender", "reqd": 0},
#             # {"fieldname": "department_code", "label": "Department Code", "fieldtype": "Data", "insert_after": "department", "reqd": 0},
#         ],
#         "Customer": [
#             {"fieldname": "customer_code", "label": "Customer Code", "fieldtype": "Data", "insert_after": "customer_name", "reqd": 0},
#             # {"fieldname": "preferred_contact_method", "label": "Preferred Contact Method", "fieldtype": "Select", "options": "Email\nPhone\nSMS", "insert_after": "mobile_no", "reqd": 0},
#         ],
#         # Add more doctypes and fields as needed
#     }

#     # Loop through each doctype and their fields
#     custom_field = []
#     for doctype_name, fields in custom_fields.items():
#         for field in fields:
#             if not frappe.db.exists("Custom Field", {"dt": doctype_name, "fieldname": field["fieldname"]}):
#                 # Create the custom field
#                 custom_field = frappe.get_doc({
#                     "doctype": "Custom Field",
#                     "dt": doctype_name,
#                     **field
#                 })
#                 custom_field.insert()
#                 frappe.msgprint(_(f"Custom field '{field['label']}' added successfully to {doctype_name}!"))
#             else:
#                 frappe.msgprint(_(f"Field '{field['label']}' already exists in {doctype_name}."))
#     custom_fields_names.append(custom_field)
# # Call the function to create the fields
# create_custom_fields()

def create_custom_fields():
    custom_fields = {
        "Employee": [
            {"fieldname": "date_picker", "label": "Date Picker", "fieldtype": "Date", "insert_after": "gender", "reqd": 0},
            # Add more fields as needed
        ],
        "Customer": [
            {"fieldname": "customer_code", "label": "Customer Code", "fieldtype": "Data", "insert_after": "customer_name", "reqd": 0},
            # Add more fields as needed
        ],
        "Salary Slip": [
            {"fieldname": "nepali start date", "lable": "Nepali Start Date", "fieldtype": "Currency", "insert_after": "start_date", "reqd": 0},
            {"fieldname": "nepali end date", "label": "Nepali End Date", "fieldtype": "Currency", "insert_after": "end_date"}
        ]
    }

    created_fields = []  # List to store created fields

    for doctype_name, fields in custom_fields.items():
        for field in fields:
            if not frappe.db.exists("Custom Field", {"dt": doctype_name, "fieldname": field["fieldname"]}):
                custom_field = frappe.get_doc({
                    "doctype": "Custom Field",
                    "dt": doctype_name,
                    **field
                })
                custom_field.save()
                frappe.msgprint(_(f"Custom field '{field['label']}' added successfully to {doctype_name}!"))
                created_fields.append({"dt": doctype_name, "fieldname": field["fieldname"]})  # Store created field info
            else:
                frappe.msgprint(_(f"Field '{field['label']}' already exists in {doctype_name}."))

    return created_fields  # Return the created fields
