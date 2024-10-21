function add_nepali_date_picker(frmField, nepali_date_field , english_date_convert_field) {   
    if (typeof $.fn.nepaliDatePicker !== 'undefined') {
        console.log("Nepali Date Field:", nepali_date_field);
        $(frmField.fields_dict[nepali_date_field].input).nepaliDatePicker({
            ndpYear: true,
            ndpMonth: true,
            ndpYearCount: 10,
            onChange: function(e) {
                var date_format_converted = new Date(e.ad);
                if (frmField.fields_dict[english_date_convert_field] && frmField.fields_dict[english_date_convert_field].df.fieldtype == "Datetime") {
                    var time = "00:00:00";
                    date_format_converted = date_format_converted.toISOString().split("T")[0] + " " + time;
                } 
                frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, e.bs);
                frappe.model.set_value(frmField.doctype, frmField.docname, english_date_convert_field, date_format_converted);
            }
        }); 

        // set max length for nepali date field
        $(frmField.fields_dict[nepali_date_field].input);

        $(frmField.fields_dict[nepali_date_field].input).on("change", function() {
            var nepali_date = $(this).val();
            frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, nepali_date);
        
            if (/^[0-9-]+$/.test(nepali_date)) {
                var date = nepali_date.split("-");
                var year = date[0];
                var month = date[1];
                var day = date[2];
                if (year.length == 4 && month.length == 2 && day.length == 2) {
                    frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, nepali_date);
                    // frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, nepali_date);

                } else {
                    frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, "");
                    $(frmField.fields_dict[nepali_date_field].input).focus();
                }
            // } else {
            //     frappe.model.set_value(frmField.doctype, frmField.docname, nepali_date_field, "");
            //     $(frmField.fields_dict[nepali_date_field].input).focus();
            // }
            }
        });        

    }
}


// function add_nepali_date_picker(frm, nepali_date_field, docname) {
//     const inputElement = $(`input[data-fieldname="${nepali_date_field}"][data-docname="${docname}"]`);

//     if (inputElement.length) {
//         inputElement.nepaliDatePicker({
//             ndpYear: true,
//             ndpMonth: true,
//             ndpYearCount: 10,
//             onChange: function(e) {
//                 // Set the Nepali date in the field
//                 frappe.model.set_value('Holiday', docname, nepali_date_field, e.bs);
//             }
//         });

//         inputElement.on("change", function() {
//             const nepaliDate = $(this).val();
//             // Validate date format (e.g., YYYY-MM-DD)
//             if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(nepaliDate)) {
//                 frappe.model.set_value('Holiday', docname, nepali_date_field, nepaliDate);
//             } else {
//                 frappe.model.set_value('Holiday', docname, nepali_date_field, "");
//                 $(this).focus();
//                 frappe.msgprint("Please enter a valid date in YYYY-MM-DD format.");
//             }
//         });
//     } else {
//         console.error("Nepali Date Picker input element not found for docname:", docname);
//     }
// }