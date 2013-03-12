function CanvasInput()
{
	$("#freya").mousemove(function(e) {
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		input.findTile(x, y);
	});
}

CanvasInput.prototype.findTile = function(mousePixelX, mousePixelY)
{
	var tileDimensions = map.getTileDimensions();
	var tileWidth = tileDimensions[0];
	var tileHeight = tileDimensions[1];
	var tileThickness = tileDimensions[2];

	//!!Calculate tile position
	var foundTileX = -1;
	var foundTileY = -1;

	rawTileX = mousePixelX / (tileWidth / 2) - 0.5;
	rawTileY = mousePixelY / ((tileHeight - tileThickness) / 2 ) - 0.5;

	foundTileX = Math.floor(rawTileX);
	foundTileY = Math.floor(rawTileY);

	if (((foundTileX + foundTileY) % 2) == 1){

		debugLine1 = "Last coersion from: " + foundTileX + ", " + foundTileY;
		debugLine2 = "RawX: " + rawTileX + ", RawY: " + rawTileY;

		if((rawTileX - foundTileX) > (rawTileY - foundTileY)){
			foundTileX--;
		}else{
			foundTileY++;
		}

		debugLine3 = "To: " + foundTileX + ", " + foundTileY;
	}

	//!!Update canvas - TEMPORARY!//
	canvas.drawMap();
	ctx.fillStyle = "blue";
  	ctx.font = "bold 16px Arial";
	ctx.fillText(mousePixelX + ", " + mousePixelY, 400, 100);
	ctx.fillText("Tile: " + foundTileX + ", " + foundTileY, 400, 120);
	ctx.fillText(debugLine1, 400, 160);
	ctx.fillText(debugLine2, 400, 180);
	ctx.fillText(debugLine3, 400, 200);
}