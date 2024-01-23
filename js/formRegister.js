var formRegister = document.querySelector(".register");
var username = formRegister.querySelector("#username");
var email = formRegister.querySelector("#email-register");
var password = formRegister.querySelector("#password-register");
var rePassword = formRegister.querySelector("#re-password");
// console.log (username);
// console.log (email);
// console.log (password);
// console.log (rePassword);

function error(input, message) {
    var parent = input.parentElement;
    parent.classList.add("error");
    var mess = parent.querySelector(".mess");
    mess.innerHTML = message;
}

function correct(input) {
    var parent = input.parentElement;
    parent.classList.remove("error");
    var mess = parent.querySelector(".mess");
    mess.innerHTML = "";
    // input.style.border = "1px solid rgb(46, 204, 113)"
}

function checkEmpty(listInput) {
    var check = true;
    listInput.forEach(input => {
        if (input.value == "") {
            check = false;
            error(input, "Vui lòng điền vào ô này!");
        }
    });
    return check;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `Vui lòng điền ít nhất ${min} kí tự!`)
        return false;
    }
    else if (input.value.length > max) {
        error(input, `Vui lòng điền nhiều nhất là ${max} kí tự!`)
        return false;
    }
    return true;
}

function checkUsername(input) {
    for (var i = 0; i < input.value.length; i++) {
        var a = input.value.charCodeAt(i);
        if (a > 32 && a < 65 || a > 89 && a < 97 || a > 121 && a < 192) {
            error(input, "Tên không chứa kí tự đặt biệt!");
            return false;
        }
    }
    return true;
}

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        error(email, `
        Email không hợp lệ!
        `)
        email.focus;
        return false;
    }
    return true;
}

function checkMatchPassword(password, rePassword) {
    var check = true;
    if (password.value.length != rePassword.value.length) {
        error(rePassword, "Mật khẩu không trùng nhau!");
        check = false;
    }
    else {
        for (var i = 0; i < password.value.length; i++) {
            if (password.value[i] != rePassword.value[i]) {
                error(rePassword, "Mật khẩu không trùng nhau!");
                check = false;
            }
        }
    }
    return check;
}

formRegister.addEventListener("submit", function (e) {
    e.preventDefault();

    correct(username)
    correct(email)
    correct(password)
    correct(rePassword)

    var ktraRong = checkEmpty([username, email, password, rePassword]);
    var ktraUsername = false;
    var ktraPassword = false;
    var ktraEmail = false;
    if (ktraRong == true) {
        ktraUsername = checkLength(username, 2, 50);
        ktraPassword = checkLength(password, 8, 30);
        ktraEmail = checkEmail(email);

        if (ktraUsername == true) {
            ktraUsername = checkUsername(username);
        }
        if (ktraPassword == true) {
            ktraPassword = checkMatchPassword(password, rePassword);
        }
    }

    if (ktraRong == true && ktraUsername == true && ktraEmail == true && ktraPassword == true) {
        if (localStorage.getItem("user") == null) {
            var userArray = new Array;
            var user = {
                username: username.value,
                email: email.value,
                password: password.value
            }
            userArray.push(user)
            localStorage.setItem("user", JSON.stringify(userArray))
        }
        else {
            var userArray = JSON.parse(localStorage.getItem("user"))
            var check = true;
            for (var i = 0; i < userArray.length; i++) {
                if (email.value === userArray[i].email || username.value === userArray[i].username)
                    check = false;
            }
            if (!check) {
                alert("Email hoặc tên đăng nhập đã tồn tại")
            }
            else {
                var curday=new Date()
                var date=curday.getDate()+"-"+(curday.getMonth()+1)+"-"+curday.getFullYear()
                var id=createIdKh()
                while(true)
                {
                    var check=true
                    for(let i=0;i<userArray.length;i++)
                    {
                        if(id===userArray[i].id)
                        {
                            id=createIdKh()
                            check=false
                        }
                    }
                    if(check==true)
                    break;
                }
                var user = {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    date:date,
                    id:id
                }
                userArray.push (user);
                localStorage.setItem ("user",JSON.stringify (userArray));
                alert ("Đăng kí thành công")
                resignToggle ();
                email.value =``;
                username.value =``;
                password.value = ``;
                rePassword.value =``;
                loginToggle ();
            }
        }
    }
})

function createAdmin() {
    if (localStorage.getItem("user") == null) {
        var userArray = new Array;
        var curday=new Date()
        var date=curday.getDate()+"-"+(curday.getMonth()+1)+"-"+curday.getFullYear()
        var admin = {
            username: "admin",
            password: "admin",
            email: "admin@gmail.com",
            date:date,
            id:"#666666"
        }
        userArray.push(admin)
        localStorage.setItem("user", JSON.stringify(userArray));
    }
}

function createIdKh()
{
    var tmp=parseInt(Math.random()*1000000)
    var tmp2=tmp
    var x=0
    while(tmp2>0)
    {
        x++
        tmp2=parseInt(tmp2/10)
    }
    var id="#"
    for(let i=1;i<=6-x;i++)
    {
        id+="0";
    }
    id+=tmp
    return id
}
createAdmin();
