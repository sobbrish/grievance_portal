const login_btn = document.querySelector('.login-btn');

login_btn.addEventListener('click', e=>{
    console.log('clicked');
})

//blur background when modal pops up
function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}


//clear username and password form on reload
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input[type='text'], input[type='password']")
    .forEach(input => {
        input.value = "";
    });
});

