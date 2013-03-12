function CanvasMain()
{
	mainCanvas = document.getElementById("freya");
	ctx = mainCanvas.getContext("2d");
}

CanvasMain.prototype.drawMap = function()
{

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

		//Draw le tilés
		for (y = 0; y < 2 * map.getMapWidth(); y++)
		{
			for (x = 0; x < 2 * map.getMapLength(); x++)
			{
				var a = map.getTileSprite(x, y)
				if (a)
				{
					this.drawSingleTile(a);
				}
			}
		}

		//Draw le objectes
		this.drawSingleObject(map.getObjectSprite(0));

		//Draw center dot for reference
		var veryCenterX = (800 / 2);
		var veryCenterY = (600 / 2);
		ctx.fillStyle="#000000";
		ctx.fillRect(veryCenterX - 1,veryCenterY-1, 3, 3);
}

CanvasMain.prototype.drawSingleObject = function(object)
{
	//!!ref
	var spriteSheet = object[0];
	var x = object[1];
	var y = object[2];
	var thickness = object[3];
	var level = object[4]
	var xClip = object[5];
	var yClip = object[6];
	var width = object[7];
	var height = object[8];

	var dimensions = map.getTileDimensions();
	var tileWidth = dimensions[0];
	var tileHeight = dimensions[1];
	var tileThickness = dimensions[2];

	//Calculate pixel position based on x, y (not height)
	var pixelX = 0;
	var pixelY = 0;

	pixelX = ((tileWidth / 2) * x);
	pixelY =  0.5 * (tileHeight - tileThickness) * y ;

	//Center pixel position
	var tileCenterX = pixelX + (tileWidth / 2);
	var tileCenterY = pixelY + ((tileHeight / 2)  - (tileThickness / 2));
	pixelX = tileCenterX - (width / 2);
	pixelY = tileCenterY - (height / 2);

	//Modify pixel position based on height
	//pixelY = pixelY - (level * tileThickness);


	//Draw based on calculated position and image
	ctx.drawImage(object[0], xClip, yClip, width, height, pixelX, pixelY, width, height);
}

CanvasMain.prototype.drawSingleTile = function(tile)
{
	//!!ref
	var spriteSheet = tile[0];
	var xClip = tile[1];
	var yClip = tile[2];
	var width = tile[3];
	var height = tile[4];
	var thickness = tile[5];
	var level = tile[6];

	//Calculate pixel position based on x, y (not height)
	var pixelX = 0;
	var pixelY = 0;

	pixelX = (width / 2) * x;
	pixelY = 0.5 * (height - thickness) * y;

	//Modify pixel position based on height and thickness
	pixelY = pixelY - (level * thickness);

	//Draw based on calculated position and image
	ctx.drawImage(tile[0], xClip, yClip, width, height, pixelX, pixelY, width, height);
	//For debug
	ctx.fillStyle = "white";
  	ctx.font = "10px Arial";
	ctx.fillText(x + ", " + y, pixelX + width / 3, pixelY + height / 2);
}