
// Toggle da parte do Cadastro
function initializeFormToggle() {
    $('#toggle-register-form').click(() => {
        $('#register').toggleClass('form-on');
        clearInvalidationErrors();
    })
};

function initializeForm() {
    initializeFormToggle();
    formSubmit.click(function(e){
        e.preventDefault();
        if (validForm()) {
            createUser();
            form[0].reset();
            showRows(1);
        }   
    })
};

// Validação do formulário
function validForm() {
    const email = form.find('input[name="formEmail"]').val();
    const fullName = form.find('input[name="formName"]').val();
    const errors = [];
    const errorList = $("#message-error");
    clearInvalidationErrors();

    if (fullName == '')
        errors.push(createErrorMessage("Nome vazio"));
    if (email == '') {
        errors.push(createErrorMessage("Email vazio"));
    } else if (!validEmail(email)) {
        errors.push(createErrorMessage("Email inválido"));
    }

    errors.forEach((error) => {
        errorList.append(error);
    })
    if (errors.length > 0)
        return false;
    else return true;
}

function createErrorMessage(text) {
    return $(`<li>${text}</li>`).addClass('error-message');
}
function validEmail(email) {
    return RegExp(".+@.+\.com").test(email);
}
function clearInvalidationErrors() {
    $("#message-error").html('');
}

// Registrar usuário
function createUser() {
    const fullName = form.find('input[name="formName"]').val().split(" ");
    const user = new User(maxId+=1,
        getFirstName(fullName),
        getLastName(fullName),
        form.find('input[name="formEmail"]').val());
    addUser(user);
}

function getFirstName(name) {
    return name[0];
}

function getLastName(name) {
    name.shift();
    let lastName = '';
    for (n in name)
        lastName += name[n] + ' ';
    return lastName.trim();
}
