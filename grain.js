//let grain_pal = ["#ffff00","#80ff00","#00ff80","#8000ff","#ff00ff", "#ff0080"]
let grain_pal = ["#ff0000","#ff8000", "#ffff00","#80ff00","#00ff00", "#00ff80","#00ffff","#0080ff", "#0000ff","#8000ff","#ff00ff", "#ff0080"]
//grain_pal = ["#FFFFFF","#FFFFFF","#00ff80","#8000ff","#ff00ff", "#000000"]

function grain() {
  let ccc = false
    if (random(1) <= .5){
      ccc = true
      if (random(1) < .5)
        grain_pal = ["#ff0000","#ff8000", "#ffff00","#80ff00","#00ff00", "#00ff80","#00ffff","#0080ff", "#0000ff","#8000ff","#ff00ff", "#ff0080"]
      else
      grain_pal = ["#FFFFFF","#FFFFFF","#00ff80","#8000ff","#ff00ff", "#000000"]
    }

    for (let y = 0; y <= gb.height; y++)
      for (let x = 0; x <= gb.width; x++){
        if (ccc) gb.set(x,y,color(grain_pal[Math.floor(Math.random()*grain_pal.length)]))
        else gb.set(x,y,random(255))
      }
    gb.updatePixels()

    blendMode(SUBTRACT)
    tint(50)
    image(gb, 0, 0, width, height)
}