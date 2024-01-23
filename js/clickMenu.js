var mainMenu = document.querySelector(".main-menu")
var brands = mainMenu.querySelectorAll(".item")
var logo = document.querySelector (".header__top-logo")
brands.forEach(brand => {
    brand.addEventListener("click", function (e) {
        window.location.href="index.html"
        //window.location.reload()
        var check = JSON.parse(localStorage.getItem("checkShow"))
        check = false;
        localStorage.setItem("checkShow", JSON.stringify(check))
        var tmp = brand.innerText.split(' ')
        localStorage.setItem ("brand",JSON.stringify (tmp[1]))
        var listProduct = document.querySelector(".content");
        listProduct.style.display = "block"
        if (tmp[1]=== "HP") {
            addProduct(arrayHp, 0, 12)
            dividePage(arrayHp)
        }
        else if (tmp[1] === "ASUS") {
            addProduct(arrayAsus, 0, 12)
            dividePage(arrayAsus)
        }
        else if (tmp[1] === "LENOVO") {
            addProduct(arrayLenovo, 0, 12)
            dividePage(arrayLenovo)
        }
        else if (tmp[1] === "MSI") {
            addProduct(arrayMSI, 0, 12)
            dividePage(arrayMSI)
        }


    })
});
function checkShow() {
    var container = document.querySelectorAll(".container")
    var check = JSON.parse(localStorage.getItem("checkShow"))
    var listProduct = document.querySelector(".content");
    if (check == true) {
        container[1].style.display = "block";
        container[7].style.display = "block";
        listProduct.style.display ="none";
    }
    else {
        container[1].style.display = "none";
        container[7].style.display = "none";
        listProduct.style.display ="block";
    }

}
logo.addEventListener ("click",function (){
    window.location.href="index.html"
    var check = JSON.parse(localStorage.getItem("checkShow"))
    check =true;
    localStorage.setItem ("checkShow",JSON.stringify (check))

})
// var check =true 
// localStorage.setItem ("checkShow",JSON.stringify (check))   

document.querySelector(".header__top-shop-wrapper").addEventListener("click",function()
{
    window.location.href="cart.html"
})
document.querySelector(".header__top-shop-wrapper:hover .shop__list .show-product-cart button").addEventListener("click",function()
{
    //alert(1)
    window.location.href="cart.html"
})