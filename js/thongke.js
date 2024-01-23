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
var menu = document.querySelector(".main-menu")
menu.children[0].addEventListener("click", function () {
    window.location.href = `admin.html`
})

menu.children[1].addEventListener("click", function () {
    document.querySelector(".chart").style.display = "none";
    document.querySelector(".management").style.display = "block";
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
    localStorage.setItem("namDoanhSo", 0);
})
menu.children[2].addEventListener("click", function () {
    document.querySelector(".chart").style.display = "block";
    document.querySelector(".management").style.display = "none";
    gear.classList.remove("appear");
    gear.style.transform = "rotate(0deg)";
    menu.style.visibility = "hidden"
    menu.style.top = "-61px"
    localStorage.setItem("namDoanhSo", 0);
})


function getBill() {

    var arrBill;
    var year = JSON.parse(localStorage.getItem("namDoanhSo"));

    arrBill = JSON.parse(localStorage.getItem("bill"))
    var total = 0;
    var month = new Array(13)
    for (var i = 1; i <= 12; i++) {
        month[i] = 0;
    }

    for (var i = 0; i < arrBill.length; i++) {
        var tmp = arrBill[i].date;
        var date = tmp.split("-")
        if (parseInt(date[2]) == year) {
            if (arrBill[i].status === "Đã xử lý") {
                console.log(parseInt(date[2]) == parseInt(year))
                month[parseInt(date[1])] += arrBill[i].price
                total += arrBill[i].price
            }
        }
    }
    var table = document.querySelector(".management").children[0]
    table.children[1].innerHTML = ``;
    for (var i = 1; i <= 12; i++) {
        var tr = document.createElement('tr')
        tr.innerHTML = `
            <td>Tháng ${i}</td>
            <td>${month[i].toLocaleString("de-DE")}đ</td>
        `
        table.children[1].appendChild(tr);
    }
    var tr = document.createElement("tr")
    tr.innerHTML = `
        <td style="font-size: 20px; font-weight: 700   ;" colspan="2">Tổng tiền: 
        <span>${total.toLocaleString("de-DE")}đ</span>
        </td>
    `

    table.children[2].innerHTML = ``
    table.children[2].appendChild(tr)
    localStorage.setItem("doanhso", JSON.stringify(month))
    localStorage.setItem("tongdoanhso", JSON.stringify(total))
}

function innerChart() {
    var month = JSON.parse(localStorage.getItem("doanhso"))
    var chart = document.querySelector(".chart");   
    chart.children[0].innerHTML = ``
    var total = JSON.parse(localStorage.getItem("tongdoanhso"))
    if (total == 0) {
        total = 1;
    }
    for (var i = 1; i <= 12; i++) {
        var div = document.createElement("div")
        div.classList.add("thang")
        var percent = (month[i] * 100) / total
        div.style.height = `${percent}%`
        chart.children[0].appendChild(div)

    }
    localStorage.setItem("namDoanhSo", 0);
}

document.querySelector(".option").children[0].addEventListener("change", function (e) {
    localStorage.setItem("namDoanhSo", e.target.value);
    getBill();
    innerChart()
})

document.querySelector(".header").querySelector (".log-out").addEventListener ("click",function () {
    window.location.href = "index.html"
})