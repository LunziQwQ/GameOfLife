/**
 * Created by Lunzi on 6/6/2017.
 */
"use strict";


var cellSize = 10;
var MAX_CELLSIZE = 10;
var MIN_CELLSIZE = 5;

var worldSize = 500;
var MAX_WORLDSIZE = 1000;
var MIN_WORLDSIZE = 500;

var size = Math.round(worldSize/cellSize);

var density = 0.2;
var MAX_DENSITY = 1.0;
var MIN_DENSITY = 0.00;

var delay = 300;
var MAX_DELAY = 1000;
var MIN_DELAY = 30;

var speed = Math.floor(1000 / delay);
var MAX_SPEED = Math.floor(1000 / MIN_DELAY);
var MIN_SPEED = Math.floor(1000 / MAX_DELAY);

applyConfig();

function applyConfig() {
    $("#speed").attr("max", MAX_SPEED);
    $("#speed").attr("min", MIN_SPEED);
    $("#speed").attr("value", speed);


    $("#density").attr("max", MAX_DENSITY);
    $("#density").attr("min", MIN_DENSITY);
    $("#density").attr("value", density);


    $("#world_size").attr("max", MAX_WORLDSIZE);
    $("#world_size").attr("min", MIN_WORLDSIZE);
    $("#world_size").attr("value", worldSize);

    $("#cell_size").attr("max", MAX_CELLSIZE);
    $("#cell_size").attr("min", MIN_CELLSIZE);
    $("#cell_size").attr("value", cellSize);
}
