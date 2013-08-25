var Game = {
  setup: function(){
	  
  
	  var c = document.getElementById("joy");
	
	
	  this.engine = new Joy.Engine({
	    canvas: c,
	    debug: true
	  });
	  
	  this.engine.createScene(function(scene){
		  Joy.Behaviour.define('BouncyBehaviour', {
			    UPDATE: function () {
			      this.position.x += this.speed * this.hDir * Joy.deltaTime;
			      this.position.y += this.speed * this.vDir * Joy.deltaTime;
			      
			      if ((this.position.x + this.width/2) >= Game.engine.width) {
			        this.hDir = this.hDir-1;
			      } else if (this.position.x - this.width/2 <= 0) {
			        this.hDir = this.hDir+1;
			      }
			
			      if ((this.position.y + this.height/2) >= Game.engine.height) {
			        this.vDir = this.vDir-1;
			      } else if (this.position.y - this.height/2 <= 0) {
			        this.vDir = this.vDir+1;
			      }
			    }
			});
		  
		  var background = new Joy.Rect({
		  		position: scene.viewport.position,
		  		color: '#62bee0',
		  		width: Game.engine.width,
		  		height: Game.engine.height
		  });
	  
	  
		  background.bind(Joy.Events.CLICK, function(e) {
		  	  var that = this;
		  	  this.locked = true;
			  var ballPosition = scene.ball.position.clone();
			  
			  console.log(e);
			  var direction = new Joy.Vector2d(e.x, e.y).subtract(ballPosition).normalize();
			  console.log(direction);
			  scene.ball.hDir = direction.x;
			  scene.ball.vDir = direction.y;
			  scene.ball.speed = 2
			  scene.ball.behave('BouncyBehaviour');
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
			
			scene.ball = new Joy.Sprite({
				 	x: this.width/2,
				 	y: this.height/2, 
				 	src: spriteUrl})
				 	.bind('load', function() {
			        // Change pivot to center
			        this.pivot.x = (this.width / 2);
			        this.pivot.y = (this.height / 2);
				});
			scene.addChild(scene.ball);
		   
	  });
	  
	  
  },
 
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