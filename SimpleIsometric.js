/* 	Folgende Matrix stellt das Spielfeld mit allen Inhalten dar.
	Die Spielfigur wird anschließend separat gesetzt!	*/
var feld = [[1,-3,1,1],
			[0,0,0,1],
			[0,0,0,0],
			[0,0,1,-3]];

/* Objekt Literal */
var player = {
	x: 1,
	y: 2,
	score: 0,
	setFigur: function() {
		feld[this.y][this.x] = 2;
	},
	liftFigur: function() {
		feld[this.y][this.x] = 0;
	},
	digGold: function() {
		if ( feld[this.y][this.x] == -3 ) {
			this.score++;
		}
	}
}

/* Zählvariable für die Game Loop */
var counterGameLoop = 0;

/* Laden der Bilddateien */
var kachel = new Image();
var stein = new Image();
var gold = new Image();
var figur = new Image();
kachel.src = "kachel.gif";
stein.src = "stein.gif";
gold.src = "gold.png";
figur.src = "figur.gif";
var offsetX = 200;
var offsetY = 100;
var canvas, context;


function init() 
{
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
  canvas.addEventListener("keydown", handleKeydown);
  canvas.focus(); // siehe tabindex im html-body
  player.setFigur(); // Spielerfigur auf Startposition setzen 
}

/* 	Diese Funktion zum Zeichnen des Spielfelds muss immer wieder neu
	aufgerufen werden, wenn sich die Matrix ändert!	*/
function zeichneFeld() 
{
 context.clearRect(0,0,canvas.width,canvas.height);
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) 
  {
	/* 	Für die isometrische Ansicht werden die 2D-Koordinaten x,y 
		auf die Diagonalen x-y und x+y mit dem Seitenverhältnis 2:1
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
	if (feld[i][j]==-3)	//goldene Kachel
	{
	  context.drawImage(gold,isoX,isoY,gold.width,gold.height);
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
  /* Score anzeigen */
  context.font = '20px Verdana';
  context.fillStyle = 'blue';
  context.fillText('Score: ' + player.score,10,20);
  /* Simple Game Loop */
  update();
  setTimeout(zeichneFeld,10);
}

function update() 
{
  counterGameLoop++;
  /* Hindernis nach 10s verschwinden lassen! */
  if (counterGameLoop == 1000) feld[3][2] = 0;
}

/* vereinfacht die if-Anweisung in den move()-Funktionen */
function freiesFeld(x,y) 
{
  if ( y>=0 && y<feld.length && x>=0 && x<feld[y].length ) 
  {
	return ( feld[y][x] <= 0 ); 
  } 
  else 
  {
	return false;
  }
}

function movePlayer(dx,dy)
{
  if ( freiesFeld(player.x+dx,player.y+dy) ) 
  {
	player.liftFigur();
	player.x += dx;
	player.y += dy;
	player.digGold();
	player.setFigur();
  }
}

// Tastatursteuerung beim Herunterdrücken:
function handleKeydown(event) 
{
  let key = event.key || event.keyCode;
  let hasHandled = true;
  switch (key) {
	case "s": case "ArrowDown": 
		movePlayer(0,1);
		break;
	case "w": case "ArrowUp":
		movePlayer(0,-1);
		break;
    case "a": case "ArrowLeft":  
		movePlayer(-1,0);
		break;
    case "d": case "ArrowRight":
		movePlayer(1,0);
		break;
    case "Enter":
		// "enter" bzw. "return"
		break;
    case "Escape":
		// "esc"
		break;
    default: //jede andere Taste
		hasHandled = false;
  }
  if (hasHandled) event.preventDefault();
};
