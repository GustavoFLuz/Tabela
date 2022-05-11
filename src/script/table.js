
function tableInsert(user) {
    const tableRow = $(
        `<tr class='table-row'>
            <td><input type='checkbox' class='table-checkbox'></input></td>
            <td class='table-name'> ${user.firstName}</td>
            <td class='table-lastName'> ${user.lastName}</td>
            <td class='table-email'> ${user.email}</td>
            <td class='extra-info tooltip'>
                <img src='assets/icon/info-circle.svg'></img>
                <span class='hidden-id'>${user.id}</span>
            </td>
        </tr>`);

    addEventUpdate('.table-name', tableRow);
    addEventUpdate('.table-lastName', tableRow);
    addEventUpdate('.table-email', tableRow);

    tooltipsterSetup(user, tableRow);

    tbody.append(tableRow);

}
function initializeDelete() {
    $('#delete-selected').click(deleteDataPopup);
}
function deleteTableData(allData) {
    if (allData == true) {
        tbody.html('');
        window.localStorage.removeItem('pessoas');
    } else {
        $('.table-checkbox:checked').each(function (index) {
            const tableRow = $(this).parent().parent();
            if (tableRow.hasClass('table-row')) {
                storageDelete(getIdFromTableRow(tableRow));
                tableRow.remove();
            }
        });
    }
    closePopup();
}

function printData(users) {
    if (users)
        users.forEach(user => {
            tableInsert(user);
        })
}

function getIdFromTableRow(tableRow) {
    return tableRow.find('.hidden-id').text();
}

//  Update da tabela  
function addEventUpdate(tdClass, tableRow) {
    tableRow.find(tdClass).on('dblclick', function () { createInputBoxForUpdate($(this)); })
}

function createInputBoxForUpdate(td) {
    closePreviousUpdate();
    td.append($(`<input class='update-text-input' placeholder='aperte Enter para confimar'></input>`));
    const inputBox = $('.update-text-input')
        .blur(closePreviousUpdate)
        .on('keyup', (event) => {
            if (event.key === "Enter") {
                updateUser(inputBox.val(), td);
                inputBox.blur();
            }
        })
        .animate({ width: '50%' }, 100)
}
function closePreviousUpdate() {
    $('td .update-text-input').each(function () { this.remove(); })
}

function tooltipsterSetup(user, tableRow,) {
    tableRow.find('.tooltip').tooltipster({
        content: $(`<p> ID = <span>${user.id}</span></p>
        <p> ${user.updated ? 'Updated' : 'Created'} in ${user.time}</p>
        <p> ${calcLetras(user,0)[0]} tem ${calcLetras(user,0)[1]} letras</p>`)
    })
    initializeCalcLetras();
}
function tooltipsterUpdate(user, tableRow) {
    
    tableRow.find('.tooltip').tooltipster('content',
        $(`<p> ID = <span>${user.id}</span></p>
    <p> ${user.updated ? 'Updated' : 'Created'} in ${user.time}</p>
    <p> ${calcLetras(user,0)[0]} tem ${calcLetras(user,0)[1]} letras</p>`));
}

// Contagem de caracteres no tooltip

function tooltipsterUpdateCharacters(selectorIndex) {
    tbody.find('.tooltip').each(function () {
        const user = searchUser(getIdFromTableRow($(this).parent()));
        $(this).tooltipster('content',
            $(`<p> ID = <span>${user.id}</span></p>
            <p> ${user.updated ? 'Updated' : 'Created'} in ${user.time}</p>
            <p> ${calcLetras(user, selectorIndex)[0]} tem ${calcLetras(user, selectorIndex)[1]} letras</p>`));
    })
}
function initializeCalcLetras(){
    const LAST_INDEX = 3;
    let selectorIndex = 0;
    $('.extra-info').click(function() {
        selectorIndex++;
        if(selectorIndex == LAST_INDEX) selectorIndex=0;
        tooltipsterUpdateCharacters(selectorIndex);
    })
}

function calcLetras(user, selectorIndex) {
    let attributeName;
    let attribute;
    if(selectorIndex == 0) {attribute = 'firstName'; attributeName = 'Nome'}
    if(selectorIndex == 1) {attribute = 'lastName'; attributeName = 'Sobrenome'}
    if(selectorIndex == 2) {attribute = 'email'; attributeName = 'Email'}
    return [attributeName, user[attribute].length];
}