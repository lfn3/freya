CREATE TABLE `map_data` (
		VARCHAR key;
);

CREATE TABLE `tile` (
	INTEGER h;
	INTEGER x; 
	INTEGER y;
	PRIMARY KEY (x, y);
	INTEGER spritesheet_id;
);

CREATE TABLE `obj` (
	PRIMARY KEY INTEGER id;
	VARCHAR name;
	INTEGER x;
	INTEGER y;
	INTEGER tile_id;
	INTEGER spritesheet_id;
	INTEGER spritesheet_x;
	INTEGER spritesheet_y;
);

CREATE TABLE `obj_kv` (
	PRIMARY KEY INTEGER id;
	INTEGER obj_id;
	VARCHAR key;
	VARCHAR val;
);

CREATE TABLE `spitesheet` (
	PRIMARY KEY INTEGER id;
	VARCHAR filepath;
	INTEGER cols;
	INTEGER rows;
	INTEGER sprite_width;
	INTEGER sprite_height;
)