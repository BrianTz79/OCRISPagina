/**
 * OuroCore Real Time Inventory System (OCRIS)
 * Main application script for Single-Page Application (SPA) functionality.
 */
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    /**
     * Fetches and loads the content of a given page into the main content area.
     * @param {string} page - The name of the HTML file to load (e.g., 'dashboard').
     */
    const loadPage = async (page) => {
        // Show a loading state (optional)
        mainContent.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 80vh;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`;

        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                throw new Error(`Page not found: ${page}.html`);
            }
            const content = await response.text();
            mainContent.innerHTML = content;
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Error 404</h4>
                    <p>No se pudo cargar el contenido de la página solicitada. Por favor, verifique que el archivo <strong>pages/${page}.html</strong> exista.</p>
                </div>`;
        }
    };

    /**
     * Handles clicks on the sidebar navigation links.
     */
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Remove 'active' class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Add 'active' class to the clicked link
            link.classList.add('active');

            const pageToLoad = link.getAttribute('data-page');
            loadPage(pageToLoad);
        });
    });

    // Load the default page (dashboard) on initial load
    loadPage('dashboard');
});