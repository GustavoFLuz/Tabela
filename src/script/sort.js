function initializeSort(){
    $('.sortable').each(function(){$(this).click(function(){
        users.sort(comparer(getKeyFromTh($(this)), this.ascending = !this.ascending));
        sortIcon(this.ascending, $(this));
        showRows(1);
    })})
}

function getKeyFromTh(th){
    if(th.hasClass('table-colName')) return 'firstName';
    if(th.hasClass('table-colLastname')) return 'lastName';
    if(th.hasClass('table-colEmail')) return 'email';
    if(th.hasClass('table-colTime')) return 'time';
}

function comparer(key, ascending) { 
    //Função para o Sort
    return function(a, b) {
        return function(value1, value2) {
            if(checkValues(value1) && checkValues(value2)){
                return value1 - value2;
            } else {
                //comparação de value1 e value 2 como strings
                return value1.toString().localeCompare(value2);
            }
        }(ascending ? a[key] : b[key], ascending ? b[key] : a[key]);
    }
};
function checkValues(value){
    //Verifica se value não é vazio e é um número
    return (value !== '' && !isNaN(value));
}


function sortIcon(ascending, th){
    $('.sort-button img').removeClass('active');

    th.find(ascending ? '.sort-button img:last-child' : '.sort-button img:first-child')
        .addClass('active');
}