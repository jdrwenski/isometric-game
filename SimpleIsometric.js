/* 	Folgende Matrix stellt das Spielfeld mit allen Inhalten dar.
	Die Spielfigur wird anschlieﬂend separat gesetzt!	*/
var feld = [[1,0,1,1],
			[0,0,0,1],
			[0,0,0,0],
			[0,0,1,0]];
var figurX = 1;
var figurY = 2;
feld[figurY][figurX] = 2;

/* Laden der Bilddateien */
var kachel = new Image();
var stein = new Image();
var figur = new Image();
kachel.src = "kachel.gif";
stein.src = "stein.gif";
figur.src = "figur.gif";
var offsetX = 200;
var offsetY = 100;
var canvas, context;


function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
}

/* 	Diese Funktion zum Zeichnen des Spielfelds muss immer wieder neu
	aufgerufen werden, wenn sich die Matrix ‰ndert!	*/
function zeichneFeld() 
{
 context.clearRect(0,0,canvas.width,canvas.height);
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) 
  {
	/* 	F¸r die isometrische Ansicht werden die 2D-Koordinaten x,y 
		auf die Diagonalen x-y und x+y mit dem Seitenverh‰ltnis 2:1
		transformiert ... nur etwas Mathematik!	*/
	let x = j*kachel.height;
	let y = i*kachel.height;
	let isoX = x-y;
	let isoY = (x+y)/2;
	isoX += offsetX;
	isoY += offsetY;
	if (feld[i][j]==0)	//normale Kachel
	{
	  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height);
	}
	if (feld[i][j]==1) //Hindernis
	{
	  isoY -= stein.height-kachel.height;
	  context.drawImage(stein,isoX,isoY,stein.width,stein.height);
	}
	if (feld[i][j]==2) //Spielfigur
	{
	  isoY -= figur.height-kachel.height;
	  context.drawImage(figur,isoX,isoY,figur.width,figur.height);
	}
  }
} 

function moveUp() 
{
 if (figurY>0 && feld[figurY-1][figurX]==0)
 {
   feld[figurY][figurX] = 0;
   figurY--;
   feld[figurY][figurX] = 2;
   zeichneFeld();
 }
}

function moveRight() 
{
 if (figurX<feld[figurY].length && feld[figurY][figurX+1]==0)
 {
   feld[figurY][figurX] = 0;
   figurX++;
   feld[figurY][figurX] = 2;
   zeichneFeld();
 }
}

function moveDown() 
{
 if (figurY<feld.length && feld[figurY+1][figurX]==0)
 {
   feld[figurY][figurX] = 0;
   figurY++;
   feld[figurY][figurX] = 2;
   zeichneFeld();
 }
}

function moveLeft() 
{
 if (figurX>0 && feld[figurY][figurX-1]==0)
 {
   feld[figurY][figurX] = 0;
   figurX--;
   feld[figurY][figurX] = 2;
   zeichneFeld();
 }
}
