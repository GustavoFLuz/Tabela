const table = document.querySelector('.table');
const search = document.querySelector('#search-box');

search.addEventListener('input', function(){
    const searchInput = search.value;
    const tableRows = document.querySelectorAll('.table-row');
    
    if(searchInput != ''){
        tableRows.forEach(function(tableRow){
            const data = [];
            let contains = false;
            data[0] = tableRow.querySelector('.table-name').textContent;
            data[1] = tableRow.querySelector('.table-lastName').textContent;
            data[2] = tableRow.querySelector('.table-email').textContent;

            for(n in data){
                if(verifyRegex(data[n], searchInput)){
                    contains = true;
                }
            }
            if(contains){
                tableRow.classList.remove('invisible');
            } else {
                tableRow.classList.add('invisible');
            }

        })
    } else{
        tableRows.forEach(function(tableRow){
            tableRow.classList.remove('invisible');
        })
    }
    showRows(1);
})

function verifyRegex(data, input){
    return RegExp(input, 'i').test(data);
}