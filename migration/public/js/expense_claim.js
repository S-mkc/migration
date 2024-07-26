frappe.ui.form.on("Expense Claim", {
    before_save(frm)
    {
        frappe.call({
        method: 'migration.custom_code.expense_claim.add_approver',
        args: {
            owner: frm.doc.owner
        },
        freeze: true,
        callback: (r) => {
            frm.doc.expense_approver = r.message;
            frm.refresh_fields();
        },
        error: (r) => {
            console.log(r)
        }
        
    })
    },
    onload: function(frm) {
        // Ensure the field is set to non-mandatory
        frm.set_df_property('expense_approver', 'reqd', 0);
    },
})