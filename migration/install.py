from dataclasses import fields
import frappe
import datetime
from frappe import _
# import nepali_datetime
from migration.api import create_income_tax_slab
from migration.custom_field import create_custom_fields
# from migration.api import ad_to_bs 
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
# def create_fiscal_year():
#     today_ad = datetime.date.today()
#     company = frappe.get_all("Company", fields=["name"])
#     doc = frappe.new_doc("Fiscal Year")
#     doc.year = "Nepal Fiscal Year"
#     doc.disabled = 0
#     doc.is_short_year = 0
#     # doc.year_start_date = '2025-07-16'
#     doc.year_start_date = ad_to_bs(today_ad)  # Convert today's date to BS for start date
#     # doc.year_end_date = '2026-07-15'
#     doc.year_end_date = ad_to_bs(frappe.utils.add_days(today_ad, 364))  # Convert end date to BS
#     doc.append("companies", {
#         "company" : company,
#         # "account" : "Salary - Y"
#     })
#     doc.insert()
company = frappe.get_all("Company", fields=["name"])
# custom_taxable_salary = frappe.get_all("Employee", fields=["ctc"])
# custom_taxable_salary = frappe.db.get_value("Employee", filters=None, fieldname="ctc", as_dict=False)

@frappe.whitelist()
def create_salary_component():

    salary_component_names = []  # List to hold created component names
    # //Basic Salary

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
    salary_component_names.append(doc.salary_component)  # Add to list
    # doc.save()
    doc.save()
   

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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * 0.083"
    doc.condition = ""
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()
    # frappe.db.commit()

    #PF_Employee (Earning)
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "PF_Employee (Earning)"
    doc.salary_component_abbr = "PFE_E"
    doc.type = "Earning"
    doc.description = "PF Based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * 0.1"
    doc.formula_read_only = 1
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #PF_Employee (Deduction)

    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "PF_Employee (Deduction)"
    doc.salary_component_abbr = "PFE_D"
    doc.type = "Deduction"
    doc.description = "PF Based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * 0.1"
    doc.formula_read_only = 1
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)
    doc.save()   

    #PF_Employeer
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "PF_Employeer"
    doc.salary_component_abbr = "PF_Employeer"
    doc.type = "Deduction"
    doc.description = "PF Based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * 0.1"
    doc.formula_read_only = 1
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save() 

    #Gratuity
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Gratuity"
    doc.salary_component_abbr = "Gr"
    doc.type = "Earning"
    doc.description = "Graturity Earning Based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * .0833"
    doc.formula_read_only = 1
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save() 

    #Gratuity Deduction 
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Gratuity Deduction"
    doc.salary_component_abbr = "Gr_D"
    doc.type = "Deduction"
    doc.description = "Graduity Deduction Based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "BASIC * .0833"
    doc.formula_read_only = 1
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save() 

    #Other Allowance 
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Other Allowance"
    doc.salary_component_abbr = "OA"
    doc.type = "Earning"
    doc.description = "Other Allowance based on Formula"
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
    doc.amount_based_on_formula = 1
    doc.formula = "ctc-BASIC"
    # doc.set_df_property('formula', 'read_only', 1)
    # doc.cur_frm.fields_dict['formula'].read_only = 1
    # doc.set_df_property('formula', 'hidden', 1)
    doc.formula_read_only = 1
    # doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #Leave and Late Deduction
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Leave and Late Deduction"
    doc.salary_component_abbr = "LLD"
    doc.type = "Deduction"
    doc.description = "Leave and Late Deduction Free Field"
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    # Income Tax Unmarried

    # custom_taxable_salary = frappe.get_all("Employee", fields="ctc")
    # # custom_taxable_salary = 80000

    # if custom_taxable_salary is None:
    #     frappe.throw("No employee records found or CTC is not set for any employee.")

    # # Ensure custom_taxable_salary is converted to float
    # try:
    #     annual_salary = (custom_taxable_salary) * 12
    # except (ValueError, TypeError) as e:
    #     frappe.throw(f"Error calculating annual salary: {str(e)}")

    # # Initialize the tax formula as a string
    # tax = ""

    # Create a new Salary Component document

    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Income Tax (Unmarried)"
    doc.salary_component_abbr = "IT_U"
    doc.type = 'Deduction'
    doc.description = "Income Tax as per Nepal law for Unmarried"
    doc.depends_on_payment_days = 0
    doc.is_tax_applicable = 0
    doc.deduction_full_tax_on_selected_payroll_date = 0
    doc.round_to_the_nearest_integer = 0
    doc.statistical_component = 0
    doc.do_not_include_in_total = 0
    doc.remove_if_zero_valued = 1
    doc.disabled = 0
    doc.append("accounts", {
        "company": company,  # Replace with actual company variable
        "account": "Salary - Y"
    })
    doc.condition = ""
    doc.amount_based_on_formula = 1

    employees = frappe.get_all("Employee", fields=["name", "ctc"])

    # Check if we have any employee records
    if not employees:
        frappe.throw("No employee records found or CTC is not set for any employee.")

    # Iterate through each employee record
    for emp in employees:
        employee_doc = frappe.get_doc("Employee", emp.name)  # Get the employee document
        ctc = emp.ctc

        # if ctc is not None:
        #     annual_salary = ctc * 12  # Calculate annual salary

        #     # Set the annual salary in the employee document
        #     # employee_doc.set_value("annual_salary", annual_salary)
        #     employee_doc.annual_salary = annual_salary

        #     # Save the changes
        #     employee_doc.save()

    # Initialize the tax formula as a string
    tax = ""

    # Determine the tax formula based on the annual salary brackets
    # if ctc*12 <= 500000:
    #     tax = "((ctc*12) * 0.01) / 12"
    # elif ctc*12 <= 700000:
    #     tax = "((500000 * 0.01) + (((ctc*12) - 500000) * 0.1)) / 12"
    # elif ctc*12 <= 1000000:
    #     tax = "((500000 * 0.01) + (200000 * 0.1) + ((((ctc*12) * 12) - 700000) * 0.2)) / 12"
    # elif ctc*12 <= 2000000:
    #     tax = "((((ctc*12) * 0.2) * 0.15) + (500000 * 0.01) + (200000 * 0.1) + (300000 * 0.2) + ((((ctc*12)) - 1000000) * 0.3)) / 12"
    # elif ctc*12 <= 5000000:
    #     tax = "((((ctc*12) * 0.2) * 0.15) + (500000 * 0.01) + (200000 * 0.1) + (300000 * 0.2) + (1000000 * 0.3) + (((ctc*12) - 2000000) * 0.36)) / 12"
    # else:
    if ctc*12 > 0:
        # tax = "((((ctc*12) * 0.2) * 0.15) + (500000 * 0.01) + (200000 * 0.1) + (300000 * 0.2) + (1000000 * 0.3) + (3000000 * 0.36) + (((ctc*12) - 5000000) * 0.39)) / 12"
        tax = "((((custom_taxable_salary) * 12) * 0.01)/12) if ((custom_taxable_salary) * 12) <=500000 else (((500000 * 0.01) + (((custom_taxable_salary) * 12) - 500000) * 0.1)/12) if ((custom_taxable_salary) * 12) <= 700000 else (((500000*0.01) + (200000*0.1) + (((custom_taxable_salary)*12) - 700000) * 0.2)/12) if ((custom_taxable_salary)*12) <= 1000000 else (((500000*0.01) + (200000*0.1) + (300000*0.2) + ((custom_taxable_salary)*12 - 1000000) *0.3)/12) if ((custom_taxable_salary)*12)<=2000000 else (((500000*0.01) + (200000*0.1) + (300000*0.2) + (1000000*0.3) + ((custom_taxable_salary)*12 - 2000000)*0.36)/12) if ((custom_taxable_salary)*12)<=5000000 else (((500000*0.01) + (200000*0.1) + (300000*0.2) + (1000000*0.3) + (3000000*0.36) + ((custom_taxable_salary)*12 - 5000000)*0.39)/12) if ((custom_taxable_salary)*12)>5000000 else -1"
    else:
        tax = 0 
    # Set the formula as a string
    doc.formula = tax

    # Log the computed values for debugging
    frappe.log(f"Custom Taxable Salary: {tax}")
    frappe.log(f"Annual Salary: {ctc*12}")
    frappe.log(f"Tax Formula: {doc.formula}")

    # Save the document
    doc.save()
    # doc.insert()  # Ensure to save the document
    # frappe.db.commit() 

    #Overtime
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Overtime"
    doc.salary_component_abbr = "OT"
    doc.type = "Earning"
    doc.description = "Overtime Free Field"
    doc.depends_on_payment_days = 0
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #Insurance Premium
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Insurance Premium"
    doc.salary_component_abbr = "IP"
    doc.type = "Deduction"
    doc.description = "Insurance Prmium Deduction free field"
    doc.depends_on_payment_days = 0
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #Loan and Advance
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Laon and Advance"
    doc.salary_component_abbr = "L&A"
    doc.type = "Deduction"
    doc.descriotion = "Loan and Advance Adjustment free field"
    doc.depends_on_payment_days = 0
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #CIT Deduction
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "CIT Deduction"
    doc.salary_component_abbr = "CIT"
    doc.type = "Deduction"
    doc.description = "CIT Deduction"
    doc.depends_on_payment_days = 0
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #Dearness Allowance
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Dearness Allowance"
    doc.salary_component_abbr = "DA"
    doc.type = "Earning"
    doc.description = "Dearness Allowance"
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
    doc.amount_based_on_formula = 0
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()
    
    #SSF 
    doc = frappe.new_doc("Salary Component")
    doc.salary_component = "Social Security Fund"
    doc.salary_component_abbr = "SSF"
    doc.type = "Deduction"
    doc.description = "SSF as per Nepal Law"
    doc.depends_on_payment_days = 0
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
    doc.amount_based_on_formula = 1
    doc.formula = "Basic * 0.31"
    doc.s_flexible_benefits = 0
    salary_component_names.append(doc.salary_component)  # Add to list
    doc.save()

    #new custom field
    doctype_name = "Employee"
    field_name = "app"

    if not frappe.db.exists("Custom Field", {"dt": doctype_name, "fieldname": field_name}):
        fields = {
            "fieldname": field_name,
            "label": "App",
            "fieldtype": "Data",
            "insert_after": "gender",
            "reqd" : 0,
            # "doctype": doctype_name
        }
        custom_field = frappe.get_doc({
            "doctype": "Custom Field",
            "dt": doctype_name,
            "fieldname": field_name,
            **fields
        })
        # fields.insert(ignore_permissions=True)
        custom_field.insert()
        frappe.msgprint(_("Custom field added successfully!"))
    else:
        frappe.msgprint(_("Field already exists."))
    return salary_component_names  # Return the list of created component names


def install():
    create_salary_component()
    create_income_tax_slab()
    create_custom_fields()
    # create_fiscal_year()

    # return create_salary_component()