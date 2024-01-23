


function addToCart (productId){
    if (localStorage.getItem("cart")==null || JSON.parse (localStorage.getItem ("cart")).length==0)
    {
        var cartArray =new Array
        var arrayProduct = JSON.parse (localStorage.getItem ("arrayProduct"));
        // console.log (arrayProduct)
        for (var i=0;i<arrayProduct.length;i++)
        {
            if (productId==arrayProduct[i].productId)
            {
                var img=arrayProduct[i].img;
                var name =arrayProduct[i].name;
                var price =arrayProduct[i].price;
                var cart ={
                    id:productId,
                    img: img,
                    name:name,
                    price:price,
                    count: 1
                }
                cartArray.push (cart);
                localStorage.setItem("cart",JSON.stringify (cartArray));
                break;
            }
        }
    }
    else {
        var cartArray =JSON.parse (localStorage.getItem ("cart"));
        var arrayProduct = JSON.parse (localStorage.getItem ("arrayProduct"));
        for (var i=0;i<arrayProduct.length;i++)
        {
            if (productId==arrayProduct[i].productId)
            {
                var img=arrayProduct[i].img;
                var name =arrayProduct[i].name;
                var price =arrayProduct[i].price;
                var cart ={
                    id:productId,
                    img: img,
                    name:name,
                    price:price,
                    count: 1
            }

            // /////////////////////////////////////////////////////////////////////////////////////////////
            for(let j=0;j<cartArray.length;j++)
                {
                    if(cartArray[j].id==productId)
                    {
                        //alert(1)
                        cartArray[j].count+=1
                        cartArray[j].price=(cartArray[j].price/(cartArray[j].count-1))*cartArray[j].count
                        localStorage.setItem("cart",JSON.stringify (cartArray));
                        
                        closeProductInfo ();
                        showCart ();
                        return
                    }
                    // ///////////////////////////////////////////////////////////////////////////////////////////
                }
                cartArray.push (cart);
                console.log (cartArray);
                localStorage.setItem("cart",JSON.stringify (cartArray));
                break;
            }
        } 
    }
    closeProductInfo ();
    showCart ();
}

function showCart ()
{
    var cartShow = document.querySelector (".header__top-shop-wrapper");
    var count = cartShow.querySelector (".header__top-shop-notice");
    if (localStorage.getItem ("cart") == null || JSON.parse (localStorage.getItem("cart")).length == 0)
    {
        cartShow.classList.add ("shop__list-no_cart");
    }
    else
    {   
        cartShow.classList.remove ("shop__list-no_cart");
        var show = cartShow.querySelector (".shop__list").querySelector ("ul");
        var cartArray = JSON.parse (localStorage.getItem ("cart"));
        show.innerHTML = ``;
        for (var i = 0;i<cartArray.length;i++)
        {
            if(i==3)
            break
            var li = document.createElement ("li");
            li.innerHTML = `
            <div class="product-cart">
                <div class="img">
                    <img src="${cartArray[i].img}" alt="">
                </div>
                <div class="name">
                    <h4>${cartArray[i].name}</h4>
                </div>
                <div class="price">
                    <h4><span>${cartArray[i].price.toLocaleString("de-DE")}</span>đ</h4>
                </div>
            </div>
            `;
            show.appendChild (li);
        }
        var button = document.createElement ("button");
        button.innerHTML = `Đến giỏ hàng`
        show.appendChild (button);
        count.innerText = `${cartArray.length}`
    }
}

// function checkItemCart(name)
// {
//     for(let i=0;i<)
// }