import frappe

# def delete_salary_component():
#     # List of salary components to delete (must match those created in create_salary_component)
#     salary_component_names = ["Basic Salary", "Grade Amount"]  # Add any other components created

#     # Delete each specified salary component
#     for name in salary_component_names:
#         if frappe.db.exists("Salary Component", name):
#             frappe.delete_doc("Salary Component", name)


from migration.install import create_salary_component  
from migration.custom_field import create_custom_fields

def delete_salary_component():
    # Call create_salary_component to get the salary components
    salary_components = create_salary_component()  # Modify this function to return the names

    # Delete each specified salary component
    for name in salary_components:
        if frappe.db.exists("Salary Component", name):
            frappe.delete_doc("Salary Component", name)
        else:
            frappe.msgprint(f"Salary Component '{name}' does not exist.")

# def delete_custom_field():
#     fields = create_custom_fields()

#     for i in fields:
#         if frappe.db.exists("fields", i):
#             frappe.delete_doc("fiedls", i)
#         else:
#             frappe.msgprint(f"Custom Field '{i} doesn't exit.")

def delete_custom_field():
    # Retrieve the custom fields you want to delete
    custom_fields = create_custom_fields()  # Call the function to get fields
    
    for field in custom_fields:
        fieldname = field["fieldname"]
        doctype_name = field["dt"]
        
        if frappe.db.exists("Custom Field", {"dt": doctype_name, "fieldname": fieldname}):
            # Delete the custom field
            frappe.delete_doc("Custom Field", {"dt": doctype_name, "fieldname": fieldname})
            # frappe.db.sql(f"""DELETE FROM `tabEmployee` WHERE dt = %s AND fieldname = %s""", (doctype_name , fieldname))
            frappe.msgprint(f"Custom Field '{fieldname}' deleted successfully from {doctype_name}!")
        else:
            frappe.msgprint(f"Custom Field '{fieldname}' doesn't exist in {doctype_name}.")

def uninstall():
    delete_salary_component()
    delete_custom_field()