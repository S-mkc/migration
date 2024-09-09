frappe.ui.form.on("Out Of Office Slip", {
onload_post_render: function(frm){
	
if (frm.doc.workflow_state == "Pending" && frm.doc.custom_approver_id != frappe.session.logged_in_user)
	 {
		$('.actions-btn-group').hide()
	}
	if ( frm.doc.workflow_state == "Draft" )
	{
		$('.actions-btn-group').show()
	}
  
	// cur_frm.set_df_property('approval_status', 'hidden', 1);
 //  cur_frm.set_df_property('expense_approver', 'hidden', 1);
  cur_frm.refresh_fields();
	

},

    before_save(frm)
        {
            frappe.call({
            method: 'migration.custom_code.out_of_office_slip.add_approver',
            args: {
                owner: frm.doc.owner
            },
            freeze: true,
            callback: (r) => {
                frm.doc.custom_approver_id = r.message;
                frm.refresh_fields();
            },
            error: (r) => {
                console.log(r)
            }
            
        })
        },

    // refresh(frm)
    // {
       
    // },
      

    
})

// frappe.ui.form.on("Out Of Office Slip", {
//     onload_post_render: function(frm) {
//         // Check if the document is in 'Pending' state and the current user is not the approver
//         if (frm.doc.workflow_state === "Pending" && frm.doc.custom_approver_id !== frappe.session.user) {
//             // Use Frappe API to hide buttons
//             frm.disable_save();
//         }
//         // If the document is in 'Draft' state, show the buttons
//         if (frm.doc.workflow_state === "Draft") {
//             frm.enable_save();
//         }

//         frm.refresh_fields();  // Refresh the form fields if needed
//     },

//     before_save: function(frm) {
//         // Call your custom method to fetch approver
//         frappe.call({
//             method: 'migration.custom_code.out_of_office_slip.add_approver',
//             args: {
//                 owner: frm.doc.owner
//             },
//             freeze: true,  // Show a loader while the request is in progress
//             callback: function(r) {
//                 if (r.message) {
//                     // Set the approver ID
//                     frm.set_value('custom_approver_id', r.message);
//                     frm.refresh_fields();  // Refresh fields after setting value
//                 }
//             },
//             error: function(r) {
//                 console.log(r);  // Log any error if it occurs
//             }
//         });
//     }
// });

