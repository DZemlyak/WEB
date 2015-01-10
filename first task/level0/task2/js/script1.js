window.onload = function load() {
    var menu = document.getElementById("menu");
    for(i = 0; i < menu.children.length; i++){
        menu.children[i].setAttribute('onclick' , 'activate(this)');
        menu.children[i].setAttribute('onmouseover' , 'onover(this)');
        menu.children[i].setAttribute('onmouseout' , 'onout(this)');
        
    }
}

function activate(el){
    var menu = document.getElementById("menu");
    for(i = 0; i < menu.children.length; i++){
        menu.children[i].className = "";
    }
    el.className = "active";
}

function onover(el) {
    el.className += " hover";
}
function onout(el) {
    el.className = el.className.replace('hover', '');
}