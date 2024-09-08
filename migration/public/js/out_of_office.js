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
