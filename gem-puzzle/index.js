/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
import './style.css';
// const post = new Post ('Webpack');

// Начнем с того, что создадим класс Game, который будет представлять собой Пятнашки в целом.
// Он будет получать в качестве параметров контекст рисования и размер одной пятнашки.

// Определим переменную arr, хранящую схему игрового поля,
// и переменную clicks, в которой будем хранить количество ходов игрока.
// Кроме того, создадим метод getClicks, который будет возвращать количество ходов.
// Он нам пригодится в конце игры, при выигрыше.
const audio = new Audio();
const img = new Image();

let arrLast = [];
const arrPrime = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];
const initArr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];
let timerOn = true;
let loadGame = false;
let sound = false;
let picture = false;
let timerId;
let counte = 0;
let clicks = 0;
let arr;
let imagesArr;

function getImage() {
  // const x = Math.floor((Math.random() * 16) + 1);
  const random = Math.floor(Math.random() * imagesArr.length);
  return imagesArr[random];
}

function Game(context, cellSize) {
  // const arr = loadGame ? arrLast : arrPrime;

  this.getClicks = function () {
    return clicks;
  };

  // — метод cellView получает координаты и рисует в них пятнашку.
  function cellView(i, j, x, y) {
    // const canvas = document.getElementById('canvas');
    // const cellSize = canvas.width / 4;
    // canvas.width = 320;
    // canvas.height = 320;
    // const context = canvas.getContext('2d');
    if (picture === true) {
      context.drawImage(img, y, x, cellSize - 2, cellSize - 2, j + 1, i + 1, cellSize - 2, cellSize - 2);
    } else {
      context.fillStyle = '#8edf58';
      context.fillRect(
        j + 1,
        i + 1,
        cellSize - 2,
        cellSize - 2,
      );
    }
  }

  // — метод numView определяет, как выглядит текст (цифра).
  function numView() {
    context.font = `bold ${
      cellSize / 2}px Sans`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#222';
  }

  // — метод getNullCell возвращает позицию пустой клетки в массиве.

  this.getNullCell = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arr[j][i] === 0) {
          return { x: i, y: j };
        }
      }
    }
  };

  // — метод draw отрисовывает всю игру.

  const getIndex = (el) => {
    for (let k = 0; k < initArr.length; k++) {
      for (let l = 0; l < initArr.length; l++) {
        if (initArr[k][l] === el) {
          return { k, l };
        }
      }
    }
  };

  this.draw = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arr[i][j] > 0) {
          const elem = arr[i][j];
          const { k, l } = getIndex(elem);
          cellView(
            i * cellSize,
            j * cellSize,
            k * cellSize,
            l * cellSize,
          );
          numView();
          context.fillText(
            arr[i][j],
            j * cellSize + cellSize / 2,
            i * cellSize + cellSize / 2,
          );
        }
      }
    }
  };

  // — метод move обсчитывает перемещение пятнашки на пустую позицию и
  // редактирует текущую схему игрового поля.

  this.move = function (x, y) {
    const nullX = this.getNullCell().x;
    const nullY = this.getNullCell().y;
    if (
      ((x - 1 === nullX || x + 1 === nullX) && y === nullY)
      || ((y - 1 === nullY || y + 1 === nullY) && x === nullX)
    ) {
      arr[nullY][nullX] = arr[y][x];
      arr[y][x] = 0;
      clicks++;
      arrLast = arr;
      if (counte !== 0 && sound === true) {
        audio.src = '/sound/trigger-button.mp3';
        audio.autoplay = true;
      }
    }
  };

  // — метод victory проверяет, сложены ли пятнашки.

  this.victory = function () {
    const e = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
    let res = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (e[i][j] !== arr[i][j]) {
          res = false;
        }
      }
    }
    return res;
  };

  // — метод getRandomBool — вспомогательный, возвращает случайное логическое значение.

  function getRandomBool() {
    return Math.floor(Math.random() * 2) === 0;
  }

  // — метод mix перемешивает пятнашки заданное количество раз.

  this.mix = function (stepCount) {
    let x; let y;
    for (let i = 0; i < stepCount; i++) {
      const nullX = this.getNullCell().x;
      const nullY = this.getNullCell().y;
      const hMove = getRandomBool();
      const upLeft = getRandomBool();
      if (!hMove && !upLeft) { y = nullY; x = nullX - 1; }
      if (hMove && !upLeft) { x = nullX; y = nullY + 1; }
      if (!hMove && upLeft) { y = nullY; x = nullX + 1; }
      if (hMove && upLeft) { x = nullX; y = nullY - 1; }
      if (x >= 0 && x <= 3 && y >= 0 && y <= 3) {
        this.move(x, y);
      }
    }
  };
}

// установка таймера

function setTimer() {
  const timer = document.getElementById('timer');

  if (!timerOn) {
    window.clearTimeout(timerId);
  } else {
    timerId = setInterval(() => {
      counte += 1;
      timer.innerHTML = `${Math.floor(counte / 60).toString().padStart(2, '0')}:${(counte % 60).toString().padStart(2, '0')}`;
    }, 1000);
  }
}

// заполнение таблицы рекордов

function setScore() {
  const allScore123 = JSON.parse(localStorage.getItem('allScore123'));
  allScore123.sort((a, b) => ((a[0] + a[1]) - (b[0] + b[1])));

  for (let i = 0; i < 10; i++) {
    if (!allScore123[i]) break;
    document.getElementById(`scoreList${i + 1}`).innerHTML = `Время: 
    ${Math.floor(allScore123[i][0] / 60).toString().padStart(2, '0')}:${(allScore123[i][0] % 60).toString().padStart(2, '0')}
     Ходов: ${allScore123[i][1]}`;
  }
// allScore123.forEach((el, ind) => {
// document.getElementById(`scoreList${ind + 1}`).innerHTML = `Время: 
// ${Math.floor(el[0] / 60).toString().padStart(2, '0')}:${(el[0] % 60).toString().padStart(2, '0')}
//      Ходов: ${el[1]}`;
// });
}
// Воспользуемся событием полной загрузки документа, определим наш холст,
// контекст рисования и создадим объект класса Game.

function newGame() {
  // const canvasWrap = document.createElement('CANVAS');
  // const wrapper = document.getElementById('dashboard');
  const count = document.getElementById('count');
  document.getElementsByClassName('pauseBtn')[0].disabled = false;

  setTimer();

  // wrapper.insertAdjacentElement('afterbegin', canvasWrap);
  // count.after(timer);
  // canvasWrap.id = 'canvas';

  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const cellSize = canvas.width / 4;
  const context = canvas.getContext('2d');

  context.fillRect(0, 0, canvas.width, canvas.height);

  const game = new Game(context, cellSize);

  if (loadGame === false) game.mix(300);
  else game.mix(0);
  game.draw();

  // game.mix(300);

  function event(x, y) {
    context.fillRect(0, 0, canvas.width, canvas.height);
    game.move(x, y);
    game.draw();
    count.innerHTML = `Count: ${game.getClicks()}`;

    if (game.victory()) {
      const timer = document.getElementById('timer');
      let allScore123 = JSON.parse(localStorage.getItem('allScore123'));
      alert(`Ура! Вы решили головоломку за ${timer.innerHTML} и ${game.getClicks()} ходов!`);

      if (allScore123 === null) {
        allScore123 = Array([counte, clicks]);
      } else {
        allScore123.push([counte, clicks]);
      }
      localStorage.setItem('allScore123', JSON.stringify(allScore123));

      counte = 0;
      clicks = 0;

      setScore();

      document.getElementsByClassName('pauseBtn')[0].click();
      document.getElementsByClassName('pauseBtn')[0].disabled = true;

      // newGame();
      // game.mix(300);
      // context.fillRect(0, 0, canvas.width, canvas.height);
      // game.draw(context, cellSize);
    }
  }

  // обработка события клика:
  canvas.onclick = function (e) {
    const x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    const y = (e.pageY - canvas.offsetTop) / cellSize | 0;
    // count.innerHTML = `Count: ${game.getClicks() + 1}`;
    event(x, y);
  };

  canvas.ontouchend = function (e) {
    const x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
    const y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;

    event(x, y);
  };

  if (!loadGame) clicks = 0;
  loadGame = false;
}

// Начало menu

function createMenu() {
  const mainInfo = document.createElement('div');
  mainInfo.setAttribute('class', 'mainInfo');

  const timer = document.createElement('span');
  timer.id = 'timer';

  const pauseGame = document.createElement('button');
  pauseGame.innerHTML = 'Pause Game';
  pauseGame.setAttribute('class', 'pauseBtn');
  pauseGame.disabled = true;

  const count = document.createElement('p');
  count.id = 'count';

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'dashboard');
  wrapper.classList.add('dashboard');

  const canvasWrap = document.createElement('CANVAS');
  canvasWrap.id = 'canvas';

  const popup = document.createElement('div');
  const menu = document.createElement('div');
  const saveMenu = document.createElement('div');
  const scoreMenu = document.createElement('div');
  const rulesMenu = document.createElement('div');
  const settingsMenu = document.createElement('div');

  wrapper.insertAdjacentElement('afterbegin', canvasWrap);
  document.body.insertAdjacentElement('afterbegin', mainInfo);
  mainInfo.after(wrapper);
  mainInfo.insertAdjacentElement('afterbegin', count);
  mainInfo.appendChild(timer);
  mainInfo.appendChild(pauseGame);

  popup.style.visibility = 'visible';

  count.innerHTML = 'Count: 0';

  // показать/спрятать меню

  document.getElementsByClassName('pauseBtn')[0].onclick = function () {
    // const element = document.getElementById('popup');
    // const dashboard = document.getElementById('dashboard');

    timerOn = !timerOn;

    if (popup.style.visibility === 'visible') {
      wrapper.classList.remove('dashboard');
      // element.style.visibility = 'hidden';
      popup.style.visibility = 'hidden';
      pauseGame.innerHTML = 'Pause Game';
    } else {
      // element.style.visibility = 'visible';
      wrapper.classList.add('dashboard');
      popup.style.visibility = 'visible';
      pauseGame.innerHTML = 'Resume Game';
    }

    // document.querySelector('#scoreButton').click();
    menu.hidden = false;
    saveMenu.hidden = true;
    scoreMenu.hidden = true;
    rulesMenu.hidden = true;
    settingsMenu.hidden = true;

    setTimer();
  };

  const createPopup = function () {
    popup.classList.add('popup');
    popup.setAttribute('id', 'popup');

    wrapper.insertAdjacentElement('beforeend', popup);
  };

  const createMainMenu = function () {
    menu.setAttribute('id', 'menuList');
    menu.setAttribute('class', 'menuList');
    // menu.hidden = true;

    const menuListItems = ['New Game', 'Saved games', 'Best score', 'Rules', 'Settings'];
    popup.appendChild(menu);

    function renderMenuList(element) {
      const button = document.createElement('button');
      button.setAttribute('class', 'item');
      button.setAttribute('id', 'mainListButtons');

      menu.appendChild(button);

      button.innerHTML += element;
    }

    menuListItems.forEach(renderMenuList);

    const menuListButtons = document.querySelectorAll('#mainListButtons');

    menuListButtons[0].addEventListener('click', () => {
      popup.style.visibility = 'hidden';
      wrapper.classList.remove('dashboard');
      pauseGame.innerHTML = 'Pause Game';

      timerOn = true;
      counte = 0;
      count.innerHTML = 'Count: 0';
      arr = arrPrime;
      newGame();
    });

    menuListButtons[1].addEventListener('click', () => {
      menu.hidden = true;
      saveMenu.hidden = false;
    });

    menuListButtons[2].addEventListener('click', () => {
      menu.hidden = true;
      scoreMenu.hidden = false;
    });

    menuListButtons[3].addEventListener('click', () => {
      menu.hidden = true;
      rulesMenu.hidden = false;
    });

    menuListButtons[4].addEventListener('click', () => {
      menu.hidden = true;
      settingsMenu.hidden = false;
    });
  };

  const createSaveMenu = function () {
    saveMenu.setAttribute('id', 'saveList');
    saveMenu.setAttribute('class', 'menuList');
    saveMenu.hidden = true;

    const saveMenuListItems = ['Save game', 'Load game', 'Go back'];
    popup.appendChild(saveMenu);

    function renderSaveList(element) {
      const button = document.createElement('button');
      button.setAttribute('class', 'item');
      button.setAttribute('id', 'saveListButtons');

      saveMenu.appendChild(button);

      button.innerHTML += element;
    }

    saveMenuListItems.forEach(renderSaveList);

    const saveListButtons = document.querySelectorAll('#saveListButtons');
    // ==========================
    saveListButtons[0].addEventListener('click', () => {
      localStorage.setItem('savedGame', JSON.stringify(arrLast));
      localStorage.setItem('savedScore', JSON.stringify([counte, clicks]));
    });

    // в загрузке игры пофиксить время и ходы

    saveListButtons[1].addEventListener('click', () => {
      loadGame = true;
      timerOn = true;

      arrLast = JSON.parse(localStorage.getItem('savedGame'));
      const scoreLast = JSON.parse(localStorage.getItem('savedScore'));
      [counte, clicks] = scoreLast;
      // counte = scoreLast[0];
      // clicks = scoreLast[1];
      menu.hidden = false;
      saveMenu.hidden = true;
      count.innerHTML = `Count: ${clicks}`;
      popup.style.visibility = 'hidden';
      wrapper.classList.remove('dashboard');
      pauseGame.innerHTML = 'Pause Game';

      // setTimer();
      arr = arrLast;
      newGame();
    });

    saveListButtons[2].addEventListener('click', () => {
      menu.hidden = false;
      saveMenu.hidden = true;
    });
  };

  const createScoreMenu = function () {
    const score = document.createElement('ol');
    scoreMenu.setAttribute('id', 'scoreList');
    scoreMenu.setAttribute('class', 'menuList');
    scoreMenu.hidden = true;

    popup.appendChild(scoreMenu);
    scoreMenu.appendChild(score);

    for (let i = 1; i <= 10; i++) {
      const li = document.createElement('li');
      // button.setAttribute('class', 'item');
      li.setAttribute('id', `scoreList${i}`);

      score.appendChild(li);
    }

    setScore();

    const button = document.createElement('button');
    button.setAttribute('class', 'item');
    button.setAttribute('id', 'scoreButton');

    scoreMenu.appendChild(button);
    button.innerHTML += 'Go back';

    const scoreButton = document.querySelector('#scoreButton');

    scoreButton.addEventListener('click', () => {
      menu.hidden = false;
      scoreMenu.hidden = true;
    });
  };

  const createRulesMenu = function () {
    rulesMenu.setAttribute('id', 'rulesList');
    rulesMenu.setAttribute('class', 'menuList');
    rulesMenu.hidden = true;

    popup.appendChild(rulesMenu);

    const button = document.createElement('button');
    button.setAttribute('class', 'item');
    button.setAttribute('id', 'rulesButton');

    rulesMenu.appendChild(button);
    button.innerHTML += 'Go back';

    const rulesButton = document.querySelector('#rulesButton');

    rulesButton.addEventListener('click', () => {
      menu.hidden = false;
      rulesMenu.hidden = true;
    });
  };

  const createSettingsMenu = function () {
    settingsMenu.setAttribute('id', 'settingsList');
    settingsMenu.setAttribute('class', 'menuList');
    settingsMenu.hidden = true;

    popup.appendChild(settingsMenu);

    const settingListItems = ['Sound: Off', 'Picture: Off', 'Game 3x3', 'Go back'];
    function renderSettingList(element) {
      const button = document.createElement('button');
      button.setAttribute('class', 'item');
      button.setAttribute('id', 'settingsButton');

      settingsMenu.appendChild(button);

      button.innerHTML += element;
    }

    settingListItems.forEach(renderSettingList);

    const settingsButtons = document.querySelectorAll('#settingsButton');

    settingsButtons[0].addEventListener('click', () => {
      sound = !sound;

      if (sound === true) {
        settingsButtons[0].innerHTML = 'Sound: On';
      } else {
        settingsButtons[0].innerHTML = 'Sound: Off';
      }
    });

    settingsButtons[1].addEventListener('click', () => {
      picture = !picture;
      const canvas = document.getElementById('canvas');

      const cellSize = canvas.width / 4;
      const context = canvas.getContext('2d');
      const game = new Game(context, cellSize);
      // game.arr = arrLast;

      if (picture === true) {
        settingsButtons[1].innerHTML = 'Picture: On';
        // loadGame = true;
        game.arr = arrLast;
        game.draw();
      } else {
        settingsButtons[1].innerHTML = 'Picture: Off';
        // loadGame = true;
        game.arr = arrLast;

        game.draw();
      }
    });

    // settingsButtons[2].addEventListener('click', () => {
    //   timerOn = true;

    //   menu.hidden = false;
    //   settingsMenu.hidden = true;
    //   popup.style.visibility = 'hidden';
    //   wrapper.classList.remove('dashboard');
    //   pauseGame.innerHTML = 'Pause Game';
    // });

    settingsButtons[3].addEventListener('click', () => {
      menu.hidden = false;
      settingsMenu.hidden = true;
    });
  };

  createPopup();
  createMainMenu();
  createSaveMenu();
  createScoreMenu();
  createRulesMenu();
  createSettingsMenu();
}

window.onload = function () {
  imagesArr = ['../assets/1.jpg', '../assets/2.jpg', '../assets/3.jpg',
    '../assets/4.jpg',
    '../assets/5.jpg',
    '../assets/6.jpg',
    '../assets/7.jpg',
    '../assets/8.jpg'];
  createMenu();

  img.src = getImage();
};
