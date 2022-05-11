function initializePagination(){
    $('#select-shown').on('change', ()=>{showRows(1)});
}
let numberOfPages = 0;
function showRows(page) {
    currentPage = page;
    //console.log(currentPage);
    const numberShown = $('#select-shown').val();
    const visibleUsers = users.filter(user => getFilteredUsersIds().includes(user.id));
    if (!isNaN(numberShown)) {
        numberOfPages = Math.ceil(visibleUsers.length / numberShown);
        setButtons(numberOfPages);
        setButtonsText(page, numberShown, visibleUsers.length)
        showTable(page, numberShown, visibleUsers, visibleUsers.length);
    } else {
        showAll(visibleUsers)
    }

}

function showTable(page, number, visibleUsers, totalUsers){
    tbody.html('')
    let row = ((page-1)*number);
    printData(visibleUsers.slice(row, row+Math.min(number, totalUsers-row)));
};

//Mostrar todos
function showAll(visibleUsers){
    tbody.html('');
    visibleUsers.forEach(user =>{
        tableInsert(user);
    })
    tfoot.find('tr>td>span').html('')
    tfootPages.html('');
}

function getPageNumber(page){
    if(page < 1) page = 1;
    if(page > numberOfPages) page = numberOfPages;
    currentPage = page
    showRows(currentPage);
}

// Botôes e texto do rodapé
function setButtons(pages) {
    resetButtons();
    addButton(pages);
}

function resetButtons() {
    tfootPages.html('');
    addBaseButtons();
}
function addBaseButtons() {
    tfootPages.append($(`<li><button class='btn-blue'>Anterior</button></li>`)
        .click(() => { showRows(currentPage==1? 1 : currentPage-=1) }));  // Página Anterior
    tfootPages.append($(`<li><button class='btn-blue'>Próximo</button></li>`)
        .click(() => { showRows(currentPage==numberOfPages? numberOfPages : currentPage+=1) }));  // Página Seguinte
}

function addButton(pages) {
    for (i = 1; i <= pages; i++) {
        $(`<li><button class='btn-blue'>${i}</button></li>`)
            .click((event) => { showRows($(event.target).text()); })
            .insertBefore(tfootPages.find('li:last-child'))
    }
}
function setButtonsText(page, number, total) {
    const firstItem = ((page - 1) * number) + 1;
    const lastItem = Math.min(((page) * number), total);
    tfoot.find('tr>td>span').text(`Mostrando ${firstItem}-${lastItem} de ${total} linhas`)
}
/* const tableFooterUl = document.querySelector('#tfooter-pageSelection');
let currentPage = 1;
let numberOfPages = 0;

document.querySelector('#select-shown').addEventListener('change', ()=>{showRows(1)});
window.addEventListener('load', ()=>{showRows(1)});


// Esconder itens na tabela
function hideTable(tableRows){
    tableRows.forEach(tableRow =>{
        tableRow.classList.add('not-shown');
    });
}





// Paginação


 */