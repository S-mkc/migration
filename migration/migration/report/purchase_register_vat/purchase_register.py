import frappe

def get_columns():
    return [
        {
            "label": "Item Code",
            "fieldname": "item_code",
            "fieldtype": "Link",
            "options": "Item",
            "width": 150,
        },
        {
            "label": "Total Quantity Sold",
            "fieldname": "total_qty_sold",
            "fieldtype": "Float",
            "width": 150,
        },
        {
            "label": "Total Sales Amount",
            "fieldname": "total_sales_amount",
            "fieldtype": "Currency",
            "width": 150,
        },
        {
            "label": "Total Profit",
            "fieldname": "total_profit",
            "fieldtype": "Currency",
            "width": 150,
        },
    ]

def get_data(filters):
    conditions = ""
    if filters.get("item_code"):
        conditions += " AND si.item_code = %(item_code)s"

    query = f"""
        SELECT
            si.item_code,
            SUM(si.qty) AS total_qty_sold,
            SUM(si.amount) AS total_sales_amount,
            SUM(si.amount - si.rate) AS total_profit
        FROM
            `tabSales Invoice Item` si
        JOIN
            `tabSales Invoice` s ON si.parent = s.name
        WHERE
            s.docstatus = 1
            {conditions}
        GROUP BY
            si.item_code
    """

    return frappe.db.sql(query, filters, as_dict=True)

@frappe.whitelist()
def execute(filters=None):
    columns = get_columns()
    data = get_data(filters or {})
    return columns, data
