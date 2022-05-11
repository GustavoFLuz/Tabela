function deleteTableData(allData) {
    if (allData == true) {
        document.querySelectorAll('tbody').innerHTML = '';
        window.localStorage.removeItem('pessoas');
        closePopup();
    } else {
        document.querySelectorAll('.table-checkbox:checked').forEach(check => {
            const tableRow = check.parentNode.parentNode
            if (tableRow.classList.contains('table-row')) {
                deleteData(getIdFromTableRow(tableRow));
                tableRow.remove();
            }
        })
        closePopup();
    }
}