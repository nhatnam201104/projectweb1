var valInput =document.querySelector ("#search")
valInput.addEventListener ("submit", function (e) {
    e.preventDefault ()
    var value = valInput.querySelector ("input").value;
    value = value.trim ();
    if (value != "")
    {
        /////////////////////////////////////
        localStorage.setItem ("brand",JSON.stringify ("search"));
        //////////////////////////////////////////////
        localStorage.setItem ("searchvalue",JSON.stringify (value));
        search ();
        valInput.querySelector ("input").value = ""
        window.location.reload();
        var checkShow = JSON.parse (localStorage.getItem ("checkShow"));
        checkShow = false;
        localStorage.setItem ("checkShow", JSON.stringify (checkShow))
    }
    window.location.href="index.html"
})

function search() {
    var searchValue = JSON.parse(localStorage.getItem("searchvalue"))
    var allProduct = JSON.parse(localStorage.getItem("arrayProduct"))
    if (searchValue != 0) {
        var search = searchValue.toLowerCase()
        var wordSearch = search.split(" ")
        var cnt = 0
        searching = allProduct.filter(function (val) {
            var Sname = val.name.toLowerCase()
            cnt = 0
            for (let i = 0; i < wordSearch.length; i++) {
                if (Sname.includes(wordSearch[i])) {
                    cnt++
                }
            }
            if (cnt == wordSearch.length) {
                return val
            }
        })

    }
}

var boLoc = document.querySelector (".sort").querySelector ("form");
//console.log (boLoc);
boLoc.addEventListener ("submit", function (e) {
    e.preventDefault ();
    var from = boLoc.querySelector ("#from");
    var to = boLoc.querySelector ("#to");
    if (from.value == "" || to.value == "") {
        from.value = "";
        to.value = "";
    }
    else {
        if (from.value != parseInt (from.value) || to.value != parseInt (to.value))
        {
            alert ("Vui lòng nhập vào số!");
        }
        else {
            localStorage.setItem ("minPrice",JSON.stringify (parseInt (from.value)));
            localStorage.setItem ("maxPrice",JSON.stringify (parseInt (to.value)));
            ////////////////////////////////////////////
            localStorage.setItem ("signal",JSON.stringify ("searchPrice"));
            ///////////////////////////////////////////
            window.location.reload();
        }
    }
})
