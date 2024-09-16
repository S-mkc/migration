# import frappe

# def delete_salary_component():
#     # List of salary components to delete (must match those created in create_salary_component)
#     salary_component_names = ["Basic Salary", "Grade Amount"]  # Add any other components created

#     # Delete each specified salary component
#     for name in salary_component_names:
#         if frappe.db.exists("Salary Component", name):
#             frappe.delete_doc("Salary Component", name)

import frappe
from .install import create_salary_component  # Import the list of created components

def delete_salary_component():
    # Delete each specified salary component
    salary_component_names = create_salary_component()
    for name in salary_component_names:
        try:
            frappe.delete_doc("Salary Component", name)
        except frappe.DoesNotExistError:
            # Log if the component does not exist, but continue
            frappe.log_error(f"Salary Component '{name}' does not exist, skipping deletion.", "Deletion Error")
        # if frappe.db.exists("Salary Component", name):
        #     frappe.delete_doc("Salary Component", name)
        # else:
        #     frappe.log_error(f"Salary Component '{name}' does not exist.", "Deletion Error")