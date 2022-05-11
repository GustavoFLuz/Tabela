const tableFooterUl = document.querySelector('#tfooter-pageSelection');
let currentPage = 1;
let numberOfPages = 0;

document.querySelector('#select-shown').addEventListener('change', ()=>{showRows(1)});
window.addEventListener('load', ()=>{showRows(1)});

function showRows(page){
    //console.log(currentPage);
    const numberShown = document.querySelector('#select-shown').value;
    const visibleTableRows = table.querySelectorAll('tbody .table-row:not(.invisible)');

    if(!isNaN(numberShown)){
        numberOfPages = Math.ceil(visibleTableRows.length / numberShown);

        setButtons(numberOfPages);
        setButtonsText(page,numberShown, visibleTableRows.length)
        hideTable(visibleTableRows);
        showTable(page, numberShown, visibleTableRows, visibleTableRows.length);
    }else{
        mostrarTodos(visibleTableRows)
    }

}

// Esconder itens na tabela
function hideTable(tableRows){
    tableRows.forEach(tableRow =>{
        tableRow.classList.add('not-shown');
    });
}
function showTable(page, number, tableRows, totalRows){
    let row = ((page-1)*number);
    const lastItem = Math.min(((page)*number)-1, totalRows-1);
    while(row <= lastItem){
        tableRows[row].classList.remove('not-shown');
        row++;
    }
};


// Definir botões da paginação
function setButtons(pages){
    resetButtons();
    addButton(pages);
}

function resetButtons(){
    tableFooterUl.innerHTML = '';
    addBaseButtons();
}
function addBaseButtons(){
    const btnAnterior = document.createElement('li');
    const btnProximo = document.createElement('li');

    btnAnterior.appendChild(document.createElement('button'));
    btnProximo.appendChild(document.createElement('button'));

    btnAnterior.querySelector('button').classList.add('btn-blue');
    btnProximo.querySelector('button').classList.add('btn-blue');
    
    btnAnterior.querySelector('button').textContent = "Anterior";
    btnProximo.querySelector('button').textContent = "Próximo";

    btnAnterior.addEventListener('click', () =>{getPageNumber(currentPage-1)});
    btnProximo.addEventListener('click', () =>{getPageNumber(currentPage+1)});

    tableFooterUl.appendChild(btnAnterior);
    tableFooterUl.appendChild(btnProximo);
}
function addButton(pages){
    const nextPage = tableFooterUl.querySelector('li:last-child');
    for(i=1;i <= pages;i++){
        const btn = document.createElement('button');
        btn.classList.add('btn-blue');
        btn.textContent = i;
        btn.addEventListener('click', (event) =>{getPageNumber(event.target.textContent)});

        const li = document.createElement('li');
        li.appendChild(btn);
        nextPage.insertAdjacentElement('beforebegin', li)
    }
}
function setButtonsText(page, number, total){
    const firstItem = ((page-1)*number)+1;
    const lastItem = Math.min(((page)*number), total);
    
    tableFooterUl.parentNode.querySelector('span').textContent = 
        `Mostrando ${firstItem}-${lastItem} de ${total} linhas`;
}

// Paginação
function getPageNumber(page){
    if(page < 1) page = 1;
    if(page > numberOfPages) page = numberOfPages;
    currentPage = page
    showRows(currentPage);
}

//Mostrar todos
function mostrarTodos(tableRows){
    tableRows.forEach(row =>{
        if(row.classList.contains('not-shown')) row.classList.remove('not-shown');
    })
    tableFooterUl.parentNode.querySelector('span').textContent = '';
    tableFooterUl.innerHTML = '';
}