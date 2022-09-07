function bg_gradient() {
    let bc = color(PALLETE_PARAM[Math.floor(Math.random()*PALLETE_PARAM.length)])
    let tc = color(PALLETE_PARAM[Math.floor(Math.random()*PALLETE_PARAM.length)])
    if (random(1) < .6 || PALLETE_PARAM == RED_AUTUMN)
        bc = color("#FFFFFF")
    while (tc == bc)
        tc = color(PALLETE_PARAM[Math.floor(Math.random()*PALLETE_PARAM.length)])
    bgb.strokeWeight(2)
    for (let y = 0; y <= bgb.height; y++){
        bgb.stroke(lerpColor(bc,tc,y/bgb.height))
        bgb.line(0,y,bgb.width,y)
    }

    if (random(1) > .9)
        GRAD_COLOR = tc

    if (random(1) < .9)
        tint(255,50)
    image(bgb, 0, 0, width, height)
}