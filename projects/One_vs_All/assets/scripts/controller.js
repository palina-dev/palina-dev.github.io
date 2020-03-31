function Controller() {
  let myModel,
      myContainer,
      keys,
      self = this;

  this.init = function(model, container) {
    myModel = model;
    myContainer = container;
    keys = {};

    window.addEventListener('hashchange', self.updateState);  // обновление состояния при изменении location.hash
    window.addEventListener('load', self.updateState);  // обновление состояния при загрузке
    window.addEventListener('resize', self.resize);  // изменение размеров браузера
    window.addEventListener('click', self.setEventTarget);  // забираем event.target при клике
  }

  self.updateState = function() {   
    myModel.updateState();
  }

  self.setEventTarget = function() {
    if(this.event.target === myContainer.querySelector('#start')) {
      myModel.startGame();
      window.addEventListener('keydown', self.keyDown);
      window.addEventListener('keyup', self.keyUp);
    }
    if(this.event.target === myContainer.querySelector('#pause')) {
      myModel.pauseGame();
      window.removeEventListener('keydown', self.keyDown);
      window.removeEventListener('keyup', self.keyUp);
    }
    if(this.event.target === myContainer.querySelector('#resume')) {
      myModel.resumeGame();
      window.addEventListener('keydown', self.keyDown);
      window.addEventListener('keyup', self.keyUp);
    }
    if (this.event.target === myContainer.querySelector('#canvas')) {
      self.shot();
    }
  }

  self.shot = function() {
    myModel.createFireball();
  }

  //Событие keydown происходит при нажатии клавиши, а keyup – при отпускании.

  self.keyDown = function() {
    // ставим флаг, если нажата какая-нибудь клавиша
    keys[event.keyCode] = 1;  
  }

  self.keyUp = function() {
    // удаляем флаг при keyup
    delete (keys[event.keyCode]);  
  }

  self.moveHero = function(keycode) {
    myModel.moveHero(keycode);
  }

  setInterval(function() {  // если в объекте keys есть нажатые клавиши, запускаем в интервале функцию движения героя
    for (let keycode in keys) {
      self.moveHero(keycode);
    }
  }, 20);

}
