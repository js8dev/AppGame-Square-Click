//1 работа с кнопкой

var $start = document.querySelector('#start') // переменная с доллара -  нода, те мы забираем ее с помощью функции querySelector() 
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')// 8 разбираемся с input чтобы менялось время

var score = 0
var isGameStarted = false //6
var colors = ['red', 'blue', 'green', 'pink', 'yellow', 'black']



//9 рефакторинг - делаем функции прятать и показывать
function show($element) {
    $element.classList.remove('hide')
}

function hide($element) {
    $element.classList.add('hide')
}

$start.addEventListener('click', startGame) // Метод $start.addEventListener() регистрирует определённый обработчик события, вызванного на $start
$game.addEventListener('click', handleBoxClick) // прослушка события клика чтобы ловить клик по квадрату
$gameTime.addEventListener('input', setGameTime) //8

//6 реализация таймера и счетчика
function startGame() {
    score = 0 //7
    setGameTime() // 7
    $gameTime.setAttribute('disabled', true) // 8 блок input таймера во время игры
    // $timeHeader.classList.remove('hide')//7
    // $resultHeader.classList.add('hide')//7
    //8 рефакторинг данных строк + перенесем в SetGameTime
    // show($timeHeader)
    // hide($resultHeader)

    isGameStarted = true // 5
    $game.style.backgroundColor = '#00bfff'
    // $start.classList.add('hide') // когда игра - кнопка пропадает (в css класс hide имеет display: none!important; )
    // 8
    hide($start)
    var interval = setInterval(function() { // 6
        var time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval) // чтобы не ел память
            endGame()//end game
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    
    renderBox()
}
// 7 обновление по окончанию игры
//6 функция endGame

function endGame() {
    isGameStarted = false 
    setGameScore()
    $gameTime.removeAttribute('disabled')
    // $start.classList.remove('hide')    // 7 показываем кнопку старт
    show($start)
    $game.backgroundColor = '#00bfff' // 7 меняем фон
    $game.innerHTML = '' //7 очистка от объектов
    // $timeHeader.classList.add('hide') 
    hide($timeHeader) // 8
    // $resultHeader.classList.remove('hide')
    show($resultHeader) // 8
    
    
}

//3 функция клика по квадрату

function handleBoxClick(event) {

    if (!isGameStarted) {
        return
    }
    // console.log(event.target.dataset) // проверим нажатие на объект с дата атрибутом 
    if (event.target.dataset.box) {
        score++
        renderBox() // заново генерируем объект
    }
}
// 7 создание ф-ии счета игры
function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime () {
    
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    //8 
    show($timeHeader)
    hide($resultHeader)
}

//2 создание объектов для игры

function renderBox() {
    $game.innerHTML = '' //3 чтобы не было дублирования и удалялись старые 
    var box = document.createElement('div') // передаем строковый элемент который добавляем
    var boxSize = getRandom(10,150)//5
    var gameSize = $game.getBoundingClientRect() // узнаем поле игры game 300px x 300px
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length)

    // box.style.height = box.style.width = '50px' // размер
    box.style.height = box.style.width = boxSize + 'px' //5 рандомный размер
    box.style.position = 'absolute' // границы внутри голубого квадрата
    box.style.backgroundColor = colors[randomColorIndex] // цвет
    // box.style.top = '50px'
    // box.style.left = '70px'
    box.style.top = getRandom(0, maxTop) + 'px' //5
    box.style.left = getRandom(0, maxLeft) + 'px'//5 
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')//добавляем атрибут data-box

    $game.insertAdjacentElement('afterbegin', box) // Метод insertAdjacentElement() добавляет переданный элемент в DOM-дерево относительно элемента (положение в блоке game), вызвавшего метод.

}

// 5 динамическое изменение style объекта box

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min) // чтобы вернули число и обращение к глобальному объекту Math и вызовем ф-ию random (генерирует рандомное число)

}


