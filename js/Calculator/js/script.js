function getFirstArgument() {
    var tb = document.getElementById("textbox");
    if (tb.value.indexOf('+') == -1
       && tb.value.indexOf('-', 1) == -1
       && tb.value.indexOf('*') == -1
       && tb.value.indexOf('/') == -1)
        return tb.value;
    return tb.value.slice(0, tb.value.indexOf(' '));
} 

function getSecondArgument() {
    var tb = document.getElementById("textbox");
    if (tb.value.indexOf(' + ') == -1
       && tb.value.indexOf(' - ', 1) == -1
       && tb.value.indexOf('*') == -1
       && tb.value.indexOf('/') == -1)
        return null;
    return tb.value.slice(tb.value.lastIndexOf(' ') + 1);
} 

function getOperation() {
    var tb = document.getElementById("textbox");
    if (tb.value.indexOf('+') != -1)
        return tb.value.charAt(tb.value.indexOf('+'));
    if (tb.value.indexOf('*') != -1)
        return tb.value.charAt(tb.value.indexOf('*'));
    if (tb.value.indexOf('/') != -1)
        return tb.value.charAt(tb.value.indexOf('/'));
    if (tb.value.indexOf('-', 1) != -1)
        return tb.value.charAt(tb.value.indexOf('-', 1));
    return null;
}

function fillTextbox(x, y, op) {
    var tb = document.getElementById("textbox");
    x = x.toString();
    if (y != null) {
        y = y.toString();
        tb.value = x + ' ' + op + ' ' + y;
    }
    else
        tb.value = x;
}

function backspace() {
    var x = getFirstArgument();
    var y = getSecondArgument();
    if (y == null) {
        if(x == '0')
            return;
        else if (x.length == 1)
            x = '0';
        else
            x = x.slice(0, x.length - 1);
        fillTextbox(x);
        return;
    }
    if (y == '0')
        return;
    else if (y.length == 1)
        y = '0';
    else
        y = y.slice(0, y.length - 1);
    fillTextbox(x, y, getOperation());
}

function clearLast() {
    var y = getSecondArgument();
    if (y == null) {
        var x = '0';
        fillTextbox(x);
        return;
    }
    var x = getFirstArgument();
    y = '0';
    fillTextbox(x, y, getOperation());
}

function clearAll() {
    var tb = document.getElementById("textbox");
    tb.value = '0';
}


function writeDigit(el) {
    var x = getFirstArgument();
    var y = getSecondArgument();
    if (y == null) {
        if (x.length >= 8) return;
        if (x == '0')
            x = el.innerHTML || el;
        else if (x == '-0')
            x = x + '.' + el.innerHTML || el;
        else
            x += el.innerHTML || el;
        fillTextbox(x);
        return;
    }
    if (y.length >= 8) return;
    if (y == '0')
        y = el.innerHTML || el;
    else if (y == '-0')
        y = y + '.' + el.innerHTML || el;
    else
        y += el.innerHTML || el;
    fillTextbox(x, y, getOperation());
}

function wrtiteDot(el) {
    var x = getFirstArgument();
    var y = getSecondArgument();
    if (y == null) {
        if (x.length >= 8 || x.indexOf('.') != -1) return;
        if (x == '0' || x == '-0')
            x = x + (el.innerHTML || el);
        else
            x += el.innerHTML || el;
        fillTextbox(x);
        return;
    }
    if (y.length >= 8 || y.indexOf('.') != -1) return;
    if (y == '0' || y == '-0')
            y = y + (el.innerHTML || el);
    else
        y += el.innerHTML || el;
    fillTextbox(x, y, getOperation());
}

function doOperation(el) {
    var hstr = document.getElementById('opHistory');
    var x = getFirstArgument();
    var y = getSecondArgument();
    var op = el.innerHTML || el;
    if (y == null) {  
        y = '0';
        fillTextbox(x, y, op);
        hstr.value += x + ' ' + op + ' ';
        return;
    }
    if (y != '0') {
        hstr.value += y + ' ';
        x = calculate();
        y = '0';
    }   
    hstr.value += op + ' ';
    fillTextbox(x.toString(), y, op);
    return;
}


function calculate(el) {
    var x = parseFloat(getFirstArgument());
    var y = parseFloat(getSecondArgument());
    if (typeof el != 'undefined') {        
        if (el.innerHTML == '%') {
            if (isNaN(y)) {
                fillTextbox(0); 
                return;
            }
            fillTextbox(x, x * y / 100, getOperation());
            return;    
        }
        if ((el.innerHTML == '1/x')) {
            if (isNaN(y)) {
                fillTextbox(1 / x);
                return;
            }
            fillTextbox(x, 1 / y, getOperation());
            return;
        }
        if ((el.innerHTML == '√')) {
            if (isNaN(y)) {
               fillTextbox(Math.sqrt(x));
                return;
            }
            fillTextbox(x, Math.sqrt(y), getOperation());
            return;
        }
        if (el) {
            if (isNaN(y)) return;
            var hstr = document.getElementById('opHistory');
            var hs = document.getElementById('allHistory');
            var rec = document.getElementById('recordsNum');
            if (rec.value == 10) {
                rec.value = '9';
                hs.innerHTML = hs.innerHTML.slice(hs.innerHTML.indexOf('\n') + 1);
            }
            hstr.value += y;
            hs.innerHTML += hstr.value + '\n';
            hstr.value = '';
            rec.value = parseInt(rec.value) + 1;
        }
    }
    var op = getOperation();
    var res = null;
    switch(op) {
        case '+': 
            res = x + y;
            break;
        case '-': 
            res = x - y;
            break;
        case '*': 
            res = x * y;
            break;
        case '/': 
            if (y == 0) return;
            res = x / y;
            break;
    }
    if (res.toString().length > 8)
        res = res.toExponential(8);
    fillTextbox(res);
    return res;
}

function invert() {
    var x = getFirstArgument();
    var y = getSecondArgument();
    if (y == null) {
        if (x[0] == '-'){
            fillTextbox(x.slice(1));   
        }
        else
            fillTextbox('-' + x);
    }
    else if (y[0] == '-') {
        fillTextbox(x, y.slice(1), getOperation());   
    }
    else
        fillTextbox(x, '-' + y, getOperation());
}

document.onkeypress = function(e){
    var tb = document.getElementById("textbox");
    var chr = getChar(e);
    if (chr == null) return;
    if (chr == '13' || chr == '='){
        calculate(true);
        return;
    }    
    if (chr > '0' && chr < '9') {
        writeDigit(chr);
        return;
    }
    if (chr == '+' || chr == '-'
        || chr == '/' || chr == '*') {
        doOperation(chr);
        return;
    }
    if (chr == '.')
        wrtiteDot(chr);
}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }
    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) {
            if (event.which == 13) // enter
                return '13';
            return null;
        }   
        return String.fromCharCode(event.which)
    }
}

window.onload = function() {
    var hs = document.getElementById('allHistory');
    hs.innerHTML = '\n\n\n\n\n\n\n\n\n\n';
}















