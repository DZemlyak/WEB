/* window.onload = function load() {
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
*/

$(document).ready(function() {
    $("#menu.pager li").mouseover(function() {
        $(this).addClass('hover');   
    });    
    
    $("#menu.pager li").mouseout(function() {
        $(this).removeClass('hover');   
    });
    
    $("#menu.pager li").click(function() {
        $(this.parentElement.children).each(function() {
            $(this).removeClass('active');   
        });
        $(this).addClass('active');
    });
});







