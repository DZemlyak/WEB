var selectedCards = [0, 0];
var pause = false;
var gameResult = 0;
var startTime;
var gameField;


$(document).ready(function() {
    $("#startButton").click(function() {
        window.gameField = $("#game-field")[0];        
        var fieldSize = $("#game-field-size")[0].value;
        var values = createFieldValues(fieldSize);
        removeAllCards();
        createCards(values);
        window.gameResult = fieldSize / 2;
        window.startTime = new Date();
        if ($("#end-text").attr("hidden") != "hidden")
            $("#end-text").attr("hidden", "hidden")
    });   
});

function removeAllCards() {
    $(window.gameField.children).each(function() {
       $(this).remove();
    });
}

function generateValue(min, max){
    var rand = min - 0.5 + Math.random()*(max-min+1)
    return Math.round(rand);
}

function createFieldValues(fieldSize){
    var min = 1;
    var max;
    if (fieldSize == '4') {
        max = 9;
    }
    else if (fieldSize == '8') {
        max = 20;
    }
    else if (fieldSize == '16') {
        max = 50;
    }
    else {
        max = 99;
    }
    var values = new Array(fieldSize / 2);    
    for( i = 0; i < fieldSize / 2; i++) {
        var rand = generateValue(min, max);
        if (values.indexOf(rand) != -1) {
            i--;
            continue;
        }
        values[i] = rand;
    }
    $.merge(values, values);
    return shuffle(values);
}

function shuffle(o) {
        for(var j, x, i = o.length; i; 
            j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
};

//так быстрее всего
//так что оставлю так
function createCards(values) {
    for (i = 0; i < values.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.value = values[i];
        card.setAttribute('onclick', 'showCard(this)');
        
        var textValue = document.createElement('p');
        textValue.innerHTML = values[i];
        textValue.setAttribute('hidden', 'hidden');
        card.appendChild(textValue);
        
        window.gameField.appendChild(card);
    }
}

function showCard(card) {
    if (window.pause) return;
    
    if (window.selectedCards[0] == 0)
        window.selectedCards[0] = card.value;
    else
        window.selectedCards[1] = card.value;
    
    $(card).attr('style', 'background: white;');
    $(card).children('p').removeAttr("hidden");
    
    if (window.selectedCards[1] != 0) {
        window.pause = true;
        setTimeout(checkResult, 600);
    }
}

function checkResult() {
    var fieldCards = window.gameField.children;
    
    if (window.selectedCards[0] == window.selectedCards[1]) {
        markCard(fieldCards)
        window.gameResult--;
        if (window.gameResult == 0) {
            setTimeout(gameEnd, 0);
        }
    }
    else {
        hideCards(fieldCards);
    }
    window.selectedCards[0] = 0;
    window.selectedCards[1] = 0;
    window.pause = false;
}

function markCard(fieldCards) {
    $(fieldCards).each(function() {
        if (this.value == window.selectedCards[0]
           || this.value == window.selectedCards[1]) {
            $(this).attr('style', 'background: url(img/card-opened.jpg) round;')
        }
    });
}

function hideCards(fieldCards) {
    $(fieldCards).each(function() {
        if (this.value == window.selectedCards[0]
           || this.value == window.selectedCards[1]) {
            if (!this.firstChild.hasAttribute('hidden')) {
                this.setAttribute('style', 'background: url(img/card.jpg) round;');
                this.firstChild.setAttribute('hidden', 'hidden');
            }
        }
    });
}

function gameEnd() {
    var $text = $('#end-text')[0];
    $text.removeAttribute('hidden');
    var min = new Date().getMinutes() - window.startTime.getMinutes();
    var sec = new Date().getSeconds() - window.startTime.getSeconds();
    if (sec < 0)
        sec = 60 - Math.abs(sec);
    $text.innerHTML = 'Победка! Ваше время: ' 
            + min + ':' + sec + ' мин.';
}

/*
function startGame() {
    window.gameField = 
        document.getElementById("game-field");
    var fieldSize = document.getElementById("game-field-size").value;
    
    removeAllCards();
    
    var values = createFieldValues(fieldSize);
    
    createCards(values); 
    
    window.gameResult = fieldSize / 2;
    
    window.startTime = new Date();
    
    var text = document.getElementById('end-text');
    if (!text.hasAttribute('hidden'))
        text.setAttribute('hidden', 'hidden');
}


//перемешивает массив
function shuffle(o) {
        for(var j, x, i = o.length; i; 
            j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
};

function generateValue(min, max){
    var rand = min - 0.5 + Math.random()*(max-min+1)
    return Math.round(rand);
}


function removeAllCards() {
    var children = window.gameField.childNodes;
    for(var i = children.length - 1; i != 0; i--) {
        var child = children[i];
        window.gameField.removeChild(child);
    }
}


function createCards(values) {
    for (i = 0; i < values.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.value = values[i];
        card.setAttribute('onclick', 'showCard(this)');
        
        var textValue = document.createElement('p');
        textValue.innerHTML = values[i];
        textValue.setAttribute('hidden', 'hidden');
        card.appendChild(textValue);
        
        window.gameField.appendChild(card);
    }
}

function createFieldValues(fieldSize){
    var min = 1;
    
    if (fieldSize == '4') {
        var max = 9;
    }
    else if (fieldSize == '8') {
        var max = 20;
    }
    else if (fieldSize == '16') {
        var max = 50;
    }
    else {
        var max = 99;
    }
    var values = new Array(fieldSize / 2);
    for( i = 0; i < fieldSize / 2; i++) {
        var rand = generateValue(min, max);
        if (values.indexOf(rand) != -1) {
            i--;
            continue;
        }
        values[i] = rand;
    }
    
    values = values.concat(values);
    return shuffle(values);
}

function showCard(card) {
    if (window.pause) return;
    
    if (window.selectedCards[0] == 0)
        window.selectedCards[0] = card.value;
    else
        window.selectedCards[1] = card.value;
    card.setAttribute('style', 'background: white;');
    card.firstChild.removeAttribute('hidden');
    if (window.selectedCards[1] != 0) {
        window.pause = true;
        setTimeout(checkResult, 600);
    }
}

function checkResult() {
    var fieldCards = window.gameField.children;
    
    if (window.selectedCards[0] == window.selectedCards[1]) {
        markCard(fieldCards)
        window.gameResult--;
        if (window.gameResult == 0) {
            setTimeout(gameEnd, 0);
        }
    }
    else {
        hideCards(fieldCards);
    }
    window.selectedCards[0] = 0;
    window.selectedCards[1] = 0;
    window.pause = false;
}

function markCard(fieldCards) {
    for (i = 0; i < fieldCards.length; i++) {
        if (fieldCards[i].value == window.selectedCards[0]
           || fieldCards[i].value == window.selectedCards[1]) { 
            fieldCards[i].setAttribute('style', 'background: url(img/card-opened.jpg) round;');
        }
    }
}

function hideCards(fieldCards) {
    for (i = 0; i < fieldCards.length; i++) {
        if (fieldCards[i].value == window.selectedCards[0]
           || fieldCards[i].value == window.selectedCards[1]) { 
            if (!fieldCards[i].firstChild.hasAttribute('hidden')) {
                fieldCards[i].setAttribute('style', 'background: url(img/card.jpg) round;');
                fieldCards[i].firstChild.setAttribute('hidden', 'hidden');
            }
        }        
    }
}

function gameEnd() {
    var text = document.getElementById('end-text');
    text.removeAttribute('hidden');
    var min = new Date().getMinutes() - window.startTime.getMinutes();
    var sec = new Date().getSeconds() - window.startTime.getSeconds();
    if (sec < 0)
        sec = 60 - Math.abs(sec);
    text.innerHTML += '\n' + 'Ваше время: ' + min + ':' + sec + ' мин.';
}

*/






