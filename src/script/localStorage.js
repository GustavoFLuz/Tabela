
function storageGetData() {
    if (window.localStorage.getItem('pessoas')) {
        return Array.from(JSON.parse(window.localStorage.getItem('pessoas')));
    }
    return {};    
}

function storageAdd(user) {
    window.localStorage.setItem('pessoas', JSON.stringify(users));
}

function storageDelete(id) {
    users.splice(searchUserPosition(id), 1);
    window.localStorage.setItem('pessoas', JSON.stringify(users));
}

function updateAllData(newData) {
    window.localStorage.setItem('pessoas', JSON.stringify(newData));
}


function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = 0, key;
    for (; key = keys[i]; i++) {
        values.push(key);
    }
    return values;
}
