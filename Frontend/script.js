const login_btn = document.querySelector('.login-btn');

login_btn.addEventListener('click', e=>{
    console.log('clicked');
})

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}