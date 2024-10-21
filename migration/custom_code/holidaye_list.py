# import frappe

# def execute():
#     # Specify the name of your child table and the field you want to change
#     child_table = 'Holiday'  # Update this if your child table has a different name
#     field_name = 'holiday_date'

#     # Change the field type from Date to Data
#     frappe.db.sql(f"""
#         UPDATE `tabDocField` 
#         SET `fieldtype` = 'Date' 
#         WHERE `fieldname` = '{field_name}' AND `parent` = '{child_table}'
#     """)

#     # Ensure that any existing date values are preserved in the new format if needed
#     # If you need to convert existing Date values to a string format, you can do that here.
#     # Example: You might convert existing dates to a specific format (like 'YYYY-MM-DD').

# def get_holiday_dates_between(
# 	holiday_list: str,
# 	nepali_from_date: str,
# 	nepali_to_date: str,
# 	skip_weekly_offs: bool = False,
# ) -> list:
# 	Holiday = frappe.qb.DocType("Holiday")
# 	query = (
# 		frappe.qb.from_(Holiday)
# 		.select(Holiday.holiday_date)
# 		.where((Holiday.parent == holiday_list) & (Holiday.holiday_date.between(nepali_from_date, nepali_from_date)))
# 		.orderby(Holiday.holiday_date)
# 	)

# 	if skip_weekly_offs:
# 		query = query.where(Holiday.weekly_off == 0)

# 	return query.run(pluck=True)


# # def invalidate_cache(doc, method=None):
# # 	from ...hrms.payroll.doctype.salary_slip.salary_slip import HOLIDAYS_BETWEEN_DATES

# # 	frappe.cache().delete_value(HOLIDAYS_BETWEEN_DATES)
# from frappe import _, throw
# from frappe.utils import formatdate, getdate, today
# from datetime import date

# @frappe.whitelist()
# def get_weekly_off_dates(self):
# 		if not self.weekly_off:
# 			throw(_("Please select weekly off day"))

# 		existing_holidays = self.get_holidays()

# 		for d in self.get_weekly_off_date_list(self.nepali_from_date, self.nepali_to_date):
# 			if d in existing_holidays:
# 				continue
# 			self.append("holidays", {"description": _(self.weekly_off), "custom_nepali_dae": d, "weekly_off": 1})

# def get_holidays(self) -> list[date]:
# 		return [getdate(holiday.custom_nepali_dae) for holiday in self.holidays]

# def get_weekly_off_date_list(self, nepali_from_date, nepali_to_date):
# 		nepali_from_date, nepali_to_date = getdate(nepali_from_date), getdate(nepali_to_date)

# # get_weekly_off_date_list()