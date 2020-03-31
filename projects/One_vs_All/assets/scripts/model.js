function Model() {
    let myView,
        self = this; 
  
    self.init = function (view) {
      myView = view;
      self.settings = {
        links: {
          main: `
          <div id="main" class="d-flex flex-column justify-content-center align-items-center">
            <h1>One vs All</h1>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <a href="#game" id="start">Play</a>
                <a href="#rules">Rules</a>
                <a href="#results">Results</a>
            </div>
            
          </div>
          `,
          game: `
          <div id="game">
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
            <button id="start" class="btn btn-warning">start</button>
            <button id="pause" class="btn btn-warning">pause</button>
            <button id="resume" class="btn btn-warning">resume</button>
            <div id="modal" class="modal" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                  <p>Enter your name to save your record.</p>
                    <input id="playerName"></input>
                  </div>
                  <div class="modal-footer">
                    <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button id="save" type="button" class="btn btn-warning">Save</button>
                  </div>  
                </div>
              </div>
            </div>
          </div>
          `,
          rules: `
          <div id="rules">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" href="#main">Main</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#game">Game</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#results">Results</a>
              </li>
            </ul>
            <div class="h-100 d-flex align-items-center justify-content-center">
              <p>The controls are arrow keys and the letters AWDS, the shot is carried out by clicking the left mouse button. <br> The game is about survival: the more enemies you shoot, the higher you will be in the high score table. <br> One kill one point.<br>
              <strong>Good Luck!</strong></p>
            </div>
          </div>
          `,
          results: `
          <div id="results">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" href="#main">Main</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#game">Game</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#rules">Rules</a>
              </li>
            </ul>
            <div id="scoreTable"></div>
          </div>
          `
        },
        canvasWidth : null,
        canvasHeight : null,
        hero : null,
        heroImg : './assets/img/characters/hero.png',
        heroSound : './assets/audio/heroMove.mp3',
        field : null,
        fieldImg : './assets/img/field.png',
        fireball : null,
        fireballImg : './assets/img/fireball.png',
        fireballSound : './assets/audio/fireball.wav',
        paused : null,
        gameTimer : null,
      };
    }
    // обновление состояния
    self.updateState = function() {  // обновление состояния
      // размеры окна
      self.resize();
      // вырезаю первую страницу, тк буду на ней находиться при входе
      let content = self.settings.links[window.location.hash.slice(1)];
      myView.updateState(content, self.settings.links, self.settings.canvasWidth, self.settings.canvasHeight);
      // если нахожусь в хэшэ игры, то выполнить след условия
      if(content === self.settings.links.game) {
        // если игра не на паузе, то спрятать кнопки паузы и продолжит, инициальзировать игру
        if(!self.settings.paused) {
          myView.hidePauseButton();
          myView.hideResumeButton();
          self.gameInit();
        }
        if(self.settings.paused) {
          if(self.settings.gameTimer) {
            myView.hidePauseButton();
            myView.showResumeButton();
            myView.hideStartButton();
          } else {
            myView.hidePauseButton();
            myView.hideStartButton();
            myView.hideResumeButton();
          }
          self.gameInit();
          myView.updateState();
        }
      }
      if(content !== self.settings.links.game) {
        self.settings.paused = true;
        cancelAnimationFrame(self.settings.gameTimer);
      }
    }

    // инициализирую игровые объекты
    self.gameInit = function() {  
      // если нет поля, то создать
      if (!self.settings.field) {
        self.createField();   
      } else {
        self.drawField();    
      }
      // если нет героя, то создать
      if (!self.settings.hero) {
        self.createHero();
      } else {
        self.drawHero();
      }
      // отрисовать канвас
      myView.draw();
    }

    // цикл игры
    self.game = function() { 
      self.update();
      self.settings.gameTimer = requestAnimationFrame(self.game);
    }

    // обновление состояния игры
    self.update = function () {  
      if (!self.settings.paused) {  
        if (!self.settings.field) {
          self.createField();
        } else {
          self.drawField();
        }
        self.drawHero();
        if (self.settings.fireball) {
          self.moveFireball();
        }
        myView.draw();
      }
    }

    //клик на старт
    self.startGame = function() {
      self.settings.paused = false;
      self.gameInit()
      self.game();
      myView.hideStartButton();
      myView.showPauseButton();
    }

    //клик на стоп
    self.pauseGame = function() { 
      self.settings.paused = true;
      cancelAnimationFrame(self.settings.gameTimer);
      myView.hidePauseButton();
      myView.showResumeButton();
    }
    //клик на продолжить
    self.resumeGame = function() {  
      self.settings.paused = false;
      self.settings.gameTimer = requestAnimationFrame(self.game);
      myView.hideResumeButton();
      myView.showPauseButton();
    }

    // создаю игровое поле
    self.createField = function() {
      let settings = self.settings;
      settings.field = new Image();
      settings.field.src = settings.fieldImg;
      settings.field.onload = function() {
        self.update()
      }
    }
    // отображаю поле
    self.drawField = function() {
      myView.drawField(self.settings.field);
    }

    //создаю героя
    self.createHero = function() {  
      self.settings.hero = new Hero(self.settings.heroImg);
      self.drawHero();
    }
    //отображаю героя
    self.drawHero = function() {  
      self.checkBounds();
      self.settings.hero.updateSprite();
      myView.drawHero(self.settings.hero);
    }

    //движения героя
    self.moveHero = function(keycode) {
      if (!self.settings.paused) {
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
    }

    //движние влево
    self.moveLeft = function() {
      let hero = self.settings.hero;
      hero.sprite = hero.spriteLeft;
      hero.moveLeft();
    }
    //движние вверх
    self.moveRight = function() {
      let hero = self.settings.hero;
      hero.sprite = hero.spriteRight;
      hero.moveRight();
    }
    //движние вправо
    self.moveTop = function() {
      let hero = self.settings.hero;
      hero.sprite = hero.spriteUp;
      hero.moveTop();
    }
    //движние вниз
    self.moveBottom = function() {
      let hero = self.settings.hero;
      hero.sprite = hero.spriteDefault;
      hero.moveBottom();
    }

    //выход за канвас
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
    }

    self.createFireball = function() {
      if (!self.settings.fireball && self.settings.gameTimer) {
        let audio = new Audio();
        audio.src = self.settings.fireballSound;
        audio.play();
        self.settings.fireball = new Fireball(self.settings.fireballImg);
        let fireball = self.settings.fireball,
            hero = self.settings.hero;
        fireball.posX = hero.posX + fireball.width / 3;
        fireball.posY = hero.posY + fireball.height / 3;
        fireball.finishPosX = (event.clientX - event.target.getBoundingClientRect().x) - fireball.width / 2;
        fireball.finishPosY = (event.clientY - event.target.getBoundingClientRect().y) - fireball.height / 2;
      }
    }

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
          self.drawFireball();
        }
      }
    }

    self.drawFireball = function() {  // отрисовка
      self.settings.fireball.updateSprite();
      myView.drawFireball(self.settings.fireball);
    }

    // изменение размера окна Игры
    self.resize = function() { 
      self.settings.canvasWidth = 1300;
      self.settings.canvasHeight = 700;
      let hero = self.settings.hero,
          fireball = self.settings.fireball;
      if (hero) {
        hero.posX = self.settings.canvasWidth / 2 - hero.width / 2;
        hero.posY = self.settings.canvasHeight / 2 - hero.height / 2;
        hero.width = self.settings.canvasWidth / 37;
        hero.height = self.settings.canvasHeight / 17;
      }
      if (fireball) {
        fireball.width = self.settings.canvasWidth / 39;
        fireball.height = fireball.width;
      }
    }

/////////////////////////////////////////////// SPRITES ///////////////////////////////////////////////
    function Hero(url) {
      this.sizeX = 33;
      this.sizeY = 47;
      this.width = self.settings.canvasWidth / 37;
      this.height = self.settings.canvasHeight / 17;
      this.minWidth = 40;
      this.minHeight = 50;
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
      }
      this.moveLeft = function () {
        this.posX -= this.speed;
      }
      this.moveRight = function () {
        this.posX += this.speed;
      }
      this.moveTop = function () {
        this.posY -= this.speed;
      }
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
      this.speed = 15;
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