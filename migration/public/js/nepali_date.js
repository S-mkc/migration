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

frappe.ui.form.on('Fiscal Year',{
    refresh(frm) {
        // frm.fields_dict['year_start_date'].input.hide();
        add_nepali_date_picker(frm, "nepali_date");
        add_nepali_date_picker(frm, "year_start_date")   // if you dont want to add nepali date only
        add_nepali_date_picker(frm, "nepali_date_convert", "english_date_convert");   //  if you want to add nepali date and convert to english date      
        // add_nepali_date_picker(frm, "nepali_date_time_convert", "english_datetime_convert");  // convert in time field
        add_nepali_date_picker(frm, "nepali_date_convert_one", "english_date_convert_one"); 
        add_nepali_date_picker(frm, "nepali_date_convert", "year_start_date")
    },
    english_date_convert(frm) {  
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert", NepaliFunctions.AD2BS(frm.doc.english_date_convert.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    english_datetime_convert(frm) {
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert", NepaliFunctions.AD2BS(frm.doc.english_datetime_convert.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },    
    english_date_convert_one(frm) { 
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert_one", NepaliFunctions.AD2BS(frm.doc.english_date_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    english_datetime_convert_one(frm) {
        frappe.model.set_value(frm.doctype, frm.docname, "nepali_date_convert_one", NepaliFunctions.AD2BS(frm.doc.english_datetime_convert_one.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    }
});

frappe.ui.form.on('Salary Slip', {
    refresh(frm){
        add_nepali_date_picker(frm, "custom_nepali_start_date")
        add_nepali_date_picker(frm, "custom_nepali_start_date", "start_date");
        add_nepali_date_picker(frm, "custom_nepali_end_date", "end_date")
    },
    start_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "custom_nepali_start_date", NepaliFunctions.AD2BS(frm.doc.start_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    },
    // end_date(frm){
    //     frappe.model.set_value(frm.doctype, frm.docname, "custom_nepali_end_date", NepaliFunctions.AD2BS(frm.doc.end_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    // }
    end_date(frm){
        frappe.model.set_value(frm.doctype, frm.docname, "custom_nepali_end_date", NepaliFunctions.AD2BS(frm.doc.end_date.split(" ")[0], "YYYY-MM-DD", "YYYY-MM-DD"));
    }

})

