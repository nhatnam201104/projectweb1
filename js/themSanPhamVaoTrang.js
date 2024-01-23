var products = document.querySelector(".products");
var brand = JSON.parse(localStorage.getItem("brand"));
var arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"))
var signal =JSON.parse(localStorage.getItem("signal"))
var arrayHp = new Array;
var arrayMSI = new Array;
var arrayAsus = new Array;
var arrayLenovo = new Array;
var currentListImg = 0;
var searching = []
var searchprice=[]
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

productFilter()

function addProduct(arrayProduct, start, end) {
    if (arrayProduct.length == 0) {
        console.log(1)
        products.classList.add ("none")
        products.innerHTML = `
        <div style="height: 300px; width: 100%; display:flex ;  justify-content: center; align-items: center;">
        <h1 style ="font-size: 25px;font-weight:bold">Không có sản phẩm để hiển thị</h1>
        </div>
        `
        return;
    }
    products.classList.remove ("none");
    products.innerHTML = ``;
    // products.innerHTML = 
    for (var i = start; i < end; i++) {
        if (i == arrayProduct.length) {
            break;
        }
        var li = document.createElement("li")
        li.innerHTML = `
        <div class="product-item">
            <div class="product-top">
                <img src="${arrayProduct[i].img}" class="product-show" onclick="showProductInfo (${arrayProduct[i].productId})">
                </div>
                <div class="product-info">
                <h3 class="product-name" onclick="showProductInfo (${arrayProduct[i].productId})">${arrayProduct[i].name}</h3>
                <h3 class="product-price"><span>${arrayProduct[i].price.toLocaleString("de-DE")}</span>Đ</h3>
                </div>
        </div>
        `
        products.appendChild(li);
    }
}




function addProductOfbrand() {
    if (brand === "HP") {
        addProduct(arrayHp, 0, 12)
        dividePage(arrayHp)
    }
    else if (brand === "ASUS") {
        addProduct(arrayAsus, 0, 12)
        dividePage(arrayAsus)
    }
    else if (brand === "LENOVO") {
        addProduct(arrayLenovo, 0, 12)
        dividePage(arrayLenovo)
    }
    else if (brand === "MSI") {
        addProduct(arrayMSI, 0, 12)
        dividePage(arrayMSI)
    }
    //////////////////////////////////////////////////////////
    else if (brand==="search") {
        ////////////////////////////////////////////
        //alert(1)
        search();
        addProduct(searching, 0, 12)
        dividePage(searching)
    }
    ////////////////////////////////////////////////////
    // else if(signal==="searchPrice")
    // {
    //     alert(1)
    //     searchPrice()
    //     addProduct(searchprice,0,12)
    //     dividePage(searchprice)
    // }
    if(signal==="searchPrice")
    {
        document.querySelector(".divide-page").innerHTML=""
        searchPrice()
        addProduct(searchprice, 0, 12)
        dividePage(searchprice)
        localStorage.removeItem("signal")
    }
}

function searchPrice () {
    var minPrice = JSON.parse (localStorage.getItem ("minPrice"))
    var maxPrice = JSON.parse (localStorage.getItem ("maxPrice"))
    var allProduct=[]
    if(brand==="HP")
    {
        allProduct=arrayHp
    }
    else if(brand==="MSI")
    {
        allProduct=arrayMSI
    }
    else if(brand==="LENOVO")
    {
        allProduct=arrayLenovo
    }
    else if(brand==="ASUS")
    {
        allProduct=arrayAsus
    }
    else if(brand==="search")
    {
        allProduct=searching
    }
    searchprice = allProduct.filter (function (val)
    {
        if(val.price>=minPrice&&val.price<=maxPrice)
        return val;
    })
}

function dividePage(arrayProduct) {
    var showPage = document.querySelector(".divide-page");
    var page = Math.ceil(arrayProduct.length / 12);
    for (var i = 1; i <= page; i++) {
        var button = document.createElement("button")
        button.innerHTML = `${i}`;
        showPage.appendChild(button)
    }
    var buttons = showPage.querySelectorAll("button")
    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            var currentPage = parseInt(button.innerText);
            var end = currentPage * 12;
            var start = end - 12;
            products.innerHTML = ``;
            addProduct(arrayProduct, start, end)
            window.scrollTo (0,0)  
        })
    });
}

function showProductInfo(productId) {
    var show = document.querySelector(".showProduct");
    Object.assign(show.style, {
        // display: "block",
        visibility: "visible",
        top: "0"
    })
    for (var i = 0; i < arrayProduct.length; i++) {
        if (productId == arrayProduct[i].productId) {
            // chèn tên
            show.children[0].children[0].children[0].innerText = arrayProduct[i].name;

            // chèn sao và đánh giá
            show.children[0].children[1].innerHTML = ``;
            for (var j = 1; j <= arrayProduct[i].rate; j++) {
                var star = document.createElement("i");
                star.setAttribute("class", "fa-solid fa-star");
                show.children[0].children[1].appendChild(star);
            }

            for (var j = arrayProduct[i].rate + 1; j <= 5; j++) {
                var star = document.createElement("i");
                star.setAttribute("class", "fa-regular fa-star");
                show.children[0].children[1].appendChild(star);
            }
            var danhGia = document.createElement("h4");
            danhGia.innerHTML = `<span>${arrayProduct[i].reviews} </span>đánh giá`;
            show.children[0].children[1].appendChild(danhGia);

            // chèn hình ảnh

            show.children[1].children[0].children[0].children[0].children[0].children[0].src = arrayProduct[i].img;
            show.children[1].children[0].children[0].children[0].children[0].children[1].src = arrayProduct[i].picture1;
            show.children[1].children[0].children[0].children[0].children[0].children[2].src = arrayProduct[i].picture2;
            show.children[1].children[0].children[0].children[0].children[0].children[3].src = arrayProduct[i].picture3;
           

            // chèn thông số kĩ thuật
            show.children[1].children[0].children[1].children[0].children[1].innerText = arrayProduct[i].vga;
            show.children[1].children[0].children[1].children[1].children[1].innerText = arrayProduct[i].cpu;
            show.children[1].children[0].children[1].children[2].children[1].innerText = arrayProduct[i].ram;
            show.children[1].children[0].children[1].children[3].children[1].innerText = arrayProduct[i].rom;

            // chèn giá
            show.children[1].children[1].children[0].children[0].innerHTML = `${arrayProduct[i].price.toLocaleString("de-DE")}`

            // chèn mô tả
            show.children[1].children[1].children[2].children[1].innerText = arrayProduct[i].content;

            show.children[1].children[1].children[3].innerHTML = `
            <button class="add-cart" onclick="addToCart(${arrayProduct[i].productId})"><span>Thêm vào giỏ hàng</span></button>
            <button class="buy-now" onclick="buyNow(${arrayProduct[i].productId})"><span>Mua ngay</span></button>
            `
            break;
        }
    }
}
function closeProductInfo() {
    var show = document.querySelector(".showProduct");
    Object.assign(show.style, {
        visibility: "hidden",
        top: "-100%"
    })
    currentListImg = 0;
    var showImg = document.querySelector(".show-img").children[0].style.transform = `translateX(0px)`
}

function moveLeft() {
    var showImg = document.querySelector(".show-img").children[0];
    if (currentListImg == 0) {
        currentListImg = showImg.querySelectorAll("img").length - 1;
        var width = showImg.querySelector("img").offsetWidth;
        Object.assign(showImg.style, {
            transform: `translateX(-${width * currentListImg}px)`
        })
    }
    else {
        currentListImg--;
        var width = showImg.querySelector("img").offsetWidth;
        Object.assign(showImg.style, {
            transform: `translateX(-${width * currentListImg}px)`
        })
    }
    console.log(currentListImg)
}

function moveRight() {
    var showImg = document.querySelector(".show-img").children[0];
    if (currentListImg == showImg.querySelectorAll("img").length - 1) {
        currentListImg = 0;
        var width = showImg.querySelector("img").offsetWidth;
        Object.assign(showImg.style, {
            transform: `translateX(-${width * currentListImg}px)`
        })
    }
    else {
        currentListImg++;
        var width = showImg.querySelector("img").offsetWidth;
        Object.assign(showImg.style, {
            transform: `translateX(-${width * currentListImg}px)`
        })
    }
    console.log(currentListImg)
}

function buyNow (productId)
{
    for (var i = 0;i<arrayProduct.length;i++)
    {
        if (productId == arrayProduct[i].productId)
        {
            var cart = {
                id: productId,
                img: arrayProduct[i].img,
                name: arrayProduct[i].name,
                price: arrayProduct[i].price,
                count: 1
            }

            if (localStorage.getItem ("cart") == null || JSON.parse (localStorage.getItem ("cart")).length == 0)
            {
                var arrayCart = new Array;
                arrayCart.push (cart);
                localStorage.setItem ("cart",JSON.stringify (arrayCart))
            }
            else
            {
                var arrayCart = JSON.parse (localStorage.getItem ("cart"));
                /////////////////////////////////////////////////////////////////////////////
                for(let j=0;j<arrayCart.length;j++)
                {
                    if(arrayCart[j].id==productId)
                    {
                        arrayCart[j].count+=1
                        arrayCart[j].price=(arrayCart[j].price/(arrayCart[j].count-1))*arrayCart[j].count
                        localStorage.setItem("cart",JSON.stringify (arrayCart));
                        window.location.href = "cart.html";
                        return
                    }
                    /////////////////////////////////////////////////////////////////////////////////////////
                }
                arrayCart.push (cart);
                localStorage.setItem ("cart",JSON.stringify (arrayCart))
            }
            break;
        }
    }
    window.location.href = "cart.html";
}


