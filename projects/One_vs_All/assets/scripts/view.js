function View() {
    let myViewContainer,
        settings = {};
    
    this.init = function(container) {
      myViewContainer = container;
      settings = {
        canvas : null,
        context : null,
      }
    }
  
    this.updateState = function(content, links, width, height) {
      myViewContainer.innerHTML = content || links.main;
      if (content === links.game) {
        settings.canvas = document.getElementById('canvas');
        settings.context = settings.canvas.getContext('2d');
        settings.context.canvas.width = width;
        settings.context.canvas.height = height;
      }
    }

    this.showStartButton = function() {
      myViewContainer.querySelector('#start').style.display = 'block';
    }
  
    this.hideStartButton = function() {
      myViewContainer.querySelector('#start').style.display = 'none';
    }
  
    this.showPauseButton = function() {
      myViewContainer.querySelector('#pause').style.display = 'block';
    }
  
    this.hidePauseButton = function() {
      myViewContainer.querySelector('#pause').style.display = 'none';
    }
  
    this.showResumeButton = function() {
      myViewContainer.querySelector('#resume').style.display = 'block';
    }
  
    this.hideResumeButton = function() {
      myViewContainer.querySelector('#resume').style.display = 'none';
    }

    this.drawField = function(field) {
      settings.context.drawImage(field, 0, 0, settings.canvas.width, settings.canvas.height);
    }
    
    this.drawHero = function(hero) {
      settings.context.drawImage(hero.sprite.img, hero.sprite.frame * hero.sprite.frameWidth, hero.sprite.startY, hero.sprite.frameWidth, hero.sprite.frameHeight, hero.posX, hero.posY, hero.width, hero.height, hero.sprite.frameWidth, hero.sprite.frameHeight);
    }

    this.drawFireball = function(fireball) {
      settings.context.drawImage(fireball.sprite.img, fireball.sprite.frame * fireball.sprite.frameWidth, fireball.sprite.startY, fireball.sprite.frameWidth, fireball.sprite.frameHeight, fireball.posX, fireball.posY, fireball.width, fireball.height, fireball.sprite.frameWidth, fireball.sprite.frameHeight);
    }

    this.draw = function() {
      settings.context.drawImage(settings.canvas, 0, 0, settings.canvas.width, settings.canvas.height)
    }
}