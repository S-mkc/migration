document.addEventListener('DOMContentLoaded', function () {
    function hideElements(selector) {
        var currentUser = frappe.boot.user.name;

        if (currentUser !== 'Administrator') {
            // Immediately attempt to hide the elements on page load
            var elements = document.querySelectorAll(selector);
            elements.forEach(function (el) {
                el.style.display = 'none';
            });

            // Set up a MutationObserver to watch for future DOM changes
            var observer = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) {
                            // Hide elements if they match the selector
                            var matchingElements = node.querySelectorAll(selector);
                            matchingElements.forEach(function (el) {
                                el.style.display = 'none';
                            });

                            // Also, check if the added node itself matches the selector
                            if (node.matches(selector)) {
                                node.style.display = 'none';
                            }
                        }
                    });
                });
            });

            // Start observing the document for changes
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    const selectors = [
        'button[data-label="Create%20Workspace"]',
        'button[data-label="Edit"]'
    ];

    selectors.forEach(hideElements);
});

// setTimeout(function() {
//     hideElements('button[data-label="Create%20Workspace"]');
//     hideElements('button[data-label="Edit"]');
// }, 100); // 100ms delay