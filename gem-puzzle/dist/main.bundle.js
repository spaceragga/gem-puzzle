/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n; // const post = new Post ('Webpack');\n// Начнем с того, что создадим класс Game, который будет представлять собой Пятнашки в целом. \n// Он будет получать в качестве параметров контекст рисования и размер одной пятнашки.\n//Определим переменную arr, хранящую схему игрового поля, \n// и переменную clicks, в которой будем хранить количество ходов игрока. \n// Кроме того, создадим метод getClicks, который будет возвращать количество ходов. \n// Он нам пригодится в конце игры, при выигрыше.\n\nfunction Game(context, cellSize) {\n  var arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];\n  var clicks = 0;\n\n  this.getClicks = function () {\n    return clicks;\n  }; //— метод cellView получает координаты и рисует в них пятнашку.\n\n\n  function cellView(x, y) {\n    context.fillStyle = \"#FFB93B\";\n    context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);\n  } //— метод numView определяет, как выглядит текст (цифра).\n\n\n  function numView() {\n    context.font = \"bold \" + cellSize / 2 + \"px Sans\";\n    context.textAlign = \"center\";\n    context.textBaseline = \"middle\";\n    context.fillStyle = \"#222\";\n  } //— метод getNullCell возвращает позицию пустой клетки в массиве.\n\n\n  this.getNullCell = function () {\n    for (var i = 0; i < 4; i++) {\n      for (var j = 0; j < 4; j++) {\n        if (arr[j][i] === 0) {\n          return {\n            'x': i,\n            'y': j\n          };\n        }\n      }\n    }\n  }; //— метод draw отрисовывает всю игру.\n\n\n  this.draw = function () {\n    for (var i = 0; i < 4; i++) {\n      for (var j = 0; j < 4; j++) {\n        if (arr[i][j] > 0) {\n          cellView(j * cellSize, i * cellSize);\n          numView();\n          context.fillText(arr[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);\n        }\n      }\n    }\n  }; //— метод move обсчитывает перемещение пятнашки на пустую позицию и редактирует текущую схему игрового поля.\n\n\n  this.move = function (x, y) {\n    var nullX = this.getNullCell().x;\n    var nullY = this.getNullCell().y;\n\n    if ((x - 1 == nullX || x + 1 == nullX) && y == nullY || (y - 1 == nullY || y + 1 == nullY) && x == nullX) {\n      arr[nullY][nullX] = arr[y][x];\n      arr[y][x] = 0;\n      clicks++; // count.innerHTML = `Count: ${game.getClicks() + 1}`;\n    }\n  }; //— метод victory проверяет, сложены ли пятнашки.\n\n\n  this.victory = function () {\n    var e = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];\n    var res = true;\n\n    for (var i = 0; i < 4; i++) {\n      for (var j = 0; j < 4; j++) {\n        if (e[i][j] != arr[i][j]) {\n          res = false;\n        }\n      }\n    }\n\n    return res;\n  }; //— метод getRandomBool — вспомогательный, возвращает случайное логическое значение.\n\n\n  function getRandomBool() {\n    if (Math.floor(Math.random() * 2) === 0) {\n      return true;\n    }\n  } //— метод mix перемешивает пятнашки заданное количество раз.\n\n\n  this.mix = function (stepCount) {\n    console.log(stepCount);\n    var x, y;\n\n    for (var i = 0; i < stepCount; i++) {\n      var nullX = this.getNullCell().x;\n      var nullY = this.getNullCell().y;\n      var hMove = getRandomBool();\n      var upLeft = getRandomBool();\n\n      if (!hMove && !upLeft) {\n        y = nullY;\n        x = nullX - 1;\n      }\n\n      if (hMove && !upLeft) {\n        x = nullX;\n        y = nullY + 1;\n      }\n\n      if (!hMove && upLeft) {\n        y = nullY;\n        x = nullX + 1;\n      }\n\n      if (hMove && upLeft) {\n        x = nullX;\n        y = nullY - 1;\n      }\n\n      if (0 <= x && x <= 3 && 0 <= y && y <= 3) {\n        this.move(x, y);\n      }\n    }\n\n    clicks = 0;\n  };\n\n  this.getClicks = function () {\n    return clicks;\n  };\n} //Воспользуемся событием полной загрузки документа, определим наш холст, контекст рисования и создадим объект класса Game.\n\n\nwindow.onload = function () {\n  var mainInfo = document.createElement(\"div\");\n  mainInfo.setAttribute('class', 'mainInfo');\n  var timer = document.createElement(\"span\");\n  var pauseGame = document.createElement(\"button\");\n  pauseGame.innerHTML = 'Pause Game';\n  pauseGame.setAttribute('class', 'pauseBtn');\n  var canvasWrap = document.createElement(\"CANVAS\");\n  var count = document.createElement(\"p\");\n  var wrapper = document.createElement(\"div\");\n  wrapper.setAttribute('id', 'dashboard');\n  document.body.insertAdjacentElement('afterbegin', mainInfo);\n  mainInfo.after(wrapper);\n  wrapper.insertAdjacentElement('afterbegin', canvasWrap);\n  mainInfo.appendChild(timer);\n  mainInfo.appendChild(pauseGame);\n  mainInfo.insertAdjacentElement('afterbegin', count);\n  createMenu(); // показать/спрятать меню \n\n  document.getElementsByClassName(\"pauseBtn\")[0].onclick = function () {\n    var element = document.getElementById(\"popup\");\n    var dashboard = document.getElementById('dashboard');\n\n    if (element.style.visibility == \"visible\") {\n      dashboard.classList.remove('dashboard');\n      element.style.visibility = 'hidden';\n    } else {\n      element.style.visibility = 'visible';\n      dashboard.classList.add('dashboard');\n    }\n  };\n\n  count.innerHTML = \"Count: 0\";\n  count.id = \"count\";\n  canvasWrap.id = \"canvas\";\n  var counte = 0;\n  var timerId = setInterval(function () {\n    counte += 1;\n    timer.innerHTML = \"\".concat(Math.floor(counte / 60).toString().padStart(2, \"0\"), \":\").concat((counte % 60).toString().padStart(2, \"0\"));\n  }, 1000); // const renderTimer = () => {\n  // \tcounte += 1;\n  // \ttimer.innerHTML = `${Math.floor(counte / 60).toString().padStart(2, \"0\")}:${(counte % 60).toString().padStart(2, \"0\")}`;\n  //   }\n  //   const timero = setInterval(renderTimer, 1000)\n\n  var canvas = document.getElementById(\"canvas\");\n  canvas.width = 320;\n  canvas.height = 320;\n  var cellSize = canvas.width / 4;\n  var context = canvas.getContext(\"2d\");\n  context.fillRect(0, 0, canvas.width, canvas.height);\n  var game = new Game(context, cellSize);\n  game.mix(300);\n  game.draw(); //обработка события клика:\n\n  canvas.onclick = function (e) {\n    console.log(e);\n    console.log(e.pageX);\n    var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;\n    var y = (e.pageY - canvas.offsetTop) / cellSize | 0;\n    console.log(e.pageY, canvas.offsetTop, cellSize); // count.innerHTML = `Count: ${game.getClicks() + 1}`;\n\n    event(x, y);\n  };\n\n  canvas.ontouchend = function (e) {\n    var x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;\n    var y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;\n    event(x, y);\n  };\n\n  function event(x, y) {\n    game.move(x, y);\n    context.fillRect(0, 0, canvas.width, canvas.height);\n    game.draw();\n    count.innerHTML = \"Count: \".concat(game.getClicks());\n\n    if (game.victory()) {\n      alert(\"Собрано за \" + game.getClicks() + \" касание!\");\n      game.mix(300);\n      context.fillRect(0, 0, canvas.width, canvas.height);\n      game.draw(context, cellSize);\n    }\n  }\n}; // Начало menu\n\n\nfunction createMenu() {\n  var popup = document.createElement(\"div\");\n  popup.classList.add('popup');\n  popup.setAttribute('id', 'popup');\n  var canvasEl = document.getElementsByTagName('canvas')[0];\n  canvasEl.after(popup);\n  var menu = document.createElement('div');\n  menu.setAttribute('id', 'menuList');\n  menu.setAttribute('class', 'menuList');\n  var menuListItems = ['New Game', 'Saved games', 'Best score', 'Rules', 'Settings'];\n  document.getElementById('popup').appendChild(menu);\n  menuListItems.forEach(renderMenuList);\n\n  function renderMenuList(element) {\n    var button = document.createElement('button');\n    button.setAttribute('class', 'item');\n    menu.appendChild(button);\n    button.innerHTML = button.innerHTML + element;\n  }\n}\n\n//# sourceURL=webpack://gem-puzzle/./index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style.css":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style.css ***!
  \******************************************************************************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n;\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"body {\\n  background-color: aliceblue; }\\n\\ncanvas {\\n  border: 2px solid #333; }\\n\\n.mainInfo {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -ms-flex-item-align: center;\\n      align-self: center;\\n  width: 320px; }\\n\\n.popup {\\n  visibility: hidden;\\n  font-size: 100%;\\n  font-family: 'Ubuntu', Arial, sans-serif;\\n  margin: 0;\\n  padding: 0;\\n  color: #87ff8e;\\n  position: absolute;\\n  background: rgba(0, 0, 0, 0.8);\\n  right: 0;\\n  bottom: 0;\\n  left: 50%;\\n  top: 50%;\\n  width: 100%;\\n  height: 100%;\\n  -webkit-transition: all .1s ease-in;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  z-index: 99;\\n  overflow: hidden;\\n  -webkit-transform: translate(-50%, -50%) scale(1); }\\n\\n.dashboard {\\n  position: relative;\\n  height: 325px;\\n  width: 325px; }\\n\\n.menuList {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: space-evenly;\\n      -ms-flex-pack: space-evenly;\\n          justify-content: space-evenly;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n  width: 80%;\\n  height: 80%; }\\n\\n.item {\\n  background: none;\\n  color: #4aca18;\\n  border: none;\\n  font-size: 20px; }\\n\\n.pauseBtn {\\n  border: none;\\n  background: none; }\\n\\n.pauseBtn:focus {\\n  border: none;\\n  background: none; }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://gem-puzzle/./style.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://gem-puzzle/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style.css\");\n;\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://gem-puzzle/./style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://gem-puzzle/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;