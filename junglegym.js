var rainbow_cp = ["#ff0000","#ff8000", "#ffff00","#80ff00","#00ff00", "#00ff80", "#00ffff","#0080ff", "#0000ff","#8000ff","#ff00ff", "#ff0080"]
var vb; //vine buffer
var box_widths = [25,   50,50,50,50,     100,100,100,    200,200]
var bw = box_widths[Math.floor(Math.random()*box_widths.length)] //box-width
var bh; //box-height
var bound = 1000; //grid width/height
var veggy_mode = 1;

function junglegym(){
    //Corner view:
    //jb.camera(1400,-300,1400,0,-500,0,0,1,0)
    if (random(1) < .6)
        jb.camera(random(1200,1600),random(-200,-400),1200,0,-500,0,0,1,0)
    else 
        jb.camera(random(1400,1600),-10,800,0,-1000,0,0,1,0)

    jb.imageMode("center")

    jb.push()
        MAIN()
    jb.pop()

    image(jb, 0, 0, width, height)
}

function MAIN(){
    jb.push()
        GRIDS()
        //ISLANDS()
    jb.pop()
}

function GRIDS() {
    for (let x = 0; x <= bound + 200; x+=bw){
        for (let z = 0; z <= bound + 200; z+=bw){
            //For each grid location:
            jb.push()               
                bh = 3 * noise(2*bound-2*x-z) * (2*bound-x-z)/4
                jb.translate(x,-bh/2,z)
                base_box()
                if (random(1) < JUNGLE_DENSITY_THRESHOLD){
                    //DECORATIONS:
                    vegetation()
                    if (random(1) > 0.9 && PILLAR_BOX_PARAM)
                        pillar_box()
                    if (random(1) > 0.9 && HANOI_TOWER_PARAM)
                        hanoi_tower()
                }
            jb.pop()
        }
    }
}

//Draws the box
function base_box(){
    jb.box(bw, bh, bw)
    jb.push()
        jb.translate(bw/2,0,0)
        jb.rotateY(PI/2)
        jb.fill("#000000")
        jb.rectMode(CENTER)
        jb.rect(0,0,bw,bh)
    jb.pop()
    jb.push()
        jb.translate(0,0,bw/2)
        jb.fill(GRAD_COLOR)
        jb.rectMode(CENTER)
        jb.rect(0,0,bw,bh)
    jb.pop()
}

function hanoi_tower() {
    jb.translate(0,-bh/2,0)
    jb.ellipseMode(CENTER)
    let r = bw
    let rr = r/5
    let stroke_width = 10
    for (let y = 0; y > -100; y-=20){

        jb.push()
            if (y == 0){
                jb.translate(0,-.1,0)
                jb.rotateX(PI/2)
                jb.fill(0)
                jb.drawingContext.shadowOffsetX = 5;
                jb.drawingContext.shadowOffsetY = 5;
                jb.drawingContext.shadowBlur = 5;
                jb.drawingContext.shadowColor = 'black';
                //jb.box(bw,inter,bw)
                jb.tint(100)
                jb.circle(0,0,r-rr/4)
            } else {
                jb.translate(0,y,0)
                jb.rotateX(PI/2)
                jb.noStroke()
                //jb.fill(rainbow_cp[count])
                //jb.box(bw,inter,bw)
                //jb.strokeWeight(stroke_width)
                let curr_col = 0
                let curr_r = r
                let curr_rr = r/5
                for (let i = 0; i < 5; i++){
                    jb.fill(curr_col)
                    jb.circle(0,0,curr_r)
                    if (curr_col == 0) 
                        curr_col = 255 
                    else curr_col = 0
                    curr_r-=curr_rr
                }
            }
        jb.pop()
        stroke_width-=2
        r-=rr
    }
}

function pillar_box(){
    jb.push()
        //Top
        let w = bw/2
        jb.translate(0,-bh/2 - w,0)
        jb.beginShape(); 
        jb.vertex(-w,-w,w) 
        jb.vertex(w,-w,w)
        jb.vertex(w,-w,-w)
        jb.vertex(-w,-w,-w)
        jb.vertex(-w,-w,w)
        jb.endShape();
        
        //Front
        for (let i = 0; i < 4; i++){
            if (i == 1)
                jb.fill("#000000")
            else
                jb.fill("#FFFFFF")
            jb.beginShape();
            jb.vertex(-w,-w,w)
            jb.vertex(-w,w,w)
            jb.vertex(-w*.8,w,w)
            jb.vertex(-w*.8,-w*.8,w)
            jb.vertex(w*.8,-w*.8,w)
            jb.endShape();

            jb.beginShape();
            jb.vertex(w*.8,-w*.8,w)
            jb.vertex(w*.8,w,w)
            jb.vertex(w,w,w)
            jb.vertex(w,-w,w)
            jb.vertex(-w,-w,w)
            jb.endShape()
            jb.rotateY(PI/2)
        }
        jb.translate(0,bh/2 - w,0)
        //veggy_mode = 1;
        vegetation(table = true)
        //veggy_mode = 0;
    jb.pop()
}

//Draws the vines
function vegetation(table = false) {
    let max_height = random(.1,1)*bh

    //Shadow Side
    jb.push()
        vb = createGraphics(bw,bh)
        jungle("#88888800", max_height, table)
        jb.translate(bw/2 + .01,0,0)
        jb.rotateY(PI/2)
        jb.image(vb, 0, 0, bw, bh)
        vb.clear()
        vb.remove()
    jb.pop()

    //Bright Side
    jb.push()
        vb = createGraphics(bw,bh)
        jungle("#FFFFFF00", max_height, table)
        jb.translate(0,0,bw/2 + .01)
        jb.rotateY(PI)
        jb.image(vb, 0, 0, bw, bh)
        vb.clear()
        vb.remove()
    jb.pop()

    //Top
    jb.push()
        vb = createGraphics(bw,bw)
        jungle("#FFFFFF00", bw)
        jb.translate(0,-bh/2 - .01,0)
        jb.rotateX(-PI/2)
        jb.image(vb, 0, 0, bw, bw)

        jb.translate(0,-.02,0)
        jb.rotateZ(PI/2)
        jb.image(vb, 0, 0, bw, bw)
        vb.clear()
        vb.remove()
    jb.pop()
}

//Draws rainbow topping
function rainbow_box_topping(){
    if (random(1) > .99){
        jb.translate(0,-bh/2,0)
        let min = -bw/20;
        let inter = bw/10
        let max = min - inter*rainbow_cp.length
        let count = 0
        for (let y = min; y > max; y-=inter){
            jb.push()
                jb.translate(0,y,0)
                jb.fill(rainbow_cp[count])
                jb.box(bw,inter,bw)
            jb.pop()
            count++;
        }
        jb.translate(0,max + inter/2,0)

        jb.translate(0,-500,0)
        jb.box(bw,1000,bw)
        jb.push()
            jb.translate(bw/2,0,0)
            jb.rotateY(PI/2)
            jb.fill("#000000")
            jb.rectMode(CENTER)
            jb.rect(0,0,bw,1000)
        jb.pop()
    }
}