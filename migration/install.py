import frappe
# import datetime
# import nepali_datetime

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
    # 
# from nepali_date import NepaliDate  # Import the Nepali date library

# def create_fiscal_year():
#     # Example of creating a fiscal year with Nepali date support
#     fiscal_year = frappe.get_doc({
#         "doctype": "Fiscal Year",
#         "name": "Fiscal Year 2079/80",  # Example name
#         "start_date": "2022-04-14",  # Gregorian start date
#         "end_date": "2023-04-13",  # Gregorian end date
#         "nepali_start_date": nepali_datetime(2079, 1, 1).to_gregorian(),  # Convert Nepali to Gregorian
#         "nepali_end_date": nepali_datetime(2080, 1, 1).to_gregorian(),  # Convert Nepali to Gregorian
#     })
#     fiscal_year.insert()
def create_fiscal_year():
    company = frappe.get_all("Company", fields=["name"])
    doc = frappe.new_doc("Fiscal Year")
    doc.year = "Nepal Fiscal Year"
    doc.disabled = 0
    doc.is_short_year = 0
    # doc.year_start_date = '2025-07-16'
    doc.year_start_date = ad_to_bs(today_ad)  # Convert today's date to BS for start date
    # doc.year_end_date = '2026-07-15'
    doc.year_end_date = ad_to_bs(frappe.utils.add_days(today_ad, 364))  # Convert end date to BS
    doc.append("companies", {
        "company" : company,
        # "account" : "Salary - Y"
    })
    doc.insert()

def install():
    create_salary_component()
    create_fiscal_year()

    # return create_salary_component()