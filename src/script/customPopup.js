const popup = $('.custom-popup');
const popupButtons = popup.find('.custom-popup-buttons');
const popupTitle = popup.find('p');

function initializePopUp() {
    $(popup).click((event) => {  //caso clique fora do container, o popup se fecha
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
    });
}

function enablePopup() {
    popup.css('display', 'flex');
}

function closePopup() {
    popup.css('display', 'none');
}

function resetPopup() {
    popup.find('p').text('');
    popupButtons.html('');
}
function createPopupButton(type, text, eventListener, btnClass) {
    return $(
        `<${type} class='${btnClass}'>
            ${text}
        </${type}>`
    ).click(eventListener);
}

// DELETE POPUP
function deleteDataPopup() {
    resetPopup();
    if ($('.table-checkbox:checked').length) {
        popupTitle.text("Tem certeza que deseja deletar todos as pessoas selecionadas?");
        popupButtons.append(createPopupButton('button', 'Sim', deleteTableData));
        popupButtons.append(createPopupButton('button', 'Não', closePopup));
        enablePopup();
    } else {
        popupTitle.text("Tem certeza que deseja deletar todos os dados?");
        popupButtons.append(createPopupButton('button', 'Sim', () => { deleteTableData(true) }));
        popupButtons.append(createPopupButton('button', 'Não', closePopup));
        enablePopup();
    }
}

//IMPORT AND EXPORT
function importExportPopup() {
    resetPopup();
    popupTitle.text("Deseja importar dados ou exportar dados?");
    popupButtons.append(createPopupButton('button', 'Exportar', createExportPopup));

    const importTableButton = createPopupButton('label', 'Importar', '', 'import-table');
    importTableButton.append($("<input type='file'></input>"));
    importTableButton.change((event) => { readFile(event.target.files[0]) });
    popupButtons.append(importTableButton);
    enablePopup();
}

function createExportPopup() {
    resetPopup();
    popupTitle.text("Escolha o formato de arquivo:");

    const selectedOnly = createPopupButton('label', 'Selecionados apenas', '', 'selected-only');
    const input = $("<input type='checkbox'></input>")
    selectedOnly.append(input);

    const jsonBtn = createPopupButton('a', 'JSON', () => { exportTable('JSON') });
    const csvBtn = createPopupButton('a', 'CSV', () => { exportTable('CSV') });
    jsonBtn.attr('download', 'tabela.json');
    csvBtn.attr('download', 'tabela.csv');

    popupButtons.append(selectedOnly);
    popupButtons.append(jsonBtn);
    popupButtons.append(csvBtn);

    enablePopup();

}

function createImportPopup(text) {
    resetPopup();
    popupTitle.text("Deseja adicionar ou substituir os dados atuais?");

    const adicionar = createPopupButton('button', 'Adicionar', () => { importTable(text, false) });
    const substituir = createPopupButton('button', 'Substituir', () => { importTable(text, true) });

    popupButtons.append(adicionar);
    popupButtons.append(substituir);
    enablePopup();
}