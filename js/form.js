var resign_p
var eyes = document.querySelectorAll(".fa-solid.fa-eye");
// console.log(eyes);
eyes.forEach(eye => {
    eye.addEventListener("click", function (e) {
        var parent = this.parentElement;
        var icon = parent.querySelector("i");
        var input = parent.querySelector("input");
        parent.classList.toggle("appear");
        if (parent.classList.contains("appear")) {
            input.setAttribute("type", "text");
            icon.setAttribute("class", "fa-solid fa-eye-slash");
        }
        else {
            input.setAttribute("type", "password");
            icon.setAttribute("class", "fa-solid fa-eye");
        }
    })
});
function loginToggle() {
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("active")
    var formLogin = document.querySelector(".form-login");
    formLogin.classList.toggle("active");
}
function resignToggle() {
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("active")
    var formResign = document.querySelector(".form-register");
    formResign.classList.toggle("active");
}

function logout() {
    localStorage.removeItem("userLogin")
    var topAction = document.querySelector(".header__top-action")
    topAction.innerHTML = ``
    window.location.href = "index.html"

    topAction.innerHTML = `<button class="btn" id="btn-login" onclick="loginToggle()">Đăng nhập</button>
    <button class="btn" id="btn-register" onclick="resignToggle()">Đăng kí</button>`
}

