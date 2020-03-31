'use strict';

function Model() {
  let myView = null,
      self = this;

  self.init = function (view) {
    myView = view;
    self.settings = {
      links: {
        main: `
        <div id="main" class="d-flex flex-column justify-content-center align-items-center">
            <h1>One vs All</h1>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <a href="#game">Survival Game</a>
                <a href="#levelGame">Level Game</a>
                <a href="#rules">Rules</a>
                <a href="#results">Results</a>
            </div>
            
          </div>
        `,
        game: `
        <div id="game">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" href="#main">Main page</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#rules">Rules</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#results">Results</a>
            </li>
          </ul>
          <div id="score"></div>
          <div id="wrapper"><canvas id="canvas"></canvas></div>
          <button id="start" class="btn btn-warning">start</button>
          <button id="pause" class="btn btn-warning">pause</button>
          <button id="resume" class="btn btn-warning">resume</button>
          <div id="modal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                <p>Enter your name to save your score</p>
                  <input id="playerName"></input>
                </div>
                <div class="modal-footer">
                  <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
                  <button id="save" type="button" class="btn btn-warning">save</button>
                </div>  
              </div>
            </div>
          </div>
        </div>
        `,
        levelGame : `
          <div id="levelGame">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div class="levels">
                <a id="level level1" href="#level1">1</a>
                <a id="level level2" href="#level2">2</a>
                <a id="level level3" href="#level3">3</a>
                <a id="level level4" href="#level4">4</a>
                <a id="level level5" href="#level5">5</a>
                <a id="level level6" href="#level6">6</a>
            </div>
          </div>
        `,
        level1 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        level2 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        level3 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        level4 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        level5 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        level6 : `
          <div id="levels">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#main">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#rules">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#results">Results</a>
                </li>
            </ul>
            <div id="score"></div>
            <div id="wrapper"><canvas id="canvas"></canvas></div>
            <button id="start-lvl" class="btn btn-warning">start</button>
          </div>
        `,
        rules: `
        <div id="rules">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" href="#main">Main page</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#game">Play</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#results">Reults</a>
            </li>
          </ul>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <p><strong>Survival Game:</strong>
            <br>The controls are arrow keys and the letters AWDS, the shot is carried out by clicking the left mouse button. 
            <br> The game is about survival: the more enemies you shoot, the higher you will be in the score table. 
            <br> One kill one point.
            <br><strong>Level Game:</strong>
            <br>Сontrol and shooting are the same as in the Survival Game, but you have missions.
            <br><strong>Level 1 - kill 10 enemies</strong>
            <br><strong>Level 2 - kill 20 enemies</strong>
            <br><strong>Level 3 - kill 30 enemies</strong>
            <br><strong>Level 4 - kill 50 enemies</strong>
            <br><strong>Level 5 - kill 70 enemies</strong>
            <br><strong>Level 6 - kill 100 enemies</strong>
            </p>
          </div>
        </div>
        `,
        results: `
        <div id="results">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" href="#main">Main page</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#game">Play</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#rules">Rules</a>
            </li>
          </ul>
          <div id="scoreTable"></div>
        </div>
        `
      },
      canvasWidth: null,
      canvasHeight: null,
      board: null,
      hero: null,
      fireball: null,
      enemies: [],
      boardImg: './assets/img/board.jpg',
      enemyImg: './assets/img/characters/enemy.png',
      bossImg: './assets/img/characters/boss.png',
      heroImg: './assets/img/characters/hero.png',
      fireballImg: './assets/img/fireball.png',
      fireballSound: './assets/audio/fireball.wav',
      enemyDieSound: './assets/audio/enemiesDie.mp3',
      enemyMoveSound: './assets/audio/enemiesMove.mp3',
      heroDieSound: 'sounds/heroDie.mp3',
      score: 0,
      playerScore: null,
      resultData: [],
      enemiesTimer: null,
      gameTimer: null,
      paused: null,
      gameOver: null,
    };
  };

  // обновление состояния
  self.updateState = function() {
    // размер окна
    self.resize();
    // на какой странице буду находится первоначально
    let content = self.settings.links[window.location.hash.slice(1)];
    myView.updateState(content, self.settings.links, self.settings.canvasWidth, self.settings.canvasHeight);
    // задаю условия для страницы с игрой
    if (content === self.settings.links.game) {
      //если инра не на паузе и не пройграна
      if (!self.settings.gameOver && !self.settings.paused) {
        // то спрятать кнопки паузы и продолжить
        myView.hidePauseButton();
        myView.hideResumeButton();
        // отрисовать поле, героя и врагов
        self.gameInit();
        // счет равен 0
        self.settings.score = 0;
        myView.updateScore(self.settings.score);
      }
      // если игра на паузе, но не пройграна то
      if (self.settings.paused && !self.settings.gameOver) {
        // если таймер равен null (после нажатия на кнопку пауза)
        if (self.settings.gameTimer) {
          // то спрятать кнопку паузы и старта, и показать кнопку продолжить
          myView.hidePauseButton();
          myView.showResumeButton();
          myView.hideStartButton();
        } else {
          //если наоборот, то спрятать кнопки паузы и продолжить, и показать кнопку старта
          myView.hidePauseButton();
          myView.showStartButton();
          myView.hideResumeButton()
        }
        // отрисовать поле, героя и врагов, обновить счет
        self.gameInit();
        myView.updateScore(self.settings.score);
      }
      // если проиграли
      if (self.settings.gameOver) {
        // то спрятать кнопки паузы и продолжить, показать кнопку старт
        myView.hidePauseButton();
        myView.hideResumeButton();
        myView.showStartButton();
        //счет равен 0, отрисовать поле, героя и врагов, и обновить счет
        self.settings.score = 0;
        self.gameInit();
        myView.updateScore(self.settings.score);
      }
    }
    // если пользователь вышел со страницы игры
    if (content !== self.settings.links.game) {
      // то поставить игру на паузу и сохранить всех на своих местах
      self.settings.paused = true;
      cancelAnimationFrame(self.settings.gameTimer);
      cancelAnimationFrame(self.settings.enemies);
      clearInterval(self.settings.enemiesTimer);
    }
    //////////////////////////////////////////////////////////////////////////////LEVELS/////////////////////////////////////////////////////
    if (content === self.settings.links.levelGame) {
      alert('We regret. Level tasks are on the rules page');
    }
    if (content === self.settings.links.level1 ||
        content === self.settings.links.level2 ||
        content === self.settings.links.level3 ||
        content === self.settings.links.level4 ||
        content === self.settings.links.level5 ||
        content === self.settings.links.level6
    ) {

      //если инра не на паузе и не пройграна
      if (!self.settings.gameOver) {
        // отрисовать поле, героя и врагов
        self.levelGameInit();
        // счет равен 0
        self.settings.score = 0;
        myView.updateScore(self.settings.score);
        if (self.settings.gameTimer) {
          // то спрятать кнопку паузы и старта, и показать кнопку продолжить
          myView.hideLevelStartButton();
        } else {
          //если наоборот, то спрятать кнопки паузы и продолжить, и показать кнопку старта
          myView.showLevelStartButton();
        }
        // отрисовать поле, героя и врагов, обновить счет
        self.levelGameInit();
        myView.updateScore(self.settings.score);
      }
      // если проиграли
      if (self.settings.gameOver) {
        //показать кнопку старт
        myView.showLevelStartButton();
        //счет равен 0, отрисовать поле, героя и врагов, и обновить счет
        self.settings.score = 0;
        self.levelGameInit();
        myView.updateScore(self.settings.score);
      }
    }
    if (content !== self.settings.links.level1 ||
        content !== self.settings.links.level2 ||
        content !== self.settings.links.level3 ||
        content !== self.settings.links.level4 ||
        content !== self.settings.links.level5 ||
        content !== self.settings.links.level6
    ) {
      // то поставить игру на паузу и сохранить всех на своих местах
      self.settings.paused = false;
      cancelAnimationFrame(self.settings.gameTimer);
      cancelAnimationFrame(self.settings.enemies);
      clearInterval(self.settings.enemiesTimer);
    }
    // если пользователь находится на странице с результатом, то показать его
    if (content === self.settings.links.results) {
      self.getResult();
    }
  };

  // инициализация игры
  self.gameInit = function() {
    // если нет поля, то создать или отрислвать
    if (!self.settings.board) {
      self.createBoard();
    } else {
      self.drawBoard();
    }
    // если нет героя создать или отрисовать
    if (!self.settings.hero) {
      self.createHero();
    } else {
      self.drawHero();
    }
    //если есть герои то отрисовать
    if (self.settings.enemies) {
      myView.drawEnemies(self.settings.enemies)
    }
    //закрыть модалку и отрисовать всё
    myView.closeModal();
    myView.draw();
  };
  //////////LEVEL GAME INIT///////////////////////
  self.levelGameInit = function() {
    // если нет поля, то создать или отрислвать
    if (!self.settings.board) {
      self.createBoard();
    } else {
      self.drawBoard();
    }
    // если нет героя создать или отрисовать
    if (!self.settings.hero) {
      self.createHero();
    } else {
      self.drawHero();
    }
    //если есть герои то отрисовать
    if (self.settings.enemies) {
      myView.drawEnemies(self.settings.enemies)
    }
    //закрыть модалку и отрисовать всё
    myView.draw();
  };

  // цикл игры, проверить на поражение, обновление, изображаю анимация
  self.game = function() {
    self.checkMissions();
    self.checkGameOver();
    self.update();
    self.settings.gameTimer = requestAnimationFrame(self.game);
  };

  /////////////////////////////////////////////////////LEVELS///////////////////////////////////////////////////////////
  self.checkMissions = function() {
    if (self.settings.links.level1) {
      if (self.settings.score === 10) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
    if (self.settings.links.level2) {
      if (self.settings.score === 20) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
    if (self.settings.links.level3) {
      if (self.settings.score === 30) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
    if (self.settings.links.level4) {
      if (self.settings.score === 50) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
    if (self.settings.links.level5) {
      if (self.settings.score === 70) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
    if (self.settings.links.level6) {
      if (self.settings.score === 100) {
        myView.draw();
        console.log('score' + self.settings.score);
        self.settings.hero = null;
        self.settings.fireball = null;
        cancelAnimationFrame(self.settings.gameTimer);
        clearInterval(self.settings.enemiesTimer);
      }
    }
  };

  // оновление игры
  self.update = function () {
    // если игра проиграна и не на паузе
    if (!self.settings.gameOver && !self.settings.paused) {
      // если нет поля создать или нарисовать
      if (!self.settings.board) {
        self.createBoard();
      } else {
        self.drawBoard();
      }
      // запустить врагов
      self.moveEnemies();
      // отрисовать героя
      self.drawHero();
      // отображать пульку
      if (self.settings.fireball) {
        self.moveFireball();
      }
      // отрисовать игру
      myView.draw();
      //если игра проиграна
    } else if (self.settings.gameOver) {
      // отрисовать канвас
      myView.draw();
      // героя и пульку убрать
      self.settings.hero = null;
      self.settings.fireball = null;
      // если игра на паузе
    } else if (self.settings.paused) {
      // если нет поля то создать или отрисоавть
      if (!self.settings.board) {
        self.createBoard();
      } else {
        self.drawBoard();
      }
      // если нет героя то создать или отрисовать
      if (!self.settings.hero) {
        self.createHero();
      } else {
        self.drawHero();
      }
      // отрисовать всё
      myView.draw();
    }
  };

  // начало игры
  self.startGame = function() {
    // игра не пройграна и не на паузе
    self.settings.paused = false;
    self.settings.gameOver = false;
    // проинициализировать игру, цикл игры
    self.gameInit();
    self.game();
    // создавать вргов каждую секунду
    self.settings.enemiesTimer = setInterval(self.createEnemies, 1000);
    // спрятать кнопку старт и показать паузу
    myView.hideStartButton();
    myView.showPauseButton();
  };

  self.levelStartGame = function() {
    // игра не пройграна и не на паузе
    self.settings.paused = false;
    self.settings.gameOver = false;
    // проинициализировать игру, цикл игры
    self.levelGameInit();
    self.game();
    // создавать вргов каждую секунду
    self.settings.enemiesTimer = setInterval(self.createLevelEnemies, 1000);
    // спрятать кнопку старт и показать паузу
    myView.hideLevelStartButton();
  };

  // пауза
  self.pauseGame = function() {
    self.settings.paused = true;
    //остановить врагов и отменить анимацию
    clearInterval(self.settings.enemiesTimer);
    cancelAnimationFrame(self.settings.gameTimer);
    myView.hidePauseButton();
    myView.showResumeButton();
  };

  // продолжить
  self.gameReturn = function() {
    self.settings.paused = false;
    self.settings.gaming = true;
    // продолжить создавать врагов и включить анимацию
    self.settings.enemiesTimer = setInterval(self.createEnemies, 1000);
    self.settings.gameTimer = requestAnimationFrame(self.game);
    myView.hideResumeButton();
    myView.showPauseButton();
  };

  // проигрыш
  self.gameOver = function () {
    self.settings.gameOver = true;
    self.settings.playerScore = self.settings.score;
    // показать модальное окно
    myView.showModal();
    self.checkGameOver();
  };

  // проверка на поражение
  self.checkGameOver = function() {
    // остановить анимацию
    cancelAnimationFrame(self.settings.gameTimer);
    if (self.settings.gameOver) {
      self.settings.enemies = [];
      self.settings.score = 0;
      myView.updateScore(self.settings.score);
      clearInterval(self.settings.enemiesTimer);
      myView.hidePauseButton();
      myView.showStartButton();
    }
  };

  // столкновения
  self.collisions = function(obj1, obj2) {
    // возращает true || false
    return !!(obj1.posX + obj1.width / 2 >= obj2.posX && obj1.posX + obj1.width / 2 <= obj2.posX + obj2.width && obj1.posY + obj1.height / 2 >= obj2.posY && obj1.posY + obj1.height / 2 <= obj2.posY + obj2.height);
  };

  // получаю рандомное число
  self.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  // создаю поле
  self.createBoard = function() {
    let settings = self.settings;
    settings.board = new Image();
    settings.board.src = settings.boardImg;
    // при загрузке => update
    settings.board.onload = function() {
      self.update()
    }
  };

  //нарисовать поле
  self.drawBoard = function() {
    myView.drawBoard(self.settings.board);
  };

  // создать врагов
  self.createEnemies = function() {
    let enemies = self.settings.enemies;
    enemies.push(new Enemy(self.settings.enemyImg));

    let audio = new Audio();
    audio.src = self.settings.enemyMoveSound;
    audio.play();
    for (let i = 0; i < enemies.length; i ++) {
      enemies[i].updateSprite();
    }
  };

    self.createLevelEnemies = function() {
        let enemies = self.settings.enemies;
        enemies.push(new Boss(self.settings.bossImg));

        let audio = new Audio();
        audio.src = self.settings.enemyMoveSound;
        audio.play();
        for (let i = 0; i < enemies.length; i ++) {
            enemies[i].updateSprite();
        }
    };

  //создать героя
  self.createHero = function() {
    self.settings.hero = new Hero(self.settings.heroImg);
    self.drawHero();
  };

  // нарисовать героя
  self.drawHero = function() {
    self.checkBounds();
    self.settings.hero.updateSprite();
    myView.drawHero(self.settings.hero);
  };

  // движение героя
  self.moveHero = function(keycode) {
    if (!self.settings.gameOver && !self.settings.paused) {
      if (keycode == 37 || keycode == 65) {
        self.moveLeft();
      }
      if (keycode == 38 || keycode == 87) {
        self.moveTop();
      }
      if (keycode == 39 || keycode == 68) {
        self.moveRight();
      }
      if (keycode == 40 || keycode == 83) {
        self.moveBottom();
      }
    }
  };

  // движение влево
  self.moveLeft = function() {
    let hero = self.settings.hero;
    hero.sprite = hero.spriteLeft;
    hero.moveLeft();
  };

  // движение вправо
  self.moveRight = function() {
    let hero = self.settings.hero;
    hero.sprite = hero.spriteRight;
    hero.moveRight();
  };

  // движение вверх
  self.moveTop = function() {
    let hero = self.settings.hero;
    hero.sprite = hero.spriteUp;
    hero.moveTop();
  };

  // движение вниз
  self.moveBottom = function() {
    let hero = self.settings.hero;
    hero.sprite = hero.spriteDefault;
    hero.moveBottom();
  };

  //движение героев
  self.moveEnemies = function() {
    let enemies = self.settings.enemies,
        hero = self.settings.hero;
    if (enemies) {
      for (let i = 0; i < enemies.length; i++) {
        let x0 = enemies[i].posX,
            y0 = enemies[i].posY,
            x1 = hero.posX,
            y1 = hero.posY,
            speed = self.settings.score / 1000 + enemies[i].speed,
            way = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        enemies[i].posX += (x1 - x0) * speed / way;
        enemies[i].posY += (y1 - y0) * speed / way;
        enemies[i].updateSprite();
        if (self.collisions(enemies[i], hero)) {
          let audio = new Audio();
          audio.src = self.settings.heroDieSound;
          audio.play();
          self.gameOver();
        }
      }
    }
    myView.drawEnemies(enemies);
  };

  // проверка на выход за пределы канваса
  self.checkBounds = function() {
    let hero = self.settings.hero,
        width = self.settings.canvasWidth,
        height = self.settings.canvasHeight;

    if (hero.posX + hero.width > width) {
      hero.posX = width - hero.width;
    }
    if (hero.posX < 0) {
      hero.posX = 0;
    }
    if (hero.posY < 0) {
      hero.posY = 0;
    }
    if (hero.posY + hero.height > height) {
      hero.posY = height - hero.height;
    }
  };

  //создать пульку
  self.createFireball = function() {
    if (!self.settings.fireball && self.settings.gameTimer) {
      let audio = new Audio();
      audio.src = self.settings.fireballSound;
      audio.play();
      self.settings.fireball = new Fireball(self.settings.fireballImg);
      let fireball = self.settings.fireball,
          hero = self.settings.hero;
      fireball.posX = hero.posX + fireball.width / 3.5;
      fireball.posY = hero.posY + fireball.height / 5;
      fireball.finishPosX = (event.clientX - event.target.getBoundingClientRect().x) - fireball.width / 2;
      fireball.finishPosY = (event.clientY - event.target.getBoundingClientRect().y) - fireball.height / 2;
    }
  };

  // движение пульки
  self.moveFireball = function() {
    let fireball = self.settings.fireball,
        width = self.settings.canvasWidth,
        height = self.settings.canvasHeight;
    if (self.settings.fireball) {
      if (fireball.posX + fireball.width > width || fireball.posX < 0 || fireball.posY + fireball.height > height || fireball.posY < 0) {  // при вылете за пределы канваса - удаляем
        self.settings.fireball = null;
      } else {
        let x0 = fireball.startPosX,
            y0 = fireball.startPosY,
            x1 = fireball.finishPosX,
            y1 = fireball.finishPosY,
            speed = fireball.speed,
            way = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        fireball.posX += (x1 - x0) * speed / way;
        fireball.posY += (y1 - y0) * speed / way;
        if (self.killEnemies()) {
          self.settings.fireball = null;
          self.updateScore();
        } else {
          self.drawFireball();
        }
      }
    }
  };

  // нарисовать пульку
  self.drawFireball = function() {
    self.settings.fireball.updateSprite();
    myView.drawFireball(self.settings.fireball);
  };

  //убить врагов
  self.killEnemies = function() {
    for (let i = 0; i < self.settings.enemies.length; i++) {
      if (self.collisions(self.settings.fireball, self.settings.enemies[i])) {
        let audio = new Audio();
        audio.src = self.settings.enemyDieSound;
        audio.play();
        return self.settings.enemies.splice(i, 1);
      }
    }
  };

  // обновить счет
  self.updateScore = function() {
    self.settings.score += 1;
    myView.updateScore(self.settings.score);
  };

  // изменение размеров окна
  self.resize = function() {
    //window.innerWidth/innerHeight хранят текущий размер окна браузера
    self.settings.canvasWidth = window.innerWidth * 0.8;
    self.settings.canvasHeight = window.innerHeight * 0.7;
    let hero = self.settings.hero,
        enemies = self.settings.enemies,
        fireball = self.settings.fireball;
    if (hero) {
      hero.width = self.settings.canvasWidth / 23;
      hero.height = self.settings.canvasHeight / 17;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].width = self.settings.canvasWidth / 30;
        enemies[i].height = self.settings.canvasHeight / 20;
      }
    }
    if (fireball) {
      fireball.width = self.settings.canvasWidth / 39;
      fireball.height = self.settings.canvasWidth / 39;
    }
  };

  // проверка инпута, если имя больше двух символов, то разрешть сохранить
  self.checkValue = function(input) {
    if (input.value && input.value.length >= 2) {
      myView.activateButton();
    } else {
      myView.deactivateButton();
    }
  };

  // сохранение данных
  self.saveData = function(input) {
    let userInfo = {
      username : input.value,
      userScore : self.settings.playerScore,
    };
    let userStr = JSON.stringify(userInfo);
    localStorage.setItem('user', userStr);
    let name = input.value,
        score = self.settings.playerScore;
    myAppDB.collection('results').doc(`${name.replace(/\s/g, "_")}`).set({
      player: `${name}`,
      score: `${score}`,
    })
    .then(function() {
      console.log('result saved');
     })
     .catch(function(error) {
      console.log('ошибка сохранения результата: ', error);
    });
    myView.clearInput(input);
    myView.closeModal();
  };

  // получаем результат из firestore
  self.getResult = function() {
    self.settings.resultData = [];
    myAppDB.collection('results').get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.settings.resultData.push(doc.data());
            console.log(`${doc.id} => ${doc.data().player} \(${doc.data().score}\)`);
          });
          self.sortD();
          self.printResult();
        });
  };

  // сортируем данные в порядке убывания набранных очков
  self.sortD = function() {
    let result = self.settings.resultData;
    result.sort(function(a, b) {
      return b.score - a.score;
    })
  };

  // распечатываем результат
  self.printResult = function() {
    if (self.settings.resultData.length < 10) {
      for (let i = 0; i < self.settings.resultData.length; i ++) {
        myView.printResult(self.settings.resultData[i]);
      }
    } else {
      for (let i = 0; i < 10; i ++) {
        myView.printResult(self.settings.resultData[i]);
      }
    }
  };

  // закрываем модалку
  self.closeModal = function() {
    myView.closeModal();
  };

  ////////////////////// Классы //////////////////////

  function Enemy(url) {
    switch (self.getRandom(1, 4)) {

      case 1:  // left
        this.posX = 0;
        this.posY = self.settings.canvasHeight * Math.random();
        break;
      case 2:  // top
        this.posX = Math.random() * self.settings.canvasWidth;
        this.posY = 0;
        break;
      case 3:  // bottom
        this.posX = Math.random() * self.settings.canvasWidth;
        this.posY = self.settings.canvasHeight - 30;
        break;
      case 4:  // right
        this.posX = self.settings.canvasWidth - 30;
        this.posY = self.settings.canvasHeight * Math.random();
        break;
    }
    this.sizeX = 40;
    this.sizeY = 35.25;
    this.width = self.settings.canvasWidth / 30;
    this.height = self.settings.canvasHeight / 20;
    this.frameMax = 3;
    this.spriteDefault = new Sprite(url, this.sizeX, 0, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.sprite = this.spriteDefault;
    this.speed = 1;
    this.updateSprite = function () {
      this.sprite.update();
    }
  }

    function Boss(url) {
        switch (self.getRandom(1, 4)) {
            case 1:  // left
                this.posX = 0;
                this.posY = self.settings.canvasHeight * Math.random();
                break;
            case 2:  // top
                this.posX = Math.random() * self.settings.canvasWidth;
                this.posY = 0;
                break;
            case 3:  // bottom
                this.posX = Math.random() * self.settings.canvasWidth;
                this.posY = self.settings.canvasHeight - 30;
                break;
            case 4:  // right
                this.posX = self.settings.canvasWidth - 30;
                this.posY = self.settings.canvasHeight * Math.random();
                break;
        }
        this.sizeX = 100;
        this.sizeY = 100;
        this.width = self.settings.canvasWidth / 10;
        this.height = self.settings.canvasHeight / 5;
        this.frameMax = 3;
        this.spriteDefault = new Sprite(url, this.sizeX, 0, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
        this.sprite = this.spriteDefault;
        this.speed = 1;
        this.updateSprite = function () {
            this.spriteDefault.update();
        }
    }

  function Hero(url) {
    this.sizeX = 33;
    this.sizeY = 47;
    this.width = self.settings.canvasWidth / 37;
    this.height = self.settings.canvasHeight / 17;
    this.posX = self.settings.canvasWidth / 2 - this.width / 2;
    this.posY = self.settings.canvasHeight / 2 - this.height / 2;
    this.speed = 5;
    this.frameMax = 3;
    this.spriteDefault = new Sprite(url, this.sizeX, 0, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.spriteLeft = new Sprite(url, this.sizeX, this.sizeY, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.spriteRight = new Sprite(url, this.sizeX, this.sizeY * 2, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.spriteUp = new Sprite(url, this.sizeX, this.sizeY * 3, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.sprite = this.spriteDefault;
    this.updateSprite = function () {
      this.sprite.update();
    };
    this.moveLeft = function () {
      this.posX -= this.speed;
    };
    this.moveRight = function () {
      this.posX += this.speed;
    };
    this.moveTop = function () {
      this.posY -= this.speed;
    };
    this.moveBottom = function () {
      this.posY += this.speed;
    }
  }

  function Fireball(url) {
    this.sizeX = 133.8;
    this.sizeY = 134.25;
    this.width = self.settings.canvasWidth / 39;
    this.height = this.width;
    this.startPosX = self.settings.hero.posX;
    this.startPosY = self.settings.hero.posY;
    this.posX = null;
    this.posY = null;
    this.finishPosX = null;
    this.finishPosY = null;
    this.speed = 10;
    this.frameMax = 6;
    this.sprite = new Sprite(url, this.sizeX, 0, this.frameMax, this.sizeX, this.sizeY, this.width, this.height);
    this.updateSprite = function () {
      this.sprite.update();
    }
  }

  function Sprite(url, startX, startY, frameMax, frameWidth, frameHeight, width, height) {
    this.img = new Image();
    this.img.src = url;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.width = width;
    this.height = height;
    this.interval = 0;
    this.frame = 0;
    this.frameMax = frameMax;
    this.update = function () {
      this.interval++;
      if (this.interval % 12 == 0) {
        this.frame++;
        if (this.frame > this.frameMax - 1) {
          this.frame = 0
        }
      }
    }
  }

}
