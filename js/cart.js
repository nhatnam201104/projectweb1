var itemCart=JSON.parse(localStorage.getItem("cart"))
console.log(localStorage.getItem("cart"))
function displayCart()
{
    document.querySelector(".icon-cart").style.color="rgb(176, 57, 57)"
    document.querySelector(".icon-process").style.color="white"
    document.querySelector(".footer-table-cart").style.display="block"
    document.querySelector(".table-cart ").style.display="block"
    document.querySelector(".bill-process").style.display="none"
    checkEmtyCart()
}
function displayBill()
{
    document.querySelector(".icon-process").style.color="rgb(176, 57, 57)"
    document.querySelector(".icon-cart").style.color="white"
    document.querySelector(".bill-process").style.display="block"
    document.querySelector(".footer-table-cart").style.display="none"
    document.querySelector(".table-cart ").style.display="none"
    document.querySelector(".emty-cart").style.display="none"
}

//checkEmtyCart()
document.querySelector(".icon-cart").addEventListener("click",function(e)
{
    window.location.reload ()
    displayCart()

    
})
document.querySelector(".icon-process").addEventListener("click",function(e)
{
    if (localStorage.getItem ("userLogin") == null)
    {
        alert ("Cần đăng nhập để tra cứu thông tin đơn hàng!");
        return;
    }
    displayBill()
    showItemBill()
})

function showItemCart()
{
    var tableCart=document.querySelector(".contener-cart table")
    console.log(tableCart)
    for(let i=0;i<itemCart.length;i++)
    {
        var addtr=document.createElement("tr")
        tableCart.append(addtr)
        var tt=`
        <tr>
                            <td>
                                <div class="firsttd-cart">
                                    <img src="${itemCart[i].img}">
                                </div>
                            </td>
                            <td class="td2">
                                <span class="name-cart">${itemCart[i].name}</span>
                            </td>
                            <td class="td3">
                                <div class="lasttd-cart">
                                    <p><span class="price-cart">${itemCart[i].price.toLocaleString("de-DE")}</span><sub>đ</sub></p>
                                      <div class="sl-cart">
                                    <button type ="button" onclick="reduceSL(this,${itemCart[i].id})">-</button>
                                    <input type="text" value="${itemCart[i].count}" min="1" readonly>
                                    <button type ="button" onclick="increaseSL(this,${itemCart[i].id})">+</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="delete-cart">Xóa</div>
                            </td>
        </tr>`
        addtr.innerHTML=tt
    }
    cartTotal()
    deleteCart()
}
function checkEmtyCart()
{
    if(localStorage.getItem("cart")==null)
    {
        document.querySelector(".emty-cart").style.display="block"
        console.log(1)
    }
    else
    {
        if (JSON.parse(localStorage.getItem("cart")).length==0)
        {
            document.querySelector(".emty-cart").style.display="block"
            console.log(1)
        }
        else
            showItemCart()
    }
}

function reduceSL(x,id)
{
    var parent =x.parentElement
    //console.log(parent)
    var value=parent.children[1]
    var giam=value.value
    var total=parent.parentElement.children[0].children[0].innerText
    var price=total.split(".").join("")
    price=price/giam
    giam--
    if(giam==0)
    {
    parent=parent.parentElement.parentElement.parentElement
    var nameitem=parent.children[1].innerText
    removeItem(nameitem)
    parent.remove()
    localStorage.setItem("cart",JSON.stringify(itemCart))
    cartTotal()
    return
    }
    else
    {
        var priceTotalIndex=parent.parentElement.children[0].children[0]
    var priceTotal=price*giam
    priceTotal=priceTotal.toLocaleString("de-DE")
    priceTotalIndex.innerText=priceTotal
    value.value=giam
    }
    cartTotal();
    for(let i=0;i<itemCart.length;i++)
    {
        if(itemCart[i].id==id)
        {
            var priceStart=itemCart[i].price/(giam+1)
            itemCart[i].count=giam
            itemCart[i].price=priceStart*giam     
            localStorage.setItem("cart",JSON.stringify(itemCart))
            break
        }
    }
  
}

function increaseSL(x,id)
{
    var parent =x.parentElement
    var value=parent.children[1]
    var tang =value.value
    var total=parent.parentElement.children[0].children[0].innerText
    var price=total.split(".").join("")
    price=price/tang
    tang++
    var priceTotalIndex=parent.parentElement.children[0].children[0]
    var priceTotal=price*tang
    priceTotal=priceTotal.toLocaleString("de-DE")
    priceTotalIndex.innerText=priceTotal
    value.value=tang
    cartTotal();
    for(let i=0;i<itemCart.length;i++)
    {
        if(itemCart[i].id==id)
        {
            var priceStart=itemCart[i].price/(tang-1)
            itemCart[i].count=tang
            itemCart[i].price=priceStart*tang 
            localStorage.setItem("cart",JSON.stringify(itemCart))
            break
        }
    }
    console.log(itemCart)
}

function deleteCart()
{
    var cartDelete=document.querySelectorAll(".contener-cart table tr .delete-cart")
    //console.log(cartDelete)
    for(let j=0;j<cartDelete.length;j++)
        {
        cartDelete[j].addEventListener("click",function(event)
            {
                var item =event.target
                var parent=item.parentElement.parentElement
                var nameItem=parent.children[1].innerText
                removeItem(nameItem)
                localStorage.setItem("cart",JSON.stringify(itemCart))
                parent.remove()
                cartTotal()
                if (JSON.parse (localStorage.getItem ("cart")).length == 0 || localStorage.getItem ("cart") == null)
                {
                    checkEmtyCart ();
                    console.log (1);
                }
            })
        }
}

function removeItem(name)
{
    itemCart=itemCart.filter(function(val)
    {
        if(val.name!=name)
        return val
    })
}

  function cartTotal()
{
    var priceItem=document.querySelectorAll(".price-cart")
    var totalPrice=0
    var price
    var vnd
    for(let i=0;i<priceItem.length;i++)
    {
        price=priceItem[i].innerText
        vnd=price.split(".").join("")
        vnd=parseInt(vnd)
        //console.log(vnd)
        totalPrice=totalPrice+vnd
    }
    totalPrice=totalPrice.toLocaleString("de-DE")
    document.querySelector(".total-cart").innerText=totalPrice
}

document.querySelector(".close-oder").addEventListener("click",function()
{
    if (localStorage.getItem ("userLogin") == null)
    {
        alert ("Bạn cần đăng nhập để mua hàng!");
        return;
    }
    var curday=new Date()

    var date=curday.getDate()+"-"+(curday.getMonth()+1) +"-"+curday.getFullYear()
    var price=document.querySelector(".right-footer-table-cart .total-cart").innerText
    var vnd=price.split(".").join("")
    price=parseInt(vnd)
    var name=""
    for(let i=0;i<itemCart.length;i++)
    {
        if (i == itemCart.length-1)
        {
            name+=itemCart[i].count+" x " +itemCart[i].name
            break;
        }
        name+=itemCart[i].count+" x " +itemCart[i].name+"; "
    }
    var status = "Chưa xử lý";
    var id=createIdBill()
    while(true)
    {
        var check = true
        if (localStorage.getItem ("bill") == null)
        {
            break;
        }
        var arrayBill = JSON.parse (localStorage.getItem ("bill"));
        for (let i=0;i<arrayBill.length;i++)
        {
            if(id===arrayBill[i].id)
            {
                id=createIdBill()
                check=false
            }
        }
        if(check==true)
        break;
    }
    var email=JSON.parse(localStorage.getItem("userLogin")).email
    var Bill = {
        name: name,
        price: price,
        date: date,
        status: status,
        email:email,
        id:id
    }
    localStorage.removeItem ("cart");
    if (localStorage.getItem ("bill") == null || JSON.parse (localStorage.getItem ("bill")).length == 0) {
        var arrayBill = new Array;
        arrayBill.push (Bill);
        localStorage.setItem ("bill",JSON.stringify (arrayBill));
        localStorage.removeItem ("cart")
    }
    else {
        var arrayBill = JSON.parse (localStorage.getItem ("bill"));
        arrayBill.push (Bill);
        localStorage.setItem ("bill",JSON.stringify (arrayBill));
        localStorage.removeItem ("cart")    
    }
    displayBill()
    showItemBill()
})

function showItemBill()
{
    var indexBill=document.querySelector(".bill-process")
    if (localStorage.getItem ("userLogin") == null)
     {
        indexBill.innerHTML = ``;
        document.querySelector(".emty-cart").style.display="block"
        document.querySelector(".emty-cart").innerText="Không có đơn hàng nào!"
        return;
     }
    var itemBill=JSON.parse(localStorage.getItem ("bill"))
    if(itemBill==null)
    {
        document.querySelector(".emty-cart").style.display="block"
        document.querySelector(".emty-cart").innerText="Không có đơn hàng nào!"
        return
    }
    var allBill=""
    var user=JSON.parse(localStorage.getItem("userLogin"))
    var check = false;
    for(let i=itemBill.length-1;i>=0;i--)
    {
        if(user.email===itemBill[i].email)
        {
            check = true;
            var allItem=itemBill[i].name
        var allprice=itemBill[i].price
        var date=itemBill[i].date
        var status =itemBill[i].status
        var id=itemBill[i].id
        allBill+=
        `
        <div class="bill-item">
                            <div>
                                ${id}
                            </div>
                            <div >
                                ${allItem}
                            </div>
                            <div >
                                ${allprice.toLocaleString ("de-DE")}đ
                            </div>
                            <div >
                                ${date} 
                            </div>
                            <div >
                                ${status}
                            </div>
                        </div>
        `
        }
        
    }
    indexBill.innerHTML=allBill
    if (check == false)
    {
        document.querySelector(".emty-cart").style.display="block"
        document.querySelector(".emty-cart").innerText="Không có đơn hàng nào!"
    }
}
function createIdBill()
{
    var tmp=parseInt(Math.random()*1000000)
    var tmp2=tmp
    var x=0
    while(tmp2>0)
    {
        x++
        tmp2=parseInt(tmp2/10)
    }
    var id="&"
    for(let i=1;i<=6-x;i++)
    {
        id+="0";
    }
    id+=tmp
    return id
}


