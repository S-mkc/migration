import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def create_user(first_name, last_name, email, password):
    try:
        user = frappe.get_doc({
            "doctype": "User",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "send_welcome_email": 0,
            "new_password": password,
            # "role_profile_name": "Space User"
            # "mobile_no": mobile_no,  # Add mobile number
            # "bio": bio
        })
        user.insert(ignore_permissions=True)
        frappe.db.commit()
        return {"message": _("User created successfully"), "user": user.name}
    except frappe.exceptions.DuplicateEntryError:
        return {"message": _(f"{email} already registered with us, try a different one")}
    # except frappe.exceptions.ValidationError as e:
    #     if "weak password" in str(e):
    #         return {"message": _("Weak password, please choose a stronger password")}
    #     return {"message": str(e)}
    # except Exception as e:
    #     return {"message": str(e)}
    except frappe.exceptions.ValidationError as e:
        error_message = str(e)
        if "common password" in error_message:
            return {"message": "This password is too week. Please choose a more secure password."}, 400
        return {"message": error_message}, 400

    except Exception as e:
        # Log the exception if possible
        return {"message": "An unexpected error occurred"}, 500

