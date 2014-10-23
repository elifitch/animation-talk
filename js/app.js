function canvasAnim(){
  // RequestAnimFrame: a browser API for getting smooth animations
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame     ||
      window.webkitRequestAnimationFrame    ||
      window.mozRequestAnimationFrame       ||
      window.oRequestAnimationFrame         ||
      window.msRequestAnimationFrame        ||
      function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  // Initializing the canvas
  // Using native JS but could use jQuery or anything
  var section = $('.particle');
  var canvas = $('<canvas></canvas>').appendTo(section)[0];
  var gradient = $('<div class="gradient-overlay"></div>').appendTo(section)[0];

  // canvas.width         = window.innerWidth * 2;
  // canvas.height        = header.outerHeight() * 2;
  canvas.style.width = window.innerWidth+"px";
  canvas.style.height = $(window).outerHeight()*.75+"px";
  canvas.style.display = 'block';

  // Initialize the context
  var ctx = canvas.getContext("2d");

  // Set width and height to full window
  var W = window.innerWidth * 2, H = $(window).outerHeight()*1.5;
  canvas.width = W;
  canvas.height = H;

  // Some variables for later use
  var particleCount = Math.min((window.innerWidth/2),400),
      particles = [],
      minDist = 120,
      dist;

  // Function to make canvas black
  function paintCanvas() {
    // Set color to pink
    // ctx.fillStyle = "rgba(234,46,73,1)";
    ctx.fillStyle = "#F5F5F5";
    
    // Rectangle of white from Top Left (0,0) to Bottom Right (W,H)
    ctx.fillRect(0,0,W,H);
  }

  // Now make some particles that attract each other when near
  // Will set min. distance for it and draw a line between them when near

  // Attraction is done by increasing velocity when near each other

  // Make a function that will act as a class for the particles

  function Particle() {
    // Position them randomly
    // Math.random() generates random between 0 and 1, so we multiply this by canvas width and height
    this.x = Math.random() * W;
    // this.y = Math.random() * H;
    this.y = (Math.random()*800) + H;
    
    // Also need to set some velocity
    this.vx = -1 + Math.random() * 2;
    this.vy = -3 + Math.random() * 2;
    
    // Now the size of the particles
    this.radius = Math.random() * 0;
    
    // Now draw the particles, use basic fillStyle and start the path
    // use 'arc' function to draw circle, uses x + y coordinates and then radius, then start angle, and end angle, then boolean
    // False for clockwise
    this.draw = function() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      
      // Fill the arc we just made
      ctx.fill();
    }
  }

  // Push the particles into an array
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Function to draw everything on canvas that we'll use when we animate whole scene
  function draw() {
    // Call the painCanvas function so it gets repainted each frame
    paintCanvas();
    
    // Call function to draw particles using a loop
    for (var i = 0; i < particles.length; i++) {
      p = particles[i];
      p.draw();
    }
    
    // Call update function
    update();
  }

  // Give life to the particles
  function update() {
    // This function will update evry particles position according to their velocities
    for (var i = 0; i < particles.length; i++) {
      p = particles[i];
      
      // change velocities
      p.x += p.vx;
      p.y += p.vy
      
      // We dont want them to leave area so only change position whent they touch walls
      if(p.x + p.radius > W)
        p.x = p.radius;
      
      else if(p.x - p.radius < 0) {
        p.x = W - p.radius;
      }
      
      if(p.y + p.radius > H+800)
        p.y = p.radius;
        // p.y = (Math.random()*800) + H;
      
      else if(p.y - p.radius < 0) {
        p.y = H - p.radius;
      }
      
      // Now they need to draw lines between each other, so check distance then compare to minDistance
      // We will have another loop so it is compared to everyparticles apart from itself
      for(var j = i + 1; j < particles.length; j++) {
        p2 = particles[j];
        distance(p, p2);
      }
      
    }
  }

  // Distance calculator between particles
  function distance(p1, p2) {
    var dist,
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
    dist = Math.sqrt(dx*dx + dy*dy);
    
    // Draw line if distance is smaller than minDistance
    if(dist <= minDist) {
      
      // Draw the line
      ctx.beginPath();
      ctx.strokeStyle = "#35BF26";
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      
    }  
  }

  // Start main animation loop using requestAnimFrame
  function animloop() {
    draw();
    requestAnimFrame(animloop);
  }

  animloop();
}

//when resizing window, shit gets real slow...
// $(window).on('load resize', function(){
//   $('canvas').remove();
//   $('.gradient-overlay').remove();
//   particles = [];
//   canvasAnim();
// });
particles = [];
canvasAnim();



// //animating gradient
// (function(){
//   var start = null;
//   // var element = document.getElementById("SomeElementYouWantToAnimate");
//   var element = $('.animated-gradient')[0]
//   var rot = 0;
//   function step() {
//     rot++
//     element.style.background = 'linear-gradient('+rot/10+'deg, #2980b9 0%,#9B59B6 100%)'
//     window.requestAnimationFrame(step);
//   }

//   window.requestAnimationFrame(step);
// }())


//add to left container
for(var i=0; i<=100; i++) {
  $('.left-container').append('<div class="left"></div>');
  $('.translate-container').append('<div class="translate"></div>');
}