//let cp = ["#fb6107","#f3de2c","#7cb518","#5c8001","#fbb02d"]
//let cp = ["#5fad56","#f2c14e","#f78154","#4d9078","#b4436c"]
//let cp = ["#ff7b00","#ff8800","#ff9500","#ffa200","#ffaa00","#ffb700","#ffc300","#ffd000","#ffdd00","#ffea00"]
//let cp = ["#007f5f","#2b9348","#55a630","#80b918","#aacc00","#bfd200","#d4d700","#dddf00","#eeef20","#ffff3f"] //LemonLime
//let cp = ["#10451d","#155d27","#1a7431","#208b3a","#25a244","#2dc653","#4ad66d","#6ede8a","#92e6a7","#b7efc5","#ff0080"] //FairyGreen
//let cp = ["#fffae5","#fff6cc","#fff2b2","#ffee99","#ffe97f","#ffe566","#ffe14c","#ffdd32","#ffd819","#ffd400"]
//let cp = ["#d40000","#e12c2c","#ffa500","#ffd700","#ffdf00"] //Red Autumn
//let cp = ["#efefef","#ddd6d3","#b5aeab","#718879","#2e4d43"]  //Alien
let c1, c2
let lerp_decay
let lerp_amount = 0
let TABLE_PARAM = false;

function jungle(bg, max_height, table = false){
    TABLE_PARAM = table
    mode = 0
    vb.background(bg)
    vb.strokeWeight(.5)
    vineyard(max_height)
}

function vineyard(max_height){
    let threshold = VINE_DENSITY_THRESHOLD
    if (TABLE_PARAM)
      threshold = random(.18,.23)
    for (let x = 0; x <= vb.width; x++){
        if (random(1) < threshold){
            vb.push()
              vine(vb,  [x,0],[x,noise(x)*max_height])
            vb.pop()
        }
    }
}

function vine(v, origin = [0,0], end = [0,400]) {
    v.noFill()
    v.translate(origin[0],origin[1])
    
    let coords = [] //Keep track of points on curve
    
    //Plan curve
    let vine_length = end[1] - origin[1]
    let x = 0
    let y = 0

    let x_range = 4 //HARD CODED
    let y_range = 5 //HARD CODED

    if (COLORED_TOPS_PARAM)
      c1 = color(TOP_COLOR)
    else
      c1 = color(PALLETE_PARAM[Math.floor(Math.random()*PALLETE_PARAM.length)])
    c2 = color(PALLETE_PARAM[Math.floor(Math.random()*PALLETE_PARAM.length)])
    lerp_decay = 1 / (vine_length / 10)
    lerp_amount = 0
    
    //Draw curve
    v.beginShape()
    v.curveVertex(x,y)
    
    while (y < vine_length){
      x = random(-x_range,x_range)
      append(coords,[x,y])
      v.curveVertex(x,y)
      y = min(y + random(y_range,2*y_range), vine_length)
      //print("point")
    }
    v.curveVertex(x,vine_length)
    v.endShape() 
    
    let z = 0
    //Draw leafs
    for (let i = 0; i < coords.length; i++){
      if (i == 0 && random(1) > 0.3)
        continue;
      leaf(v, origin = coords[i], size = vine_length/16, angle = random(-90,90), z = z)
      lerp_amount += lerp_decay
    }
  }
  
  /*DRAW LEAF
    ** Anchors: x1,y1  &  x4,y4
    ** Controls:  x2,y2  &  x3,y3
  */
  function leaf(v, origin = [0,0], size = 100, angle = 0, z = 0) {
    //v.fill(random(0,255), random(50,255), 0, 255)
    let c = lerpColor(c1,c2,lerp_amount)
    v.fill( c )

    //HARDCODING
    size = 5
    //
    
    
    v.push();
      v.translate(origin[0],origin[1])
      v.rotate(angle)
  
      //Anchor points & control points
      let ap1 = [0,0]
      let ap2 = [0, 0 + size] 
      let cp1 = [0.5 * size, 0.0]
      let cp2 = [0.3 * size, 0.75 * size]
      v.beginShape()
      v.bezier(ap1[0],ap1[1],cp1[0],cp1[1],cp2[0],cp2[1],ap2[0],ap2[1])
      v.bezier(ap1[0],ap1[1],-cp1[0],cp1[1],-cp2[0],cp2[1],ap2[0],ap2[1])
      v.endShape()
    v.pop();
  }
