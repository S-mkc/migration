// frappe.ui.form.on('Salary Component', {
//     onload: function(frm) {
//         frm.set_df_property('formula', 'read_only', 1);
//     }
// });


// frappe.ui.form.on('Salary Component', {
//     refresh: function(frm) {
//         // Handle form behavior on load/refresh
//         handle_formula_field_visibility(frm);
//     },
//     amount_based_on_formula: function(frm) {
//         // Handle changes in the "Amount Based on Formula" checkbox
//         handle_formula_field_visibility(frm);
//     }
// });

// function handle_formula_field_visibility(frm) {
//     if (frm.is_new()) {
//         // If it's a new form (document creation), show the formula field
//         frm.set_df_property('formula', 'hidden', 0);
//         frm.set_df_property('formula', 'read_only', 0); // Make it editable
//     } else {
//         // If editing an existing Salary Component
//         if (frm.doc.amount_based_on_formula && !frm.doc.formula) {
//             // If 'Amount Based on Formula' is checked and formula is empty, show and make editable
//             frm.set_df_property('formula', 'hidden', 0);
//             frm.set_df_property('formula', 'read_only', 0);
//         } else {
//             // Hide the formula field if 'Amount Based on Formula' is not checked or formula is present
//             frm.set_df_property('formula', 'hidden', 1);
//         }
//     }
// }

frappe.ui.form.on('Salary Component', {
    refresh: function(frm) {
        // Apply logic to show/hide formula field on load
        handle_formula_field_visibility(frm);
    },
    amount_based_on_formula: function(frm) {
        // Apply logic to show/hide formula field when "Amount Based on Formula" is toggled
        handle_formula_field_visibility(frm);
    }
});

// For handling child tables like Earnings and Deductions in Salary Structure
frappe.ui.form.on('Salary Structure', {
    refresh: function(frm) {
        // Apply logic to all rows in child table on form refresh
        refresh_child_table_formula_field(frm, 'earnings');
        refresh_child_table_formula_field(frm, 'deductions');
    },
    amount_based_on_formula: function(frm, cdt, cdn) {
        // Apply logic when "Amount Based on Formula" is toggled in child table rows
        handle_child_formula_field_visibility(frm, cdt, cdn);
    }
});

// Function to handle formula field visibility in the main Salary Component form
function handle_formula_field_visibility(frm) {
    if (frm.is_new()) {
        // If creating a new Salary Component, show and allow editing the formula field
        frm.set_df_property('formula', 'hidden', 0);
        frm.set_df_property('formula', 'read_only', 0);
    } else {
        // If editing an existing Salary Component, show formula only if "Amount Based on Formula" is checked and formula is empty
        if (frm.doc.amount_based_on_formula && !frm.doc.formula) {
            frm.set_df_property('formula', 'hidden', 0);
            frm.set_df_property('formula', 'read_only', 0);
        } else {
            // Hide and make read-only otherwise
            frm.set_df_property('formula', 'hidden', 1);
            frm.set_df_property('formula', 'read_only', 1);
        }
    }
}

// Function to refresh formula field visibility in the child tables (Earnings/Deductions)
// function refresh_child_table_formula_field(frm, earnings) {
//     frm.fields_dict[earnings].grid.get_data().forEach(row => {
//         handle_child_formula_field_visibility(frm, row.doctype, row.name);
//     });
// }
function refresh_child_table_formula_field(frm, child_table) {
    frm.fields_dict[child_table].grid.get_data().forEach(row => {
        handle_child_formula_field_visibility(frm, row.doctype, row.name);
    });
}

// Function to handle formula field visibility in a child table row
function handle_child_formula_field_visibility(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    
    if (row.amount_based_on_formula && !row.formula) {
        // If "Amount Based on Formula" is checked and formula is empty, show and allow editing
        frm.fields_dict[cdt].grid.toggle_display('formula', true, cdn);
        frm.fields_dict[cdt].grid.toggle_enable('formula', true, cdn);
    } else {
        // Otherwise, hide and disable the formula field
        frm.fields_dict[cdt].grid.toggle_display('formula', false, cdn);
        frm.fields_dict[cdt].grid.toggle_enable('formula', false, cdn);
    }
    
    frm.refresh_field(cdt);
}