frappe.ready(function() {
    
    if (!frappe.user.has_role('Administrator')) {
        $('button[data-label="Create%20Workspace"]').hide();
        $('button[data-label="Edit"]').hide();
    }
});