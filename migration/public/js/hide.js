// frappe.ready(function() {
//     if (!frappe.user.has_role('Administrator')) {
//         $('button[data-label="Create%20Workspace"]').hide();
//         $('button[data-label="Edit"]').hide();
//         console.log("Buttons hidden for non-Administrators");
//     }
// });

// frappe.ready(function() {
//     if (!frappe.user.has_role('Administrator')) {
//         const observer = new MutationObserver(() => {
//             $('button[data-label="Create%20Workspace"]').hide();
//             $('button[data-label="Edit"]').hide();
//             console.log("Buttons hidden for non-Administrators");
//         });

//         // Observe the body for any child additions (buttons getting added to DOM)
//         observer.observe(document.body, { childList: true, subtree: true });

//         // Hide the buttons immediately on page load
//         $('button[data-label="Create%20Workspace"]').hide();
//         $('button[data-label="Edit"]').hide();
//     }
// });
