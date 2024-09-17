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