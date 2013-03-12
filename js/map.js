function Map(name, callback){

	tiles = new Array();
	objects = new Array();
	sprites = new Array();

	//<dummy data
	sprites = [
		//file, width, height and thickness of individual sprites
		//width, height and thickness should be the same across all tiles.
		//also assume that the first spritesheet contatins the tiles. (in getTileDimensions.)
		["gfx/tilesheet.png", 64, 54, 8],
		["gfx/spritesheet.png", 32, 32, 0]
	];

	flatTiles = [
		//x, y, h, tilesheet, tilesheetCol, tilesheetRow
		[0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0], [4, 0, 0, 0, 2, 0], [6, 0, 0, 0, 2, 0], [8, 0, 0, 0, 2, 0],
		[1, 1, 0, 0, 0, 0], [3, 1, 0, 0, 0, 0], [5, 1, 0, 0, 0, 0], [7, 1, 0, 0, 0, 0], [9, 1, 0, 0, 0, 0],
		[0, 2, 0, 0, 1, 0], [2, 2, 0, 0, 2, 0], [4, 2, 0, 0, 0, 0], [6, 2, 0, 0, 0, 0], [8, 2, 0, 0, 0, 0],
		[1, 3, 0, 0, 0, 0], [3, 3, 0, 0, 1, 0], [5, 3, 0, 0, 1, 0], [7, 3, 0, 0, 1, 0], [9, 3, 0, 0, 1, 0],
		[0, 4, 0, 0, 2, 0], [2, 4, 0, 0, 0, 1], [4, 4, 0, 0, 1, 1], [6, 4, 0, 0, 1, 1], [8, 4, 0, 0, 1, 1],
		[1, 5, 0, 0, 0, 0], [3, 5, 0, 0, 1, 0], [5, 5, 0, 0, 1, 0], [7, 5, 0, 0, 1, 0], [9, 5, 0, 0, 1, 0],
		[0, 6, 0, 0, 2, 0], [2, 6, 0, 0, 0, 1], [4, 6, 0, 0, 1, 1], [6, 6, 0, 0, 1, 1], [8, 6, 0, 0, 1, 1]
	];

	objects = [
		//x and  y of tile, spritesheet_id, spritesheet_x, spritesheet_y, [[key, value], [key2, value2] ...]
		[2, 2, 1, 0, 0, [["testOne", true], ["testTwo", false]]],
		[6, 4, 1, 0, 0, [["testOne", false], ["testFour", false]]]
	];
	//dummy data/>

	//Unpack tiles
	for(i = 0; i < flatTiles.length; i++) {
		if(tiles[flatTiles[i][0]] == null){
			tiles[flatTiles[i][0]] = new Array();
		}
													//h, tilesheet, col, row
		tiles[flatTiles[i][0]][flatTiles[i][1]] = [flatTiles[i][2], flatTiles[i][3], flatTiles[i][4], flatTiles[i][5]];
	}
	//Load sprite sheets, callback once completed.
	var loadedCount = 0;
	sprites.forEach(function(element, index, array){
		var img = new Image();
		img.src = element[0];
		img.onload = function(){
			loadedCount++;
			sprites[index][0] = img;
			if(loadedCount == sprites.length){
				callback();
			}
		};
	});
}

Map.prototype.getMapWidth = function(){ return tiles.length; }

Map.prototype.getMapLength = function() {
	return tiles[tiles.reduce(function(previousValue, currentValue, index, array){
		return (previousValue.length > currentValue.length ? index : index - 1)
	})].length;
}

Map.prototype.getTileHeight = function(x, y){ return tiles[x][y][0]; }

Map.prototype.getTileDimensions = function(){ return sprites[0].slice(1); }

Map.prototype.getTileSprite = function(x, y) {
	if (tiles.length <= x || x < 0 || !(tiles[x]) || tiles[x].length <= y || y < 0 || !(tiles[x][y])){
		return null;
	} else {
		//Sprite sheet, x pos and y pos to start clip, width, height and "thickness" of image, level of tile
		return [
			sprites[tiles[x][y][1]][0],
			tiles[x][y][2] * sprites[tiles[x][y][1]][1],
			tiles[x][y][3] * sprites[tiles[x][y][1]][2],
			sprites[tiles[x][y][1]][1],
			sprites[tiles[x][y][1]][2],
			sprites[tiles[x][y][1]][3],
			tiles[x][y][0]
		];
	}
}

Map.prototype.getObjects = function(x, y){
	return (!(x) || !(y)) ? objects : objects.filter(function(element, index, array){
				if (element[0] == x && element[1] == y) return element;
			});
}

Map.prototype.getObjectKeys = function(objId){
	//TODO: check if object exists.
	var returnVal = new Array();
	objects[objId][5].forEach(function(element, index, array){
		returnVal.push(element[0]);
	});
	return returnVal;
}

Map.prototype.doesObjectHaveKey = function(objId, key){
	return this.getObjectKeys(objId).some(function(element, index, array){
		return (element == key);
	});
}

Map.prototype.getObjectValue = function(objId, key){
	if (!this.doesObjectHaveKey(objId, key)) return null;
	
	return objects[objId][5].filter(function(element, index, array){
		if (element[0] == key){
			console.log(element[1]);
			return element[1];
		};
	});
}

Map.prototype.getObjectSprite = function(objId) {
	//Sprite sheet, x, y, thickness and level of tile object is on, x and y to start clipping, width and height of image
	return [
		sprites[objects[objId][2]][0],
		objects[objId][0],
		objects[objId][1],
		this.getTileHeight(objects[objId][0], objects[objId][0]),
		sprites[objects[objId][2]][2],
		objects[objId][3] * sprites[objects[objId][3]][1],
		objects[objId][4] * sprites[objects[objId][3]][2],
		sprites[objects[objId][2]][1],
		sprites[objects[objId][2]][2]
	];
}