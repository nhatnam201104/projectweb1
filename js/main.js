var resign_p = JSON.parse(localStorage.getItem("check"))
var arrayProduct = JSON.parse (localStorage.getItem ("arrayProduct"))
var arrayHp = new Array;
var arrayMSI = new Array;
var arrayAsus = new Array;
var arrayLenovo = new Array;
var currentListImg = 0;

function productFilter() {
    var i = 0;
    while (i < arrayProduct.length) {
        if ("hp" === arrayProduct[i].brand) {
            arrayHp.push(arrayProduct[i])
        }
        else if ("msi" === arrayProduct[i].brand) {
            arrayMSI.push(arrayProduct[i])
        }
        else if ("asus" === arrayProduct[i].brand) {
            arrayAsus.push(arrayProduct[i])
        }
        else if ("lenovo" === arrayProduct[i].brand) {
            arrayLenovo.push(arrayProduct[i])
        }
        i++;
    }
}

productFilter(arrayProduct)

var href = document.querySelectorAll("a");
console.log ()
function add(img, name, price, productId, position) {
    var productItem = document.createElement("div")
    var Item = document.createElement("div");
    var Price = document.createElement("div");
    var productIcon = document.createElement("div");
    var Name = document.createElement("div")
    productItem.className = "product-item";
    Item.className = "item";
    Price.className = "price";
    Name.className = "name-product";
    productIcon.className = "product-icon";
    Item.innerHTML = `
    <div class="img">
    <img src="${img}" alt="" onclick =" showProductInfo(${productId}) ">
    </div >
    `
    Price.innerHTML = `
    <h4 ><span>${price.toLocaleString("de-DE")}</span> đ</h4>
    `
    Name.innerHTML = `
    <span onclick="showProductInfo(${productId})">${name}</span>
    `
    productItem.append(Item)
    productItem.appendChild(Name);
    productItem.appendChild(Price)
    productItem.appendChild(productIcon)
    var slider = document.querySelectorAll(".slider-product");
    slider[position].appendChild(productItem)
}

function WriteProduct(productArray, position) {

    for (var i = 0; i < productArray.length; i++) {
        var image =productArray[i].img;
        var price =productArray[i].price;
        var productId = productArray[i].productId;
        var name = productArray[i].name;
        add(image, name, price, productId, position)
    }
}
var navIcon =document.querySelector (".respoint ")
var listMenu =document.querySelector (".menu-holder .main-menu")

    navIcon.addEventListener ("click",function ()
    {
       
        listMenu.classList.toggle ("active")
    })


WriteProduct(arrayAsus, 0)
WriteProduct(arrayMSI, 1)
WriteProduct(arrayLenovo, 2)
WriteProduct(arrayHp, 3)

