const popup = document.querySelector('.custom-popup');
const popupButtons = popup.querySelector('.custom-popup-buttons');
const popupTitle = popup.querySelector('p');

popup.addEventListener('click', (event) => { //caso clique fora do container, o popup se fecha
    let target = event.target;
    while (target != document.querySelector('body')) {
        if (target == null) return;
        if (target.classList.contains('container')) {
            return;
        } else if (target.classList.contains('custom-popup')) {
            closePopup();
            break;
        } else target = target.parentNode;
    }
})

function enablePopup() {
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = '';
}

function resetPopup() {
    popup.querySelector('p').textContent = '';
    popupButtons.innerHTML = '';
}

function createPopupButton(type, text, eventListener, btnClass) {
    const btn = document.createElement(type);
    btn.textContent = text;
    if (btnClass)
        btn.classList.add(btnClass);
    if (eventListener)
        btn.addEventListener('click', eventListener);
    return btn;
}
// DELETE 
document.querySelector('#delete-selected').addEventListener('click', () => {
    resetPopup();
    if (document.querySelectorAll('.table-checkbox:checked').length > 0) {
        popupTitle.textContent = 'Tem certeza que deseja deletar todos as pessoas selecionadas?';
        popupButtons.appendChild(createPopupButton('button', 'Sim', deleteTableData));
        popupButtons.appendChild(createPopupButton('button', 'Não', closePopup));
        enablePopup();
    } else {
        popupTitle.textContent = 'Tem certeza que deseja deletar todos os dados?';
        popupButtons.appendChild(createPopupButton('button', 'Sim', ()=>{deleteTableData(true)}));
        popupButtons.appendChild(createPopupButton('button', 'Não', closePopup));
        enablePopup();
    }
});

//IMPORT AND EXPORT
document.querySelector('#import-export-table').addEventListener('click', () => {
    resetPopup();
    popupTitle.textContent = 'Deseja importar dados ou exportar dados?';
    popupButtons.appendChild(createPopupButton('button', 'Exportar', createExportPopup));

    const importTableButton = createPopupButton('label', 'Importar', '', 'import-table');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    importTableButton.appendChild(input);
    importTableButton.addEventListener('change', (event)=>{readFile(event.target.files[0])});
    popupButtons.appendChild(importTableButton);
    enablePopup();
});

function createExportPopup() {
    resetPopup();
    popupTitle.textContent = 'Escolha o formato de arquivo:';

    const selectedOnly = createPopupButton('label', 'Selecionados apenas', '', 'selected-only');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    selectedOnly.appendChild(input);

    const jsonBtn = createPopupButton('a', 'JSON', () => { exportTable('JSON') });
    const csvBtn = createPopupButton('a', 'CSV', () => { exportTable('CSV') });
    jsonBtn.setAttribute('download', 'tabela.json');
    csvBtn.setAttribute('download', 'tabela.csv');

    popupButtons.appendChild(selectedOnly);
    popupButtons.appendChild(jsonBtn);
    popupButtons.appendChild(csvBtn);

    enablePopup();

}

function createImportPopup(text) {
    resetPopup();
    popupTitle.textContent = 'Deseja adicionar ou substituir os dados atuais?';

    const adicionar = createPopupButton('button', 'Adicionar', () => { importTable(text, false) });
    const substituir = createPopupButton('button', 'Substituir', () => { importTable(text, true) });

    popupButtons.appendChild(adicionar);
    popupButtons.appendChild(substituir);
    enablePopup();
}