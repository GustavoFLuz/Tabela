//declaração de variáveis

const form = $('#register-form');
const formSubmit = $('#form-submit');
const search = $('#search-box');

const table = $('.table');
const tbody = table.find('tbody');
const tfoot = table.find('tfoot');
const tfootPages = tfoot.find('#tfooter-pageSelection')

const users = storageGetData();
let filteredUsers = createFilteredUsers();
let maxId = getLastId();

//setup ao carregar página
$(document).ready(() => {

    //printData(users);
    showRows(1);

    initializeForm();
    initializeSearch();
    initializePagination();
    initializeSort();
    initializeDelete();
    initializeImportExport();

    initializePopUp();


})

function getCurrentDate() {
    return new Date().toLocaleString();
}