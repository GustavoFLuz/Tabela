

table.querySelectorAll('th:not(.table-colCheCk):not(#extra-info)').forEach(th => th.addEventListener('click', (() => {
    const tbody = table.querySelector('tbody')
    const tableRows = tbody.querySelectorAll('tr');
    const selector = Array.from(th.parentNode.children).indexOf(th);
    const sortedArray = Array.from(tableRows).sort(comparer(selector, this.ascending = !this.ascending));
    sortIcon(this.ascending, th);

    sortedArray.forEach(tableRow => tbody.appendChild(tableRow));
    showRows(1);
})));

function comparer(index, ascending) { 
    //Função para o Sort
    return function(a, b) {
        return function(value1, value2) {
            if(checkValues(value1) && checkValues(value2)){
                return value1 - value2;
            } else {
                //comparação de value1 e value 2 como strings
                return value1.toString().localeCompare(value2);
            }
        }(getValueTD(ascending ? a : b, index), getValueTD(ascending ? b : a, index));
    }
};

function getValueTD(item, index){
    return item.children[index].textContent; //retorna o 'textContent' do trecho html
}


function checkValues(value){
    //Verifica se value não é vazio e é um número
    return (value !== '' && !isNaN(value));
}

function sortIcon(ascending, th){
    table.querySelectorAll('.sort-button img').forEach( icon =>{
        icon.classList.remove('active');
    })
    th.querySelector(
        ascending ? '.sort-button img:last-child' : '.sort-button img:first-child')
        .classList.add('active');    
}