let cpo = ["#ff0000","#ff8000", "#ffff00","#80ff00","#00ff00", "#00ff80",
              "#00ffff","#0080ff", "#0000ff","#8000ff","#ff00ff", "#ff0080"]

var LEMON_LIME = ["#007f5f","#2b9348","#55a630","#80b918","#aacc00","#bfd200","#d4d700","#dddf00","#eeef20","#ffff3f"] //LemonLime
var LEMON_LIME_CT = ["#ff0000","#ff8000","#ffff00","#00ff00"]

var FAIRY_GREEN = ["#10451d","#155d27","#1a7431","#208b3a","#25a244","#2dc653","#4ad66d","#6ede8a","#92e6a7","#b7efc5","#ff0080"] //FairyGreen
var FAIRY_GREEN_CT = ["#ff0000", "#ffff00","#00ff00","#ffffff"]

var RED_AUTUMN = ["#d40000","#e12c2c","#ffa500","#ffd700","#ffdf00"] //Red Autumn
var RED_AUTUMN_CT = ["#00ff00", "#ffff00","#ffffff"]

var ALIEN = ["#efefef","#ddd6d3","#b5aeab","#718879","#2e4d43"]  //Alien
var ALIEN_CT = ["#ff0000", "#ffff00","#ffffff"]

var PALLETE_PARAM;
var COLORED_TOPS_PARAM;
var TOP_COLOR;
var GRAD_COLOR = "#FFFFFF";

var JUNGLE_DENSITY_PARAM;
var JUNGLE_DENSITY_THRESHOLD;

var VINE_DENSITY_PARAM;
var VINE_DENSITY_THRESHOLD;

var PILLAR_BOX_PARAM = false;
var HANOI_TOWER_PARAM = false;

var canvas;
var gb; //grain buffer
var jb; //junglegym buffer
var bgb; //background gradient buffer

var colored_tops = false;

function START() {
   GRAD_COLOR = "#FFFFFF";

   PILLAR_BOX_PARAM = false;
   HANOI_TOWER_PARAM = false;

   colored_tops = false;
}

function INITIALIZE_PARAMS() {
  //COLORS:
  if (random(1) > .5){
    COLORED_TOPS_PARAM = true
  }
  let r = random(1)
  if (r < .4){
    PALLETE_PARAM = FAIRY_GREEN
    if (COLORED_TOPS_PARAM)
      TOP_COLOR = FAIRY_GREEN_CT[Math.floor(Math.random()*FAIRY_GREEN_CT.length)]
  } else if (r < .7){
    PALLETE_PARAM = LEMON_LIME
    if (COLORED_TOPS_PARAM)
      TOP_COLOR = LEMON_LIME_CT[Math.floor(Math.random()*LEMON_LIME_CT.length)]
  } else if (r < .9){
    PALLETE_PARAM = RED_AUTUMN
    if (COLORED_TOPS_PARAM)
      TOP_COLOR = RED_AUTUMN_CT[Math.floor(Math.random()*RED_AUTUMN_CT.length)]
  } else {
    PALLETE_PARAM = ALIEN
    if (COLORED_TOPS_PARAM)
      TOP_COLOR = ALIEN_CT[Math.floor(Math.random()*ALIEN_CT.length)]
  }

  //Jungle Density
  if (random(1) < .75){
    JUNGLE_DENSITY_PARAM = "COATED"
    JUNGLE_DENSITY_THRESHOLD = random(.98,1)
  } else {
    JUNGLE_DENSITY_PARAM = "SPARSE"
    JUNGLE_DENSITY_THRESHOLD = random(.1,.5)
  }

  //Vine Density
  if (random(1) < .7){
    VINE_DENSITY_PARAM = "JUNGLE"
    VINE_DENSITY_THRESHOLD = random(.75,.9)
  } else {
    VINE_DENSITY_PARAM = "GARDEN"
    VINE_DENSITY_THRESHOLD = random(.1,.3)
  }

  if (random(1) < .35)
    HANOI_TOWER_PARAM = true
  if (random(1) < .75)
    PILLAR_BOX_PARAM = true
}

function setup() { 
  canvas = createCanvas(window.innerHeight, window.innerHeight, "webgl");
  imageMode("center")

  //for (i = 0; i < 100; i++){
    background(255)

    START()
    INITIALIZE_PARAMS()
  
    push()
      bgb = createGraphics(1000,1000)
      if (random(1) < .5) 
        bg_gradient()
    pop()
  
    push()
      jb = createGraphics(1000,1000,"webgl")
      junglegym()
    pop()
  
    push()
      gb = createGraphics(1000,1000)
      grain()
    pop()
  
    //saveCanvas()
  //}
}
