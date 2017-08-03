/**
 * Created by Lunzi on 6/6/2017.
 */
"use strict";

var size = 50;
var MIN_SIZE = 50;

var cellSize = 10;
var MAX_CELLSIZE = 20;
var MIN_CELLSIZE = 2;

var worldSize = size*cellSize;
var MAX_WORLDSIZE = 1000;
var MIN_WORLDSIZE = 500;


var density = {value: [300, 500, 1000], mode: 0};    //初始生物密度
// var density = 300;
var MAX_DENSITY = 1000;
var MIN_DENSITY = 300;

var delay = {value: [500, 200, 50], mode:1};      //刷新间隔，单位ms
// var delay = 200;
var MAX_DELAY = 500;
var MIN_DELAY = 50;