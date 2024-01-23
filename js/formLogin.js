var login = document.querySelector(".login");
var emailLogin = login.querySelector("#email-login");
var passwordLogin = login.querySelector("#password-login");
login.addEventListener("submit", function (e) {
    e.preventDefault();
    if (emailLogin.value == "" || passwordLogin.value == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
    else {
        var userArray = JSON.parse(localStorage.getItem("user"));
        if (emailLogin.value === userArray[0].email) {
            if (passwordLogin.value === userArray[0].password) {
                alert ("Đăng nhập thành công")
                window.location.href = "admin.html";
            }
            else {
                alert("Vui lòng kiểm tra lại tên đăng nhập và mật khẩu")
            }
        }
        else {
            var check = false;
            for (var i = 1; i < userArray.length; i++) {
                if (emailLogin.value === userArray[i].email) {
                    if (passwordLogin.value === userArray[i].password) {
                        localStorage.setItem("userLogin", JSON.stringify(userArray[i]))
                        check = true;
                    }
                }

            }
            if (!check) {
                alert("Vui lòng kiểm tra lại tên đăng nhập và mật khẩu")

            }
            else {
                alert("Đăng nhập thành công")
                loginToggle()
                emailLogin.value = ``
                passwordLogin.value = ``
                window.location.reload ();
            }
        }
    }
})

function checkLogin() {
    if (localStorage.getItem("userLogin") != null)
      {
        innerLogin()
      }
}
function innerLogin() {
    var topAction = document.querySelector(".header__top-action")
    topAction.innerHTML = ``
    var userLogin = JSON.parse(localStorage.getItem("userLogin"));
    topAction.innerHTML = ` <h4 style="margin-right:15px"><i class="fa-solid fa-user" style="font-size:25px;margin-right:10px;margin-bottom:10px;"></i><span style="font-size:20px;">${userLogin.username}</span></h4>
    <button class="btn" id="btn-register" onclick="logout()">Đăng xuất</button>`
    

}

