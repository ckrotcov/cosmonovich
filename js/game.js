var Game = {
  setup: function(){
	  
  
	  var c = document.getElementById("joy");
	
	
	  this.engine = new Joy.Engine({
	    canvas: c,
	    debug: true
	  });
	  scene = this.engine.createScene();
	  
	  var background = new Joy.Rect({
		  position: scene.viewport.position,
		  color: '#62bee0',
		  width: this.engine.width,
		  height: this.engine.height
		});
	  
	  
	  background.bind(Joy.Events.CLICK, function(e) {
	  	  var that = this;
	  	  this.locked = true;
		  var ballPosition = Game.ball.position.clone();
		  
		  //console.log(ballPosition);
		  var direction = ballPosition.subtract(new Joy.Vector2d(e.x, e.y)).normalize();
		  console.log(direction);
		  
		  /*
		  new Joy.Tween(Game.ball.position).to({
			x: e.x,
			y: e.y  
		  }).easing(Joy.TweenManager.Easing.Sinusoidal.InOut).
		  	start().onComplete(function(){});
		  */
		});
		
		
	  
	  scene.addChild(background);
	  
	  var spriteUrl = "/assets/ball.png";
	  
	  this.ball = new Joy.Sprite({
	  	 	x: this.engine.width/2,
	  	 	y: this.engine.height/2, 
	  	 	src: spriteUrl})
	  	 	.bind('load', function() {
	            // Change pivot to center
	            this.pivot.x = (this.width / 2);
	            this.pivot.y = (this.height / 2);
			}).bind(Joy.Events.UPDATE, function(e){
				
				this.rotate(this.rotation+1);
				
			});
	  scene.addChild(this.ball);
  }
};


Joy.Behaviour.define('GameMouseBehaviour', {
    INIT: function () {
      // Add button behaviour, to handle MOUSE_OVER and MOUSE_OUT events
      this.behave(Joy.Behaviour.Button);
    },

    CLICK: function(e) {
      new Joy.Tween(this.position).to({
        x: Math.random() * (engine.width - this.width),
        y: Math.random() * (engine.height - this.height)
      }).easing(Joy.TweenManager.Easing.Sinusoidal.InOut).start();
    }
  });