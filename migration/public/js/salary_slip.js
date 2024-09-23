frappe.ui.form.on('Salary Slip', {
    refresh: function(frm) {
        calculate_selected_earnings(frm);
    },
    earnings_add: function(frm) {
        calculate_selected_earnings(frm);
    },
    earnings_remove: function(frm) {
        calculate_selected_earnings(frm);
    },
    earnings_on_form_rendered: function(frm) {
        calculate_selected_earnings(frm);
    },
    deductions_add: function(frm) {
        calculate_selected_earnings(frm);
    },
    deductions_remove: function(frm) {
        calculate_selected_earnings(frm);
    },
    validate: function(frm) {
        calculate_selected_earnings(frm);
    },
    // before_save: function(frm) {
    //     calculate_selected_earnings(frm);
    // },
    

});

function calculate_selected_earnings(frm) {
    let total_selected_earnings = 0;
    let total_deductions = 0;
    // const selected_components = ['Basic', 'Grade Amount', 'Other Allowances'];
    const selected_components = ['Basic', 'Other Allowances', 'Grade Amount', 'Blog Allowance', 'Previous Month Adjustment Earning']; 
    // const deduction_components = ['PF (Employee)', 'Insurance Premium'];
    const deduction_components = ['PF (Employee)', 'Insurance Premium', 'Leave and Late Deduction', 'CIT Deduction', 'Previous Month Adjustment Deduction'];

    frm.doc.earnings.forEach(function(row) {
        if (selected_components.includes(row.salary_component)) {
            total_selected_earnings += row.amount;
        }
    });

    frm.doc.deductions.forEach(function(row) {
        if (deduction_components.includes(row.salary_component)) {
            total_deductions += row.amount;
        }
    });

    let taxable_salary = total_selected_earnings - total_deductions;

    frm.set_value('custom_taxable_salary', taxable_salary);
    cur_frm.refresh_field('custom_taxable_salary');
    cur_frm.trigger('Income Tax');
    cur_frm.trigger('Income Tax (Married)');
    
}



