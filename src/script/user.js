class User {
    constructor(id, firstName, lastName, email, time, updated) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.time = getCurrentDate();
        this.updated = false;

    }
}

function getLastId() {
    let currentMaxId = 0
    if (users)
        users.forEach(user => { if (parseInt(user.id) > currentMaxId) currentMaxId = user.id; })
    return currentMaxId;
}

function searchUser(id) {
    for (i = 0; i < users.length; i++) {
        if (users[i].id == id)
            return users[i];
    }
}
function searchUserPosition(id) {
    if(!users) return -1;
    let pos = -1;
    users.forEach(
        user => {
            if (user.id == id) pos = users.indexOf(user);
        })
    return pos;
}

function addUser(user){
    users.push(user);
    filteredUsers.push({id:user.id, filter:false})
    storageAdd(user);
}

// Usuários filtrados

function createFilteredUsers() {
    if(!users)return []

    const filtered = []
    users.forEach(function (user) {
        filtered.push({
            id: user.id,
            filter: false
        })
    })
    return filtered;
};
function getFilteredUsersIds() {
    return filteredUsers.filter(user => user.filter == false)
        .map(function (user) {
            return user.id
        })
}

function filterUser(id) {
    filteredUsers.find(user => user.id == id).filter = true;
}
function unfilterUser(id) {
    filteredUsers.find(user => user.id == id).filter = false;
}

//Update
function updateUser(inputValue, td){
    const tableRow = td.parent();
    const newUser = searchUser(getIdFromTableRow(tableRow));

    if(td[0].className == 'table-name') {
        newUser.firstName = inputValue;
        tableRow.find('.table-name').text(inputValue);
    }
    if(td[0].className == 'table-lastName') {
        newUser.lastName = inputValue;
        tableRow.find('.table-lastName').text(inputValue);
    }
    if(td[0].className == 'table-email')  {
        if(!validEmail(inputValue)){
            validEmailUpdate(td);
        }else{        
            newUser.email = inputValue;
            tableRow.find('.table-email').text(inputValue);
        }
    }
    updateDate(newUser, tableRow);
    updateAllData(users);
}

function validEmailUpdate(td){
    td.append(
        $(`<input class='invalid-email' placeholder='Email Inválido'></input>`)
        .click(function(){this.remove()}));
}

function updateDate(user, tableRow){
    user.updated = true;
    user.time = getCurrentDate();
    tooltipsterUpdate(user, tableRow)
}