import './style.css';
// const post = new Post ('Webpack');

// Начнем с того, что создадим класс Game, который будет представлять собой Пятнашки в целом. 
// Он будет получать в качестве параметров контекст рисования и размер одной пятнашки.


//Определим переменную arr, хранящую схему игрового поля, 
// и переменную clicks, в которой будем хранить количество ходов игрока. 
// Кроме того, создадим метод getClicks, который будет возвращать количество ходов. 
// Он нам пригодится в конце игры, при выигрыше.

function Game(context, cellSize){
    var arr = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ];
    var clicks = 0;
 
    this.getClicks = function() {
	    return clicks;
    };
  
    //— метод cellView получает координаты и рисует в них пятнашку.
  function cellView(x, y){
		context.fillStyle = "#FFB93B";
	  context.fillRect(
      x+1, 
      y+1, 
      cellSize-2, 
      cellSize-2
    );
	}
  
    //— метод numView определяет, как выглядит текст (цифра).
  function numView(){
		context.font = "bold "+ 
      (cellSize/2) + "px Sans";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#222";
	}
  
    //— метод getNullCell возвращает позицию пустой клетки в массиве.

  this.getNullCell = function(){
		for (var i = 0; i<4; i++){
			for (var j=0; j<4; j++){
				if(arr[j][i] === 0){
					return {'x': i, 'y': j};
				}
			}
		}
	}
  
    //— метод draw отрисовывает всю игру.

  this.draw = function() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (arr[i][j] > 0) {
					cellView(
            j * cellSize, 
            i * cellSize
          );
					numView();
					context.fillText(
            arr[i][j], 
            j * cellSize + cellSize / 2,
            i * cellSize + cellSize / 2
          );
				}
			}
		}
	};
  

    //— метод move обсчитывает перемещение пятнашки на пустую позицию и редактирует текущую схему игрового поля.

  this.move = function(x, y) {
		var nullX = this.getNullCell().x;
		var nullY = this.getNullCell().y;
		if (
      ((x - 1 == nullX || x + 1 == nullX) && y == nullY) 
      || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)
    ) {
			arr[nullY][nullX] = arr[y][x];
			arr[y][x] = 0;
			clicks++;
			// count.innerHTML = `Count: ${game.getClicks() + 1}`;
		}

	};
  

    //— метод victory проверяет, сложены ли пятнашки.

  this.victory = function() {
		var e = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
		var res = true;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (e[i][j] != arr[i][j]) {
					res = false;
				}
			}
		}
		return res;
	};
  
    //— метод getRandomBool — вспомогательный, возвращает случайное логическое значение.

  function getRandomBool() {
		if (Math.floor(Math.random() * 2) === 0) {
			return true;
		}
	}
    
    
    //— метод mix перемешивает пятнашки заданное количество раз.

	this.mix = function(stepCount) {
		console.log(stepCount);
		var x,y;
		for (var i = 0; i < stepCount; i++) {
			var nullX = this.getNullCell().x;
			var nullY = this.getNullCell().y;
			var hMove = getRandomBool();
			var upLeft = getRandomBool();
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft)  { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft)  { y = nullY; x = nullX + 1;}
			if (hMove && upLeft)   { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
				this.move(x, y);
			}
		}
		clicks = 0;
	};
 
	this.getClicks = function() {
		return clicks;
	};
}


//Воспользуемся событием полной загрузки документа, определим наш холст, контекст рисования и создадим объект класса Game.
window.onload = function(){
	const mainInfo = document.createElement("div");
	mainInfo.setAttribute('class', 'mainInfo');
	const timer = document.createElement("span");
	const pauseGame = document.createElement("button");
	pauseGame.innerHTML='Pause Game';
	pauseGame.setAttribute('class', 'pauseBtn');
	const canvasWrap = document.createElement("CANVAS");
	var count = document.createElement("p");

	const wrapper = document.createElement("div");
	wrapper.setAttribute('id', 'dashboard');
	
	document.body.insertAdjacentElement('afterbegin', mainInfo);
	mainInfo.after(wrapper);
	wrapper.insertAdjacentElement('afterbegin', canvasWrap);
	mainInfo.appendChild(timer);
	mainInfo.appendChild(pauseGame);
	mainInfo.insertAdjacentElement('afterbegin', count); 
	createMenu();

	// показать/спрятать меню 
	document.getElementsByClassName("pauseBtn")[0].onclick = function(){
		const element = document.getElementById("popup");
		const dashboard = document.getElementById('dashboard');
		if(element.style.visibility == "visible") {
			dashboard.classList.remove('dashboard');
			element.style.visibility = 'hidden';		
		}else{
			element.style.visibility = 'visible';
			dashboard.classList.add('dashboard');
		}
	};

	count.innerHTML = `Count: 0`;

	count.id = "count";
    canvasWrap.id = "canvas";

	let counte = 0;
	let timerId = setInterval(() => {
		counte += 1;
		timer.innerHTML = `${Math.floor(counte / 60).toString().padStart(2, "0")}:${(counte % 60).toString().padStart(2, "0")}`;
		}, 1000);

		// const renderTimer = () => {
		// 	counte += 1;
		// 	timer.innerHTML = `${Math.floor(counte / 60).toString().padStart(2, "0")}:${(counte % 60).toString().padStart(2, "0")}`;
		//   }
		//   const timero = setInterval(renderTimer, 1000)

	var canvas = document.getElementById("canvas");
	    canvas.width  = 320;
	    canvas.height = 320;
	var cellSize = canvas.width / 4;
	var context = canvas.getContext("2d");
	context.fillRect(0, 0, canvas.width, canvas.height);
 
	var game = new Game(context, cellSize);
	game.mix(300);
	game.draw();



    //обработка события клика:
  canvas.onclick = function(e) {
      console.log(e);
      console.log(e.pageX);
    var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    var y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
	console.log(e.pageY, canvas.offsetTop, cellSize);
	// count.innerHTML = `Count: ${game.getClicks() + 1}`;
    event(x, y); 
  };

  canvas.ontouchend = function(e) {
    var x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
    var y = (e.touches[0].pageY - canvas.offsetTop)  / cellSize | 0;
    
    event(x, y);
  };  

  function event(x, y) { 
    game.move(x, y);
    context.fillRect(0, 0, canvas.width, canvas.height);
	game.draw();
	count.innerHTML = `Count: ${game.getClicks()}`;

    if (game.victory()) {
      alert("Собрано за "+game.getClicks()+" касание!"); 
      game.mix(300);
      context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw(context, cellSize);
    }
  }
}


// Начало menu

function createMenu(){
	const popup = document.createElement("div");
	popup.classList.add('popup');
	popup.setAttribute('id', 'popup');

	const canvasEl = document.getElementsByTagName('canvas')[0];
	canvasEl.after(popup);

	const menu = document.createElement('div');
	menu.setAttribute('id','menuList');
	menu.setAttribute('class','menuList');

	const menuListItems = ['New Game','Saved games','Best score','Rules', 'Settings'];
	document.getElementById('popup').appendChild(menu);
	menuListItems.forEach(renderMenuList);

	function renderMenuList(element) {
		const button = document.createElement('button');
		button.setAttribute('class','item');

		menu.appendChild(button);

		button.innerHTML=button.innerHTML + element;
	}

}
