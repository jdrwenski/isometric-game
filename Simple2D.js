var feld = [[1,0,0,1],
			[1,0,0,0],
			[0,0,1,0],
			[0,1,0,0]];

var kachel = new Image();
var stein = new Image();
kachel.src = "green.gif";
stein.src = "blue.gif";
var offsetX = 0;
var offsetY = 0;
var canvas, context;


function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
}


function zeichneFeld() 
{
 context.clearRect(0,0,canvas.width,canvas.height);
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) 
  {
	let x = j*kachel.width+offsetX;
	let y = i*kachel.height+offsetY;
	if (feld[i][j]==0)	//normale Kachel
	{
	  context.drawImage(kachel,x,y,kachel.width,kachel.height);
	}
	if (feld[i][j]==1) //Hindernis
	{
	  context.drawImage(stein,x,y,stein.width,stein.height);
	}
  }
} 

