(function () {
    "use strict";
    window.initHome = function() {
        // Generate "GitHub Graph"
        const graphContainer = document.getElementById('github-graph');
        if (graphContainer && graphContainer.children.length === 0) {
            const cols = 22;
            const rows = 7;
            for (let i = 0; i < cols * rows; i++) {
                const square = document.createElement('div');
                square.classList.add('square');
                // Randomly generate some activity
                const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                square.setAttribute('data-level', level);
                graphContainer.appendChild(square);
            }
        }
    };

    // Run on initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initHome);
    } else {
        window.initHome();
    }
})();
