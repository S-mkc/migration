import frappe

def delete_salary_component():
    # List of salary components to delete (must match those created in create_salary_component)
    salary_component_names = ["Basic Salary", "Grade Amount"]  # Add any other components created

    # Delete each specified salary component
    for name in salary_component_names:
        if frappe.db.exists("Salary Component", name):
            frappe.delete_doc("Salary Component", name)