// frappe.ui.form.on('Salary Component', {
//     onload: function(frm) {
//         frm.set_df_property('formula', 'read_only', 1);
//     }
// });


frappe.ui.form.on('Salary Component', {
    refresh: function(frm) {
        // Handle form behavior on load/refresh
        handle_formula_field_visibility(frm);
    },
    amount_based_on_formula: function(frm) {
        // Handle changes in the "Amount Based on Formula" checkbox
        handle_formula_field_visibility(frm);
    }
});

function handle_formula_field_visibility(frm) {
    if (frm.is_new()) {
        // If it's a new form (document creation), show the formula field
        frm.set_df_property('formula', 'hidden', 0);
        frm.set_df_property('formula', 'read_only', 0); // Make it editable
    } else {
        // If editing an existing Salary Component
        if (frm.doc.amount_based_on_formula && !frm.doc.formula) {
            // If 'Amount Based on Formula' is checked and formula is empty, show and make editable
            frm.set_df_property('formula', 'hidden', 0);
            frm.set_df_property('formula', 'read_only', 0);
        } else {
            // Hide the formula field if 'Amount Based on Formula' is not checked or formula is present
            frm.set_df_property('formula', 'hidden', 1);
        }
    }
}