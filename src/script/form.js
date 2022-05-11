const formSubmit = document.querySelector('#form-submit');
const form = document.querySelector('#register-form');
let id = 0;

formSubmit.addEventListener('click', e =>{
    e.preventDefault();

    if(validForm()){
        registerForm();
    }
    showRows(1);
})

function validForm(){
    const email = form.formEmail.value;
    const fullName = form.formName.value;
    const errors = [];
    const errorList = document.querySelector("#message-error");
    clearError();

    if(fullName == '') 
        errors.push(createErrorMessage("Nome vazio"));
    if(email == '') {
        errors.push(createErrorMessage("Email vazio"));
    } else if(!validEmail(email)){
        errors.push(createErrorMessage("Email inválido"));
    }
    
    errors.forEach(function(e){
        errorList.appendChild(e);
    })
    if(errors.length > 0) return false;
    else return true;
}

function createErrorMessage(text){
    const li = document.createElement('li')
    li.textContent = text;
    li.classList.add('error-message');
    return li;
}

function validEmail(email){
    return RegExp(".+@.+\.com").test(email);
}

function clearError(){
    const errorList = document.querySelector("#message-error");
    errorList.innerHTML = '';
}

function registerForm(){
    const user = createUser()
    const tableTr = createTr(user);
    table.querySelector('tbody').appendChild(tableTr);
    form.reset();
    addEventUpdate();
    addExtraInfoEvent();
    storageAdd(user);
}
function createUser(){
    const fullName = form.formName.value.split(" ");
    const user = {
        id: id+1,
        firstName: getFirstName(fullName),
        lastName: getLastName(fullName),
        email: form.formEmail.value,
        time: getCurrentDate(),
        updated: false,
    }
    id++;
    return user;
}

function getFirstName(name){
    return name[0];
}
function getLastName(name){
    name.shift();
    let lastName = '';
    for(n in name)
        lastName += name[n] + ' ';
    return lastName.trim();
}

function getFullName(firstName, lastName){
    return firstName + ' ' + lastName;
}
function createTr(user){
    const tr = document.createElement('tr');
    tr.classList.add('table-row');
    
    const tdFName = createTd(user.firstName, "table-name");
    const tdLName = createTd(user.lastName, "table-lastName");
    const tdEmail = createTd(user.email, "table-email");
    const extraInfo = createExtraInfo(user);

    tr.appendChild(createCheckBoxTd());
    tr.appendChild(tdFName);
    tr.appendChild(tdLName);
    tr.appendChild(tdEmail);
    tr.appendChild(extraInfo);
    return tr;
}

function createTd(data, classToAdd){
    const td = document.createElement('td');
    td.classList.add(classToAdd);
    td.textContent = data;
    return td;
}
function createCheckBoxTd(){
    const td = document.createElement('td')
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('table-checkbox');
    td.appendChild(checkBox)
    return td;
}

function createExtraInfo(user){
    
    const pId = document.createElement('p');
    pId.textContent = `ID = ${user.id}`
    const pTime = document.createElement('p');
    const auxText = user.updated ? 'Updated' : 'Created';
    pTime.textContent = `${auxText} in ${user.time}`;

    const div = document.createElement('div');
    div.appendChild(pId);
    div.appendChild(pTime);

    const img = document.createElement('img');
    img.src = 'assets/icon/info-circle.svg';

    const td = document.createElement('td');
    td.classList.add('extra-info');

    td.appendChild(img);
    td.appendChild(div);
    return td;
    
}
function getCurrentDate(){
    return new Date().toLocaleString();
}

function getIdFromTableRow(tableRow){
    return tableRow.querySelector('.extra-info div p:first-child').textContent.slice(5)
}