// // Add a new field "Bikram Sambat Birthday" to the Employee. Then add the following "Client Script" to ErpNext.

// frappe.ui.form.on('Fiscal Year', {
//     // 'date_of_birth': set_bs_date,
//     // 'refresh': set_bs_date

// refresh: function (frm) {
//     frappe.call({ 
//         type: 'GET',
//         method: 'migration.api.ad_to_bs', 
//         args: { date: frm.doc.date_of_birth },
//         // args: { method: 'ad_to_bs', date: frm.doc.date_of_birth},
//         // args: { method: 'ad_to_bs'},
//         freeze: true,
//         callback: function(response) {
//             if(response.message.length === 10) {
//                 frm.set_value('year_start_date', response.message);
//                 frm.set_value('year_end_date', response.message);
//             }
//         }
//     });
// }
// })
// import { add_nepali_date_picker } from './nepali_date_custom/add_nepali_date_picker'
// Import the add_nepali_date_picker function
// import { add_nepali_date_picker } from './migration/js/nepali_date_custom.js';


frappe.ui.form.on('Fiscal Year',{
    refresh(frm) {
        // frm.fields_dict['year_start_date'].input.hide();
        add_nepali_date_picker(frm, "nepali_date");
        // add_nepali_date_picker(frm, "year_start_date")   // if you dont want to add nepali date only
        add_nepali_date_picker(frm, "nepali_date_convert", "year_start_date");   //  if you want to add nepali date and convert to english date      
        // add_nepali_date_picker(frm, "nepali_date_time_convert", "english_datetime_convert");  // convert in time field
        add_nepali_date_picker(frm, "nepali_date_convert_one", "english_date_convert_one"); 
        add_nepali_date_picker(frm, "year_start_date", "english_date_convert_one"); 

        add_nepali_date_picker(frm, "nepali_year_start_date", "year_start_date");
        add_nepali_date_picker(frm, "nepali_year_end_date", "year_end_date")
        // add_nepali_date_picker(frm, "english_date_convert_one", "nepali_date_convert_one"); 
    },
    year_start_date(frm) {  
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_year_start_date", NepaliFunctions.AD2BS(frm.doc.year_start_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    year_end_date(frm) {  
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_year_end_date", NepaliFunctions.AD2BS(frm.doc.year_end_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    english_datetime_convert(frm) {
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert", NepaliFunctions.AD2BS(frm.doc.english_datetime_convert.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },    
    english_date_convert_one(frm) { 
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert_one", NepaliFunctions.AD2BS(frm.doc.english_date_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    english_date_convert_one(frm) { 
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert_one", NepaliFunctions.AD2BS(frm.doc.english_date_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    english_datetime_convert_one(frm) {
        frappe.model.set_value(frm.doctype, frm.docname, "year_start_date", NepaliFunctions.AD2BS(frm.doc.english_datetime_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    nepali_date_convert_one(frm) { 
        frappe.model.set_value(frm.doctype, frm.docname, "english_date_convert_one", NepaliFunctions.BS2AD(frm.doc.nepali_date_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
});
frappe.ui.form.on('Salary Slip', {
    refresh(frm){
        // add_nepali_date_picker(frm, "nepali_start_date")
        add_nepali_date_picker(frm, "nepali_start_date", "start_date");
        add_nepali_date_picker(frm, "nepali_end_date", "end_date")
    },
    start_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_start_date", NepaliFunctions.AD2BS(frm.doc.start_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    // end_date(frm){
    //     frappe.model.set_value(frm.doctype, frm.docname, "custom_nepali_end_date", NepaliFunctions.AD2BS(frm.doc.end_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    // }
    end_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_end_date", NepaliFunctions.AD2BS(frm.doc.end_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },

});

frappe.ui.form.on('Attendance',{
    refresh(frm){
        add_nepali_date_picker(frm, "nepali_date", "attendance_date")
    },
    attendance_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date", NepaliFunctions.AD2BS(frm.doc.attendance_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    }
});

frappe.ui.form.on('Holiday List', {
    refresh(frm){
        add_nepali_date_picker(frm, "nepali_from_date", "from_date")
        add_nepali_date_picker(frm, "nepali_to_date", "to_date")
    },
    from_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_from_date", NepaliFunctions.AD2BS(frm.doc.from_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD")); 
    },
    to_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_to_date", NepaliFunctions.AD2BS(frm.doc.to_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    nepali_from_date: function (frm) {
		if (frm.doc.nepali_from_date && !frm.doc.nepali_to_date) {
			var a_year_from_start = frappe.datetime.add_months(frm.doc.nepali_from_date, 12);
			frm.set_value("nepali_to_date", frappe.datetime.add_days(a_year_from_start, -1));
		}
	},

});

// frappe.ui.form.on("holidays", {
//     holiday_date: function(frm, cdt, cdn) {
//         const row = locals[cdt][cdn]; // Get the current row
//         if (row) {
//             if (row.holiday_date) {
//                 frappe.model.set_value(cdt, cdn, "custom_nepali_dae", NepaliFunctions.AD2BS(row.holiday_date, "YYYY-MM-DD", "YYYY-MM-DD"));

//             }
//         } else {
//             console.warn("Row is not defined");
//         }
//         frm.refresh_field("holidays"); // Refresh the child table
//         // frappe.model.refresh_field(cdt, cdn, "custom_nepali_dae"); //
//         frm.reload()
//     }
//     // form_render: function (frm, cdt, cdn) {
//     //     let item = locals[cdt][cdn]
//     //     item.custom_nepali_dae
//     //     frm.refresh_field("custom_nepali_dae")
//     // }

// });

// frappe.ui.form.on("Holiday", {
//     holiday_date: function(frm, cdt, cdn) {
//         const row = locals[cdt][cdn]; // Get the current row

//         if (row && row.holiday_date) {
//             // Convert the holiday_date to Nepali date
//             const nepaliDate = NepaliFunctions.AD2BS(row.holiday_date, "YYYY-MM-DD", "YYYY-MM-DD");
//             frappe.model.set_value(cdt, cdn, "custom_nepali_dae", nepaliDate);
//         } else {
//             console.warn("Row or holiday_date is not defined");
//         }

//         frm.refresh_field("holidays"); // Refresh the child table
//     }
// });

frappe.ui.form.on('Holiday List', {
    get_weekly_off_dates: function(frm) {
        const weeklyOffDay = frm.doc.weekly_off; // Get the selected weekly off day
        const holidays = frm.doc.holidays || []; // Get existing holidays

        holidays.length = 0; // Clear existing holidays if needed

        const startDate = frm.doc.from_date; // Assume you have a start date
        const endDate = frm.doc.to_date; // Assume you have an end date

        let currentDate = new Date(startDate);
        const end = new Date(endDate);
        
        while (currentDate <= end) {
            if (currentDate.getDay() === getDayFromString(weeklyOffDay)) {
                holidays.push({
                    // holiday_date: currentDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
                    custom_nepali_dae: NepaliFunctions.AD2BS(currentDate.toISOString().split('T')[0], "YYYY-MM-DD", "YYYY-MM-DD")
                });
            }
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }

        frm.refresh_field('holidays');
    }
});

frappe.listview_settings['Attendance'] = {
    on_render: function(doc, $element) {
        const nepaliDateField = $element.find('[data-fieldname="nepali_date"]');
        
        if (nepaliDateField.length) {

            add_nepali_date_picker({
                fields_dict: {
                    nepali_date: {
                        input: nepaliDateField[0]
                    }
                },
                doctype: 'Attendance',
                docname: doc.name // Get the document name from the doc parameter
            }, 'nepali_date', 'attendance_date'); // Adjust the last parameter to your actual field name
        }
    }
};





