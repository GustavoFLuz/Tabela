document.querySelector('#toggle-register-form').addEventListener('click', e =>{
    const cadastro = document.querySelector('#register');
    cadastro.classList.toggle('form-on');
    cadastro.classList.toggle('form-off');
    clearError();
})