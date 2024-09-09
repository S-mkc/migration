import frappe
from frappe.utils import today

def on_update(doc, method):
    expense_approver = frappe.db.get_value("Employee", {"user_id":doc.owner}, "custom_approver_id")
    if expense_approver == '' or expense_approver == None and "Administrator" not in frappe.get_roles():
        frappe.throw("Please ask Administrator to set Purchase Approver For you")
        
@frappe.whitelist()
def add_approver(owner):
    expense_approver = frappe.db.get_value("Employee", {"user_id":owner}, "custom_approver_id")
    if expense_approver != '' or expense_approver != None:
        return expense_approver
# import frappe
# from frappe.utils import today

# def on_update(doc, method):
#     expense_approver = frappe.db.get_value("Employee", {"user_id": doc.owner}, "custom_approver_id")
#     if (not expense_approver) and "Administrator" not in frappe.get_roles():
#         frappe.throw("Please ask Administrator to set Purchase Approver for you")
        
# @frappe.whitelist()
# def add_approver(owner):
#     expense_approver = frappe.db.get_value("Employee", {"user_id": owner}, "custom_approver_id")
#     if expense_approver:
#         return expense_approver
#     return None  # If no approver is found, return None
