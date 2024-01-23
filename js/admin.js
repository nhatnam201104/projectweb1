// tạo bánh răng menu
var gear = document.querySelector(".icon-menu")
gear.addEventListener("click", function () {
    var menu = document.querySelector(".main-menu")
    this.classList.toggle("appear");
    if (this.classList.contains("appear")) {
        this.style.transform = "rotate(360deg)";
        menu.style.visibility = "visible"
        menu.style.top = "98px"
    }
    else {
        this.style.transform = "rotate(0deg)";
        menu.style.visibility = "hidden"
        menu.style.top = "-61px"
    }
})


var logOut = document.querySelector(".log-out");
var menu = document.querySelector(".main-menu");
var notificationApprove = document.querySelector(".notification-approve");
var cancelNotificationApprove = notificationApprove.querySelector(".cancel");
var approve = notificationApprove.querySelector(".status");
var notificationRemove = document.querySelector(".notification-remove");
var cancelNotificationRemove = notificationRemove.children[0].children[1].children[0];
var acceptNotificationRemove = notificationRemove.children[0].children[1].children[1];
var cancelAddProduct = document.querySelector(".management").children[1].children[0].children[1]
var idDonHang;
var idKhachHang;
var idSanPham;
var idSanPhamSua;
var repair = document.querySelector(".repair")
var removeRepair = repair.querySelector(".remove")



// tạo sự kiện thay đổi bảng sản phẩm
menu.children[0].addEventListener("click", function () {
    loadSanPham();
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
})

// tạo sự kiện thay đổi bảng khách hàng
menu.children[1].addEventListener("click", function () {
    loadKhachHang();
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
})

// tạo sự kiện thay đổi bảng hóa đơn
menu.children[2].addEventListener("click", function () {
    loadDonHang();
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
})
console.log (menu.children[3])
menu.children[3].addEventListener ("click",function (){
    window.location.href ='thongke.html'

})

// tạo sự kiện trượt form thêm sản phẩm
menu.children[0].children[1].children[0].addEventListener("click", function () {
    var table = document.querySelector(".management");
    table.children[1].style.visibility = "visible"
    table.children[1].style.top = "0"
})
menu.children[0].children[1].children[1].addEventListener("click", function (e) {
    e.stopPropagation()
    loadSanPhamSua();
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
    // alert(1);
})

// tạo sự kiện đóng form thêm sản phẩm
cancelAddProduct.addEventListener("click", function () {
    var table = document.querySelector(".management");
    table.children[1].style.visibility = "hidden"
    table.children[1].style.top = "-100%"
})
// tao su kien dong form sua 
removeRepair.addEventListener("click", function () {
    Object.assign(repair.style, {
        visibility: "hidden",
        top: "-200%"
    })
})

// tạo sự kiện đăng xuất
logOut.addEventListener("click", function () {
    window.location.href = "index.html"
    var checkShow = JSON.parse(localStorage.getItem("checkShow"));
    checkShow = true;
    localStorage.setItem("checkShow", JSON.stringify(checkShow))
})

// di chuyển xuống của bảng thông báo
function moveUnderNotification(notification) {
    Object.assign(notification.style, {
        visibility: "visible",
        top: "0"
    })
}

// di chuyển lên của bảng thông báo
function moveTopNotification(notification) {
    Object.assign(notification.style, {
        visibility: "hidden",
        top: "-100%"
    })
}

// tạo sự kiện đóng bảng thông báo
cancelNotificationApprove.addEventListener("click", function () {
    moveTopNotification(notificationApprove)
    loadDonHang();
})

cancelNotificationRemove.addEventListener("click", function () {
    moveTopNotification(notificationRemove)
    idKhachHang = ""
    idSanPham = ""
    console.log(idKhachHang)
    console.log(idSanPham)
})

// tạo sự kiện xóa khách hàng
acceptNotificationRemove.addEventListener("click", function () {
    xoaKhachHang(idKhachHang);
    xoaSanPham(idSanPham);
    idKhachHang = ""
    idSanPham = ""
    window.location.reload();
})

// viết hàm chèn các hóa đơn vào bảng
function chenDonHang(table, array, start, end) {
    for (var i = start; i < end; i++) {
        if (i == array.length) {
            break;
        }
        var id = array[i].id;
        var tr = document.createElement("tr");
        var button = document.createElement("button");
        if (array[i].status === "Chưa xử lý") {
            button.innerHTML = "Duyệt đơn";
            button.classList.remove("green")
        }
        else {
            button.innerHTML = "Đã duyệt";
            button.classList.add("green");

        }

        // button.onclick = function () {
        //     moveUnderNotification ();
        //     thongTinDonHang (id);
        // }

        tr.innerHTML = `
        <td>${array[i].id}</td>
        <td>${array[i].name}</td>
        <td>${array[i].email}</td>
        <td><span>${array[i].price.toLocaleString("de-DE")}</span>Đ</td>
        <td>${array[i].date}</td>
        `
        var td = document.createElement("td");
        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    var buttons = table.querySelectorAll("button");
    buttons.forEach(btn => {
        var id = btn.parentElement.parentElement.children[0].innerText;
        btn.onclick = function () {
            moveUnderNotification(notificationApprove);
            thongTinDonHang(id);
        }
    });
}
// viết hàm chèn thông tin đơn hàng vào bảng thông báo
function thongTinDonHang(id) {
    var info = notificationApprove.children[0];
    var array = JSON.parse(localStorage.getItem("bill"));
    idDonHang = id;
    console.log(info)
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            info.children[1].children[1].innerText = id;
            info.children[3].children[1].innerText = array[i].email;
            info.children[2].children[1].innerText = array[i].name;
            info.children[4].children[1].children[0].innerText = `${array[i].price.toLocaleString("de-DE")}`;
            info.children[5].children[1].innerText = array[i].date;
            if (array[i].status === "Đã xử lý")
                info.children[7].innerHTML = `
            Trạng thái: 
            <button class="status agree">
                <div class="circle"></div>
            </button>
            `
            else {

                info.children[7].innerHTML = `
                Trạng thái: 
                <button class="status">
                    <div class="circle"></div>
                </button>
                `
            }

            var button = info.querySelector(".status");

            button.addEventListener("click", function () {
                this.classList.toggle("agree")
                if (this.classList.contains("agree")) {
                    // this.style.backgroundColor = "rgba(0, 184, 148,1.0)"
                    // this.children[0].style.left = "50%"
                    var bills = JSON.parse(localStorage.getItem("bill"));
                    for (var i = 0; i < bills.length; i++) {
                        if (bills[i].id === idDonHang) {
                            bills[i].status = "Đã xử lý";
                            break;
                        }
                    }
                    localStorage.setItem("bill", JSON.stringify(bills));
                }
                else {
                    // this.style.backgroundColor = "rgba(99, 110, 114,1.0)"
                    // this.children[0].style.left = "0%"
                    var bills = JSON.parse(localStorage.getItem("bill"));
                    for (var i = 0; i < bills.length; i++) {
                        if (bills[i].id === idDonHang) {
                            bills[i].status = "Chưa xử lý";
                            break;
                        }
                    }
                    localStorage.setItem("bill", JSON.stringify(bills));
                }
            })
            break;
        }
    }
}

// viết hàm load các đơn hàng ra bảng
function loadDonHang() {
    var tableDonHang = document.querySelector(".management");
    tableDonHang.children[0].children[0].innerHTML = `
    <tr>
        <th colspan="6">Danh sách đơn hàng</th>
    </tr>
    <tr>
        <th>Mã hóa đơn</th>
        <th>Đơn hàng</th>
        <th>Người đặt hàng</th>
        <th>Giá</th>
        <th>Ngày đặt hàng</th>
        <th>Xử lý</th>
    </tr>
    `
    var bills = JSON.parse(localStorage.getItem("bill"));
    var infoDonHang = tableDonHang.querySelector("tbody");
    infoDonHang.innerHTML = ``;
    var pageDonHang = tableDonHang.querySelector("tfoot");

    if (localStorage.getItem("bill") == null) {
        pageDonHang.innerHTML = ``;
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <td colspan="6" style="font-size: 20px;text-transform: uppercase;">Hiện không có đơn hàng nào</td>
        `
        infoDonHang.appendChild(tr)
        return;
    }
    pageDonHang.innerHTML = `
    <tr>
        <td colspan="6" class="page">
            
        </td>
    </tr>
    `
    chenDonHang(infoDonHang, bills, 0, 10);
    var page = Math.ceil(bills.length / 10);
    for (var i = 1; i <= page; i++) {
        var button = document.createElement("button");
        button.innerHTML = `${i}`;
        pageDonHang.children[0].children[0].appendChild(button);
    }

    pageDonHang.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function () {
            var pageCurrent = parseInt(btn.innerText);
            infoDonHang.innerHTML = ``;
            chenDonHang(infoDonHang, bills, (pageCurrent - 1) * 10, pageCurrent * 10);
        })
    });
}

// viết hàm chèn khách hàng ra bảng khách hàng
function chenKhachHang(table, array, start, end) {
    for (var i = start; i < end; i++) {
        if (i == array.length) {
            break;
        }
        var id = array[i].id
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var button = document.createElement("button");
        // button.onclick = function () {
        //     moveUnderNotification (notificationRemove)
        //     idKhachHang = id;
        //     acceptNotificationRemove.parentElement.parentElement.children[0].children[0].innerText = `Bạn có chắc muốn xóa đi khách hàng này?`;
        //     console.log (idKhachHang)
        //     console.log (idSanPham)
        // }
        button.innerHTML = `xóa`
        tr.innerHTML = `
        <td>${array[i].id}</td>
        <td>${array[i].email}</td>
        <td>${array[i].username}</td>
        <td>${array[i].password}</td>
        <td>${array[i].date}</td>
        `
        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr)
    }

    table.querySelectorAll("button").forEach(btn => {
        btn.onclick = function () {
            moveUnderNotification(notificationRemove)
            idKhachHang = btn.parentElement.parentElement.children[0].innerText;
            acceptNotificationRemove.parentElement.parentElement.children[0].children[0].innerText = `Bạn có chắc muốn xóa đi khách hàng này?`;
            console.log(idKhachHang)
            console.log(idSanPham)
        }
    });
}

// xóa khách hàng
function xoaKhachHang(id) {
    var users = JSON.parse(localStorage.getItem("user"))
    for (var i = 1; i < users.length; i++) {
        if (id === users[i].id) {
            users.splice(i, 1);
            localStorage.setItem("user", JSON.stringify(users));
            break;
        }
    }
}

// hàm load ra các thông tin khách hàng vào bảng
function loadKhachHang() {
    var tableKhachHang = document.querySelector(".management");
    tableKhachHang.children[0].children[0].innerHTML = `
    <tr>
        <th colspan="6">Danh sách khách hàng</th>
    </tr>
    <tr>
        <th>Mã khách hàng</th>
        <th>email</th>
        <th>Tên khách hàng</th>
        <th>mật khẩu</th>
        <th>Ngày đăng kí</th>
        <th>chức năng</th>
    </tr>
    `
    var infoKhachHang = tableKhachHang.querySelector("tbody");
    infoKhachHang.innerHTML = ``;
    var users = JSON.parse(localStorage.getItem("user"));
    var pageKhachHang = tableKhachHang.querySelector("tfoot");

    if (users.length == 1) {
        pageKhachHang.innerHTML = ``
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <td colspan="6" style="font-size: 20px;text-transform: uppercase;">Hiện không có khách hàng nào đăng kí</td>
        `
        infoKhachHang.appendChild(tr)
        return;
    }
    pageKhachHang.innerHTML = `
    <tr>
        <td colspan="6" class="page">
            
        </td>
    </tr>
    `
    chenKhachHang(infoKhachHang, users, 1, 10)
    var page = Math.ceil(users.length / 10);
    for (var i = 1; i <= page; i++) {
        var button = document.createElement("button");
        button.innerHTML = `${i}`;
        pageKhachHang.children[0].children[0].appendChild(button);
    }

    pageKhachHang.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function () {
            var pageCurrent = parseInt(btn.innerText);
            infoKhachHang.innerHTML = ``;
            if (page == 1) {
                chenKhachHang(infoKhachHang, users, 1, 10);
            }
            else
                chenKhachHang(infoKhachHang, users, (pageCurrent - 1) * 10, pageCurrent * 10);
            window.scrollTo({ top: "0", behavior: "smooth" })
        })
    });
}

// viết hàm chèn sản phẩm ra bảng sản phẩm
function chenSanPham(table, array, start, end) {
    for (var i = start; i < end; i++) {
        if (i == array.length)
            break;
        var id = array[i].productId;
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var button = document.createElement("button");
        button.innerHTML = `xóa`
        tr.innerHTML = `
        <td>${array[i].productId}</td>
        <td>
            <img src="${array[i].img}">
        </td>
        <td>${array[i].name}</td>
        <td>${array[i].brand}</td>
        <td>${array[i].price.toLocaleString("de-DE")}đ</td>
        `
        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr)
    }

    table.querySelectorAll("button").forEach(btn => {
        btn.onclick = function () {
            moveUnderNotification(notificationRemove)
            idSanPham = btn.parentElement.parentElement.children[0].innerText;
            acceptNotificationRemove.parentElement.parentElement.children[0].children[0].innerText = `Bạn có chắc muốn xóa đi sản phẩm này?`;
        }
    });
}

// viết hàm xóa sản phẩm
function xoaSanPham(id) {
    var products = JSON.parse(localStorage.getItem("arrayProduct"));
    for (var i = 0; i < products.length; i++) {
        if (id == products[i].productId) {
            products.splice(i, 1);
            localStorage.setItem("arrayProduct", JSON.stringify(products))
            break;
        }
    }
}

// hàm load ra các thông tin của sản phẩm vào bảng
function loadSanPham() {
    var tableSanPham = document.querySelector(".management")
    tableSanPham.children[0].children[0].innerHTML = `
    <tr>
        <th colspan="6">Danh sách sản phẩm</th>
    </tr>
    <tr>
        <th>Mã sản phẩm</th>
        <th>hình ảnh</th>
        <th>Tên sản phẩm</th>
        <th>hãng</th>
        <th>giá</th>
        <th>chức năng</th>
    </tr>
    `
    var products = JSON.parse(localStorage.getItem("arrayProduct"))
    var infoSanPham = tableSanPham.children[0].children[1];
    infoSanPham.innerHTML = ``;
    var pageSanPham = tableSanPham.children[0].children[2];
    if (products.length == 0) {
        pageSanPham.innerHTML = ``;
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <td colspan="6" style="font-size: 20px;text-transform: uppercase;">Hiện không có sản phẩm nào</td>
        `
        infoSanPham.appendChild(tr)
        return;
    }
    pageSanPham.innerHTML = `
    <tr>
        <td colspan="6" class="page">
            
        </td>
    </tr>
    `
    chenSanPham(infoSanPham, products, 0, 10);
    var page = Math.ceil(products.length / 10);
    for (var i = 1; i <= page; i++) {
        var button = document.createElement("button")
        button.innerHTML = `${i}`;
        pageSanPham.children[0].children[0].appendChild(button)
    }
    pageSanPham.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function () {
            var pageCurrent = parseInt(btn.innerText);
            infoSanPham.innerHTML = ``;
            if (page == 1) {
                chenSanPham(infoSanPham, products, 1, 10);
            }
            else
                chenSanPham(infoSanPham, products, (pageCurrent - 1) * 10, pageCurrent * 10);
            window.scrollTo({ top: "0", behavior: "smooth" })
        })
    });
}

function chenSanPhamSua(table, array, start, end) {
    for (var i = start; i < end; i++) {
        if (i == array.length)
            break;
        var id = array[i].productId;
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var button = document.createElement("button");
        button.innerHTML = `sửa`
        tr.innerHTML = `
        <td>${array[i].productId}</td>
        <td>
            <img src="${array[i].img}">
        </td>
        <td>${array[i].name}</td>
        <td>${array[i].brand}</td>
        <td>${array[i].price.toLocaleString("de-DE")}đ</td>
        `
        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr)
    }

    table.querySelectorAll("button").forEach(btn => {
        btn.onclick = function () {
            idSanPhamSua = this.parentElement.parentElement.children[0].innerText
            console.log(idSanPhamSua)
            repair.style.visibility = "visible"
            repair.style.top = "0"
            repairSanPham()
        }
    });
}

function repairSanPham() {
    var btnsua = document.querySelector(".repair").children[0].children[2].children[0]
    var arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    var hinhNew = document.querySelector("#hinhnew")
    var anhRepair = document.querySelector("#anh-repair")
    for (var i = 0; i < arrayProduct.length; i++) {
        if (idSanPhamSua == arrayProduct[i].productId) {
            var img = arrayProduct[i].img;
            var ten = arrayProduct[i].name;
            var price = arrayProduct[i].price;
            var inputname = document.querySelector("#name-repair")
            var inputgia = document.querySelector("#gia-repair")
            var hinhcu = document.querySelector("#hinhcu")
            inputname.value = ten;
            inputgia.value = price;
            hinhcu.src = img;
            break;

        }
    }
    anhRepair.addEventListener("change", function () {
        hinhNew.src = URL.createObjectURL(anhRepair.files[0])
         reader =new FileReader ();
         reader.addEventListener ("load",function (e){
            img=reader.result
         })
         reader.readAsDataURL (anhRepair.files[0])
    })
    btnsua.addEventListener("submit", function (e) {
        e.preventDefault();
        var checkrong = checkEmpty([inputname ,inputgia])
        var checkgia = checkPrice(inputgia)
        if (checkgia == true && checkrong == true) {
            arrayProduct[i].name = inputname.value;
            arrayProduct[i].price =  parseInt(inputgia.value);
            arrayProduct[i].img = img
            alert ("Sửa thành công")
            Object.assign(repair.style, {
                visibility: "hidden",
                top: "-200%"
            })

        }
        localStorage.setItem ("arrayProduct" ,JSON.stringify (arrayProduct))
        loadSanPhamSua ()
    })
}
function loadSanPhamSua() {
    var tableSanPham = document.querySelector(".management")
    tableSanPham.children[0].children[0].innerHTML = `
    <tr>
        <th colspan="6">Danh sách sản phẩm</th>
    </tr>
    <tr>
        <th>Mã sản phẩm</th>
        <th>hình ảnh</th>
        <th>Tên sản phẩm</th>
        <th>hãng</th>
        <th>giá</th>
        <th>chức năng</th>
    </tr>
    `
    var products = JSON.parse(localStorage.getItem("arrayProduct"))
    var infoSanPham = tableSanPham.children[0].children[1];
    infoSanPham.innerHTML = ``;
    var pageSanPham = tableSanPham.children[0].children[2];
    if (products.length == 0) {
        pageSanPham.innerHTML = ``;
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <td colspan="6" style="font-size: 20px;text-transform: uppercase;">Hiện không có sản phẩm nào</td>
        `
        infoSanPham.appendChild(tr)
        return;
    }
    pageSanPham.innerHTML = `
    <tr>
        <td colspan="6" class="page">
            
        </td>
    </tr>
    `
    chenSanPhamSua(infoSanPham, products, 0, 10);
    var page = Math.ceil(products.length / 10);
    for (var i = 1; i <= page; i++) {
        var button = document.createElement("button")
        button.innerHTML = `${i}`;
        pageSanPham.children[0].children[0].appendChild(button)
    }
    pageSanPham.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function () {
            var pageCurrent = parseInt(btn.innerText);
            infoSanPham.innerHTML = ``;
            if (page == 1) {
                chenSanPhamSua(infoSanPham, products, 1, 10);
            }
            else
                chenSanPhamSua(infoSanPham, products, (pageCurrent - 1) * 10, pageCurrent * 10);
            window.scrollTo({ top: "0", behavior: "smooth" })
        })
    });
}

// them san pham
var addProductNew = document.querySelector(".management").children[1].children[1].children[0]

addProductNew.addEventListener("submit", function (e) {
    e.preventDefault();
    var hangProduct = document.getElementById("brand-product")
    var idProduct = document.getElementById("id-product")
    var tenProduct = document.getElementById("name-product")
    var giaProduct = document.getElementById("price-product")
    var noiDungProduct = document.getElementById("content-product")
    var ram = document.getElementById("ram")
    var rom = document.getElementById("rom")
    var cpu = document.getElementById("cpu")
    var vga = document.getElementById("vga")
    var imgFile = document.getElementById("file-img");
    imgFile.addEventListener("change", function () {
        var lsimg = new Array;
        function readAndSave(index) {
            var reader = new FileReader()
            reader.addEventListener('load', function () {
                lsimg.push(reader.result);
                if (index < imgFile.files.length - 1) {
                    readAndSave(index + 1)
                }
                else {

                    localStorage.setItem("listImgChange", JSON.stringify(lsimg))
                }
            })
            reader.readAsDataURL(imgFile.files[index])
        }

        readAndSave(0);
    })

    var hang = 0;
    if (hangProduct.value == 1) {
        hang = "MSI";
    }
    else if (hangProduct.value == 2) {
        hang = "LENOVO"
    }
    else if (hangProduct.value == 3) {
        hang = "HP"
    }
    else if (hangProduct.value == 4) {
        hang = "ASUS"
    }

    var ktraRong = checkEmpty([idProduct, tenProduct, giaProduct, noiDungProduct, ram, rom, cpu, vga, imgFile]);
    var ktraId = checkId(idProduct)
    var ktraGia = checkPrice(giaProduct)
    var ktraFile = checkFile(imgFile)

    if (ktraRong == true && ktraGia == true && ktraId == true && ktraFile == true) {
        var price = parseInt(giaProduct.value)
        hang = hang.toLowerCase();
        addProduct(hang, idProduct.value, tenProduct.value, price, noiDungProduct.value, ram.value, rom.value, cpu.value, vga.value);
        alert("Thêm sản phẩm thành công")
        var table = document.querySelector(".management");
        table.children[1].style.visibility = "hidden"
        table.children[1].style.top = "-100%"
        loadSanPham();
    }
})

function inputError(input) {
    var parent = input.parentElement;
    parent.classList.add("error")
}

function inputCorrect(input) {
    var parent = input.parentElement;
    parent.classList.remove("error")
}

function checkEmpty(listInput) {
    var check = true;
    listInput.forEach(input => {
        if (input.value.trim() == "") {
            inputError(input)
            check = false;
        }
        else
            inputCorrect(input)
    });
    return check;
}

function checkId(id) {
    var array = JSON.parse(localStorage.getItem("arrayProduct"))
    for (var i = 0; i < array.length; i++) {
        if (id.value === array[i].productId) {
            inputError(id);
            return false;
        }
    }
    inputCorrect(id);
    return true;
}

function checkPrice(price) {
    if (isNaN(Number(price.value)) == false) {
        inputCorrect(price);
        return true;
    }
    else {
        inputError(price)
        return false;
    }
}

function checkFile(files) {
    if (files.files.length != 4) {
        inputError(files);
        return false;
    }
    else {
        inputCorrect(files)
        return true;
    }
}

function addProduct(brand, id, ten, gia, noiDung, ram, rom, cpu, vga) {

    var listImg = JSON.parse(localStorage.getItem("listImgChange"));
    var array = JSON.parse(localStorage.getItem("arrayProduct"))
    var rate = parseInt(Math.random() * 5)
    var reviews = parseInt(Math.random() * 100)

    var product = {
        productId: id,
        brand: brand,
        name: ten,
        price: gia,
        content: noiDung,
        img: listImg[0],
        picture1: listImg[1],
        picture2: listImg[2],
        picture3: listImg[3],
        ram: ram,
        rom: rom,
        cpu: cpu,
        vga: vga,
        rate: rate,
        reviews: reviews
    }
    array.push(product)
    localStorage.setItem("arrayProduct", JSON.stringify(array));
}

