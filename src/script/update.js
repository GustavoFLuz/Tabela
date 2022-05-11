
function addEventUpdate(){
    document.querySelectorAll('td:not(td:first-child):not(.extra-info)')
        .forEach(td => td.addEventListener('dblclick', ()=>{createInputBoxForUpdate(td)}));
}

function createInputBoxForUpdate(td){
    closePreviousUpdate();
    const textBox = document.createElement('input');
    textBox.classList.add('update-text-input');
    textBox.setAttribute('placeholder', 'aperte Enter para confimar')
    td.appendChild(textBox);
    const textBoxCreated = td.querySelector('.update-text-input');
    setTimeout(() => {
        textBoxCreated.style.transition = "all 0.4s ease";
        textBoxCreated.style.width = "50%";
      }, "1");

    textBoxCreated.addEventListener('blur', closePreviousUpdate);
    textBox.addEventListener('keyup', (event)=>{
        if (event.key === "Enter") {
            const inputValue = textBox.value;
            updateUser(inputValue, td);
            textBox.blur();
        }    
    })
}

function closePreviousUpdate(){
    document.querySelectorAll('td .update-text-input').forEach(input => {
        input.remove();
    })
}

function updateUser(inputValue, td){

    const tableRow = td.parentNode;
    const currentUser = {
        firstName: tableRow.querySelector('.table-name').textContent,
        lastName: tableRow.querySelector('.table-lastName').textContent,
        email: tableRow.querySelector('.table-email').textContent,
        id: tableRow.querySelector('.extra-info div p:first-child').textContent.slice(5)
    }

    const newUser = {...currentUser};
    if(td.classList[0] == 'table-name') {
        newUser.firstName = inputValue;
        tableRow.querySelector('.table-name').textContent = inputValue;
    }
    if(td.classList[0] == 'table-lastName') {
        newUser.lastName = inputValue;
        tableRow.querySelector('.table-lastName').textContent = inputValue;
    }
    if(td.classList[0] == 'table-email')  {
        if(!validEmail(inputValue)){
            validEmailUpdate(td);
        }else{        
            newUser.email = inputValue;
            tableRow.querySelector('.table-email').textContent = inputValue;
        }
    }
    updateDate(newUser, tableRow);
    updateData(newUser);
}

function validEmailUpdate(td){
    const invalidEmail = document.createElement('input');
    invalidEmail.classList.add('invalid-email');
    invalidEmail.setAttribute('placeholder', 'Email Inválido X')
    td.appendChild(invalidEmail);
    const invalidEmailCreated = td.querySelector('.invalid-email');
    invalidEmailCreated.addEventListener('click', ()=>{invalidEmailCreated.remove()});
}

function updateDate(user, tableRow){
    user.updated = true;
    user.time = getCurrentDate();
    const p = tableRow.querySelector('.extra-info div p:last-child');
    p.textContent = `${user.updated ? 'Updated' : 'Created'} in ${user.time}`;
}