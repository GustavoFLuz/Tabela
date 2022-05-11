window.addEventListener('load',addExtraInfoEvent);

function addExtraInfoEvent() {
    document.querySelectorAll('.extra-info').forEach(div => div.addEventListener(('mouseover'), () => {
        div.querySelector('div').style.display = 'block';
    }))

    document.querySelectorAll('.extra-info').forEach(div => div.addEventListener(('mouseout'), () => {
        div.querySelector('div').style.display = 'none';
    }))
}