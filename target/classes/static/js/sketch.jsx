
class Circles {
  constructor() {
    this.circles = [];
  } 
  get getCirculos(){
      return this.circles;
  }
  
  addCirculo(c){
      this.circles.push(c);
  }
  
  emptyCircles(){
      this.circles = [];
  }
  
  contain(circulo){
      var contain = false;
      
      for (var i=0; i< this.circles.length; i++){
          if((this.circles[i].x === circulo.x && this.circles[i].y === circulo.y) && this.circles[i].color === circulo.color){
              contain = true;
          }
      }
      
      return contain;
  }
}

class Colors {
    constructor() {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        this.color = color;

    }
    
    get getColor(){
        return this.color;
    }
    
}

class Circle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  } 
}

var circulos = new Circles();
var colorG = new Colors();


function setup() { 
  var canvas=createCanvas(screen.width-200, screen.height-300);   
  canvas.parent('tableroId');
}

function vaciar(){
    noLoop();
    circulos.emptyCircles;
    loop();
}

function circles(){
    var ans="";      
    for (var i=0; i<circulos.getCirculos.length-1; i++){        
        ans+=JSON.stringify(circulos.getCirculos[i])+",";
    }  
    if(circulos.getCirculos.length>0){
        ans+=JSON.stringify(circulos.getCirculos[circulos.getCirculos.length-1]);
    }
    
    ans="{circulos :["+ans+"]}"; 
    //console.log(ans);
    return ans;
}

function circlesSet(json) {
    console.log("json: ", json);
   
    json.forEach(function (c) {
        //convert string to object JSON
        var dataObj2 = JSON.parse(c);
        //create new circle with data api REST
        var newC = new Circle(dataObj2.x, dataObj2.y, dataObj2.color);

        if(!circulos.contain(newC)){
            circulos.addCirculo(newC);
        }
    });
    
}

function showCircles(){
    console.log("lista de circulos: ",circulos.getCirculos);
}


function draw() {      
    
    console.log("tamaño lsta:", circulos.getCirculos.length );
    circulos.getCirculos.forEach(function (c) {
        let b;
        noStroke(); // Don't draw a stroke around shapes
        b = color(c.color);
        fill(b);   
        ellipse(c.x, c.y, 20, 20);
    });

    if (mouseIsPressed === true) {     
        var newC=new Circle(mouseX, mouseY,colorG.getColor);
        //console.log(!circulos.contain(newC));
        if (!circulos.contain(newC)){
            circulos.addCirculo(newC);

        }
    }   
    
    if (mouseIsPressed === false) {     
        fill(0,0,0);
    }
}
