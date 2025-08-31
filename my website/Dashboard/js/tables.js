/**
 * Tables Page JavaScript
 * Handles table functionality, sorting, filtering, and CRUD operations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tables page components
    initTablesPage();
});

function initTablesPage() {
    // Setup table sorting
    setupTableSorting();
    
    // Setup table search
    setupTableSearch();
    
    // Setup table actions
    setupTableActions();
    
    // Setup modals
    setupModals();
    
    // Add animations
    addAnimations();
}

// Table sorting functionality
function setupTableSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const columnIndex = Array.from(this.parentNode.children).indexOf(this);
            const sortDirection = this.classList.contains('sort-asc') ? 'desc' : 'asc';
            
            // Remove sort classes from all headers
            sortableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Add sort class to current header
            this.classList.add(`sort-${sortDirection}`);
            
            // Sort the table
            sortTable(table, columnIndex, sortDirection);
        });
    });
}

// Sort table function
function sortTable(table, columnIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Sort rows
    const sortedRows = rows.sort((a, b) => {
        const aValue = getCellValue(a, columnIndex);
        const bValue = getCellValue(b, columnIndex);
        
        // Compare values
        if (direction === 'asc') {
            return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
            return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }
    });
    
    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    // Add sorted rows
    sortedRows.forEach(row => {
        tbody.appendChild(row);
    });
    
    // Show notification
    if (window.notificationSystem) {
        window.notificationSystem.showNotification({
            type: 'info',
            title: 'Table Sorted',
            message: `Table sorted by ${table.querySelector('th:nth-child(' + (columnIndex + 1) + ')').textContent.trim()} in ${direction === 'asc' ? 'ascending' : 'descending'} order.`,
            duration: 2000
        });
    }
}

// Get cell value for sorting
function getCellValue(row, columnIndex) {
    const cell = row.querySelector(`td:nth-child(${columnIndex + 1})`);
    
    // Handle special cases
    if (cell.querySelector('.author-name')) {
        return cell.querySelector('.author-name').textContent.trim();
    } else if (cell.querySelector('.project-name')) {
        return cell.querySelector('.project-name').textContent.trim();
    } else if (cell.querySelector('.status-badge')) {
        return cell.querySelector('.status-badge').textContent.trim();
    } else if (cell.querySelector('.progress-text')) {
        return cell.querySelector('.progress-text').textContent.trim();
    } else {
        return cell.textContent.trim();
    }
}

// Table search functionality
function setupTableSearch() {
    const authorSearch = document.getElementById('authorSearch');
    const projectSearch = document.getElementById('projectSearch');
    
    if (authorSearch) {
        authorSearch.addEventListener('input', function() {
            filterTable('authorsTable', this.value);
        });
    }
    
    if (projectSearch) {
        projectSearch.addEventListener('input', function() {
            filterTable('projectsTable', this.value);
        });
    }
}

// Filter table function
function filterTable(tableId, query) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update pagination info
    if (tableId === 'authorsTable') {
        document.getElementById('startRecord').textContent = visibleCount > 0 ? '1' : '0';
        document.getElementById('endRecord').textContent = visibleCount.toString();
        document.getElementById('totalRecords').textContent = visibleCount.toString();
    }
    
    // Show notification if no results
    if (visibleCount === 0 && query !== '') {
        if (window.notificationSystem) {
            window.notificationSystem.showNotification({
                type: 'info',
                title: 'No Results',
                message: `No matching records found for "${query}".`,
                duration: 3000
            });
        }
    }
}

// Table actions functionality
function setupTableActions() {
    // Refresh buttons
    const refreshAuthorsBtn = document.getElementById('refreshAuthorsTable');
    const refreshProjectsBtn = document.getElementById('refreshProjectsTable');
    
    if (refreshAuthorsBtn) {
        refreshAuthorsBtn.addEventListener('click', function() {
            refreshTable('authorsTable');
        });
    }
    
    if (refreshProjectsBtn) {
        refreshProjectsBtn.addEventListener('click', function() {
            refreshTable('projectsTable');
        });
    }
    
    // Add new buttons
    const addAuthorBtn = document.getElementById('addNewAuthor');
    const addProjectBtn = document.getElementById('addNewProject');
    
    if (addAuthorBtn) {
        addAuthorBtn.addEventListener('click', function() {
            openModal('authorModal');
            document.getElementById('authorModalTitle').textContent = 'Add New Author';
            document.getElementById('authorForm').reset();
        });
    }
    
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            openModal('projectModal');
            document.getElementById('projectModalTitle').textContent = 'Add New Project';
            document.getElementById('projectForm').reset();
        });
    }
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const isAuthor = row.querySelector('.author-name') !== null;
            
            if (isAuthor) {
                openModal('authorModal');
                document.getElementById('authorModalTitle').textContent = 'Edit Author';
                
                // Fill form with data (in a real app, this would use IDs and fetch data)
                document.getElementById('authorName').value = row.querySelector('.author-name').textContent;
                document.getElementById('authorEmail').value = row.querySelector('.author-email').textContent;
                document.getElementById('authorFunction').value = row.cells[1].textContent;
                document.getElementById('authorStatus').value = row.querySelector('.status-badge').classList.contains('online') ? 'online' : 'offline';
                document.getElementById('authorEmployed').value = formatDateForInput(row.cells[3].textContent);
            } else {
                openModal('projectModal');
                document.getElementById('projectModalTitle').textContent = 'Edit Project';
                
                // Fill form with data
                document.getElementById('projectName').value = row.querySelector('.project-name').textContent;
                document.getElementById('projectBudget').value = row.cells[1].textContent;
                
                const statusBadge = row.querySelector('.status-badge');
                let status = '';
                if (statusBadge.classList.contains('working')) status = 'working';
                else if (statusBadge.classList.contains('done')) status = 'done';
                else if (statusBadge.classList.contains('error')) status = 'error';
                else if (statusBadge.classList.contains('pending')) status = 'pending';
                
                document.getElementById('projectStatus').value = status;
                
                const progressText = row.querySelector('.progress-text').textContent;
                document.getElementById('projectCompletion').value = parseInt(progressText);
            }
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            
            // Store reference to the row for deletion
            window.rowToDelete = row;
            
            openModal('deleteConfirmModal');
        });
    });
    
    // Confirm delete
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            if (window.rowToDelete) {
                // Get item name for notification
                let itemName = '';
                if (window.rowToDelete.querySelector('.author-name')) {
                    itemName = window.rowToDelete.querySelector('.author-name').textContent;
                } else if (window.rowToDelete.querySelector('.project-name')) {
                    itemName = window.rowToDelete.querySelector('.project-name').textContent;
                }
                
                // Remove the row
                window.rowToDelete.remove();
                window.rowToDelete = null;
                
                // Close modal
                closeModal('deleteConfirmModal');
                
                // Show notification
                if (window.notificationSystem) {
                    window.notificationSystem.showNotification({
                        type: 'success',
                        title: 'Item Deleted',
                        message: `"${itemName}" has been deleted successfully.`,
                        duration: 3000
                    });
                }
            }
        });
    }
    
    // Form submissions
    const authorForm = document.getElementById('authorForm');
    const projectForm = document.getElementById('projectForm');
    
    if (authorForm) {
        authorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send data to a server
            const isEdit = document.getElementById('authorModalTitle').textContent.includes('Edit');
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'success',
                    title: isEdit ? 'Author Updated' : 'Author Added',
                    message: `Author "${document.getElementById('authorName').value}" has been ${isEdit ? 'updated' : 'added'} successfully.`,
                    duration: 3000
                });
            }
            
            // Close modal
            closeModal('authorModal');
        });
    }
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send data to a server
            const isEdit = document.getElementById('projectModalTitle').textContent.includes('Edit');
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'success',
                    title: isEdit ? 'Project Updated' : 'Project Added',
                    message: `Project "${document.getElementById('projectName').value}" has been ${isEdit ? 'updated' : 'added'} successfully.`,
                    duration: 3000
                });
            }
            
            // Close modal
            closeModal('projectModal');
        });
    }
}

// Refresh table function
function refreshTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    // Reset search
    const searchInput = document.getElementById(tableId === 'authorsTable' ? 'authorSearch' : 'projectSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Show all rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset sorting
    const sortableHeaders = table.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Update pagination info for authors table
    if (tableId === 'authorsTable') {
        document.getElementById('startRecord').textContent = '1';
        document.getElementById('endRecord').textContent = rows.length.toString();
        document.getElementById('totalRecords').textContent = rows.length.toString();
    }
    
    // Show notification
    if (window.notificationSystem) {
        window.notificationSystem.showNotification({
            type: 'success',
            title: 'Table Refreshed',
            message: 'The table has been refreshed successfully.',
            duration: 2000
        });
    }
    
    // Add refresh animation
    table.classList.add('refresh-animation');
    setTimeout(() => {
        table.classList.remove('refresh-animation');
    }, 500);
}

// Modal functionality
function setupModals() {
    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close, #cancelAuthorForm, #cancelProjectForm, #cancelDelete');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Format date for input field
function formatDateForInput(dateStr) {
    try {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return '';
    } catch (e) {
        return '';
    }
}

// Add animations to tables page elements
function addAnimations() {
    // Table cards animations
    const cards = document.querySelectorAll('.table-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
        card.classList.add('slide-in-up');
    });
    
    // Add refresh animation class
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes refreshAnimation {
                0% {
                    opacity: 0.5;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: 1;
                }
            }
            
            .refresh-animation {
                animation: refreshAnimation 0.5s ease;
            }
        </style>
    `);
}