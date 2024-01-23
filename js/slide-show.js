var list = document.querySelector('.list-img');
var item = document.querySelectorAll('.img-item');
var dot = document.querySelectorAll('.dots li');
var prev = document.getElementsByClassName('prev');
var next = document.getElementsByClassName('next');
var active = 0;
// console.log (next)
var length = item.length;
let auto = setInterval (clickNext,3000);

function updateImg() {
    var checkLeft = item[active].offsetLeft;
    list.style.left = -checkLeft + 'px'
    var dotActive = document.querySelector('.dots li.active');
    dotActive.classList.remove('active');
    dot[active].classList.add('active');
    clearInterval (auto);
    auto=setInterval (clickNext,3000);
}
function clickPrev ()
{
    if (active > 0) 
        { 
            active--; 
        }
        else 
        {
            active = length - 1; 
        }
        updateImg()
} 
function clickNext ()
{
    if (active < length - 1) {
        active++;
    }
    else {
        active = 0;
    }
    updateImg();
    // console.log (list.children[active].children[0].href);
    // console.log (item[active].children [0].href);
    
}

prev[0].addEventListener('click', function () {
    clickPrev ();
   
})
next[0].addEventListener ('click', function () {
    clickNext ();
})
dot.forEach((li,key) => { 
    li.addEventListener ('click',function (){
        active=key;
        updateImg ();     
    });
});

