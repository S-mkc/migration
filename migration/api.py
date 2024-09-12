import frappe
from datetime import datetime
import datetime as real_Date
import nepali_datetime
import pandas as pd
import requests
from frappe.utils import today

@frappe.whitelist()
def get_nepali_date(date):
    import frappe
    import datetime
    import nepali_datetime
    # Parse the input date string
    date_format = '%Y-%m-%d'
    try:
        gregorian_date = datetime.datetime.strptime(date, date_format).date()
    except ValueError:
        return "Invalid date format. Please use YYYY-MM-DD."
    
    # Convert Gregorian date to Nepali date
    nepali_date = nepali_datetime.date.from_datetime_date(gregorian_date)

    start_date = datetime.date(2024, 6, 15)
    end_date = datetime.date(2024, 6, 30)
    
    if start_date <= gregorian_date <= end_date:
        nepali_date -= datetime.timedelta(days=1)
    
    # Return the Nepali date as a string in the format YYYY-MM-DD
  
    if str(date) == "2024-06-14":
        return str("2081-02-32")
    elif str(date) != "2024-06-14":
        return str(nepali_date)


