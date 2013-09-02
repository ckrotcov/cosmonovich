var Game = {
  setup: function(){
	  
	  var J = Joy;
	  var c = document.getElementById("joy");
	  c.webkitRequestFullScreen();
	
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
		  		width: Game.engine.width,
		  		height: Game.engine.height
		  });
		
		
		 var tileset = new J.Tileset({
			src: "/assets/tiles.png",
			width: 32,
			height: 32
		 });
		 console.log(tileset);
		 console.log(tileset instanceof Joy.Tileset);
		 
		 var tilemap = new Joy.Tilemap({
		   tileset: tileset,
		   lines: 25,
		   columns: 25,
		   data: [
		    22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
			22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22
		   ]
		 });
	     
		 
		 
		  tilemap.bind(Joy.Events.CLICK, function(e) {
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
		
			scene.addChild(tilemap);
	  
			//scene.addChild(background);
	  
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