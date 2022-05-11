function initializeImportExport() {
    $('#import-export-table').click((importExportPopup));
}

//Export Files
function exportTable(type) {
    const allData = JSON.parse(window.localStorage.getItem('pessoas'));
    let currentData = [];
    if ($('.selected-only input').prop('checked')) {
        $('.table-checkbox:checked').each(checkbox => {
            const id = getIdFromTableRow(checkbox.parentNode.parentNode);
            currentData.push(searchUser(id))
        })
    } else {
        currentData = allData;
    }
    if (type == 'JSON') {
        var data = new Blob([JSON.stringify(currentData, null, 1)]);
        popupButtons.find('a:nth-child(2)').attr('href', URL.createObjectURL(data))
    }
    if (type == 'CSV') {
        var data = new Blob([convertJsonToCsv(currentData)]);
        popupButtons.find('a:nth-child(3)').attr('href', URL.createObjectURL(data)); ;
    }
}



//Import Files
function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', function (event) {
        const result = event.target.result;
        if (file.type == 'text/csv')
            createImportPopup(convertCsvToJson(result));
        else createImportPopup(result);
    });
    reader.readAsText(file);
}

function importTable(text, replace) {
    const importedUsers = JSON.parse(text);
    if (replace) {
        tbody.html('');
        updateAllData(importedUsers);
    } else {
        printData(importedUsers);
        importedUsers.forEach(user => storageAdd(user));
    }
    window.location.reload();
}

function convertJsonToCsv(json) {
    const array = [Object.keys(json[0])].concat(json)
    return array.map(it => {
        return Object.values(it).toString()
    }).join('\n')
}

function convertCsvToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j].replaceAll('\"', '');
        }
        result.push(obj);
    }
    return JSON.stringify(result); //JSON
}