import frappe

@frappe.whitelist()
def create_salary_component():
    company = frappe.get_all("Company", fields=["name"])
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Basic Salary"
    doc.salary_component_abbr = "BASIC"
    doc.type = "Earning"
    doc.description = "Basic salary component"
    doc.depends_on_payment_days = 0
    doc.is_tax_applicable = 0
    doc.deduction_full_tax_on_selected_payroll_date = 0
    doc.round_to_the_nearest_integer = 0
    doc.statistical_component = 0
    doc.do_not_include_in_total = 0
    doc.remove_if_zero_valued = 1
    doc.disabled = 0
    doc.condition = ""
    doc.append("accounts", {
        "company" : company,
        "account" : "Salary - Y"
    })
    doc.amount_based_on_formula = 1
    doc.formula = "ctc * 0.083"
    doc.formula_read_only = 1
    # doc.amount = 50000
    doc.s_flexible_benefits = 0
    # doc.save()
    doc.insert()
   

    # Grade Amount
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Grade Amount"
    doc.salary_component_abbr = "GA"
    doc.type = "Earning"
    doc.description = "Grade Amount Free Field"
    doc.depends_on_payment_days = 0
    doc.is_tax_applicable = 0
    doc.deduction_full_tax_on_selected_payroll_date = 0
    doc.round_to_the_nearest_integer = 0
    doc.statistical_component = 0
    doc.do_not_include_in_total = 0
    doc.remove_if_zero_valued = 1
    doc.disabled = 0
    doc.append("accounts", {
        "company" : company,
        "account" : "Salary - Y"
    })
    doc.condition = ""
    doc.s_flexible_benefits = 0
    doc.insert()
    # frappe.db.commit()