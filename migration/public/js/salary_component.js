frappe.ui.form.on('Salary Component', {
    onload: function(frm) {
        frm.set_df_property('formula', 'read_only', 1);
    }
});