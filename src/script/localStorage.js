let users = [];
window.addEventListener('load', e => {
    storageGetData();
})

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = 0, key;
    for (; key = keys[i]; i++) {
        values.push(key);
    }
    return values;
}

function printData(users) {
    getLastId();
    users.forEach(user => {
        table.querySelector('tbody').appendChild(createTr(user))
    })
    addEventUpdate();
}

function storageAdd(user) {
    users.push(user)
    window.localStorage.setItem('pessoas', JSON.stringify(users));
}

function storageGetData() {
    if (window.localStorage.getItem('pessoas')) {
        users = Array.from(JSON.parse(window.localStorage.getItem('pessoas')))
        printData(users);
    }
}

function deleteData(id) {
    users.forEach(user => {
        if (user.id == id) pos = users.indexOf(user);
    })
    users.splice(pos, 1);
    window.localStorage.setItem('pessoas', JSON.stringify(users));
}

function updateData(newUser) {
    users.forEach(user => {
        if (user.id == newUser.id) pos = users.indexOf(user);
    })
    users[pos] = newUser;
    window.localStorage.setItem('pessoas', JSON.stringify(users));
}

function updateAllData(newData) {
    window.localStorage.setItem('pessoas', JSON.stringify(newData));
}

function getLastId() {
    users.forEach(user => { if (user.id > id) id = user.id; })
}

function searchUser(id) {
    for (i = 0; i < users.length; i++) {
        if (users[i].id == id)
            return users[i];
    }
}