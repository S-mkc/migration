import frappe

# def delete_salary_component():
#     # List of salary components to delete (must match those created in create_salary_component)
#     salary_component_names = ["Basic Salary", "Grade Amount"]  # Add any other components created

#     # Delete each specified salary component
#     for name in salary_component_names:
#         if frappe.db.exists("Salary Component", name):
#             frappe.delete_doc("Salary Component", name)


from migration.install import create_salary_component  # Import the function

def delete_salary_component():
    # Call create_salary_component to get the salary components
    salary_components = create_salary_component()  # Modify this function to return the names

    # Delete each specified salary component
    for name in salary_components:
        if frappe.db.exists("Salary Component", name):
            frappe.delete_doc("Salary Component", name)
        else:
            frappe.msgprint(f"Salary Component '{name}' does not exist.")
