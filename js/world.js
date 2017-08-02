/**
 * Created by Lunzi on 6/6/2017.
 */
"use strict";
var rule = new Rule();
var world = new World();
var template = new Template();
$("#world")[0].oncontextmenu = function () {
    return false;
};

window.addEventListener('mousedown', function (event) {
    var mousePos = getMousePos(event);
    var canvasElement = document.getElementById("world");
    var elementPos = {
        x1: canvasElement.getBoundingClientRect().left + 10,
        y1: canvasElement.getBoundingClientRect().top + 10,
        x2: canvasElement.getBoundingClientRect().left + canvasElement.width + 10,
        y2: canvasElement.getBoundingClientRect().top + canvasElement.height + 10
    };
    if(mousePos.x >= elementPos.x1 && mousePos.x <= elementPos.x2 &&
        mousePos.y >= elementPos.y1 && mousePos.y <= elementPos.y2){
        var xx = {
            x: Math.floor((mousePos.x - elementPos.x1) / 10),
            y: Math.floor((mousePos.y - elementPos.y1) / 10)
        };
        world.setCoordStatus(xx,event.buttons == 1);
        $("#world").bind('mousemove', function () {
            var pos = getMousePos();
            if(pos.x >= elementPos.x1 && pos.x <= elementPos.x2 &&
                pos.y >= elementPos.y1 && pos.y <= elementPos.y2){
                var worldCoord = {
                    x: Math.floor((pos.x - elementPos.x1) / 10),
                    y: Math.floor((pos.y - elementPos.y1) / 10)
                };
                world.setCoordStatus(worldCoord,event.buttons == 1);
            }
        });
    }
});
window.addEventListener('mouseup', function () {
    $("#world").unbind("mousemove");
});
$("#world").bind('mouseleave', function () {
    $("#world").unbind("mousemove");
});

function getMousePos(event) {
    var e = event || window.event;
    var x = e.clientX;
    var y = e.clientY;
    return { 'x': x, 'y': y };
}


template.updateTemplateList();
world.init();
function World() {
    var space = undefined;
    var canvas =$("#world")[0].getContext("2d");
    var running = false;
    var template = "Random";

    this.getSpace = function() {return space;};
    this.setCoordStatus = function (coord, isLive) {setStatus(coord, isLive);};
    this.init = function () {
        clearWorld();
        space = new Array(size);
        for(var i = 0; i < size; i++){
            space[i] = new Array(size);
            for(var j = 0; j < size; j++){
                space[i][j] = {isLive:false};
            }
        }
        if(template ==="Random")
            for(var i = 0; i < density.value[density.mode]; i++)
                setStatus(getRandomCoord(),true);
        else
            initTemplate(template);
    };

    var initTemplate = function (templateName) {
        var temp = new Template().templateList[templateName];
        var off = temp.offsetCoord;
        temp.liveList.forEach(function (x) {
            setStatus({x:x[0]+off.x,y:x[1]+off.y}, true);
        });
    };

    var clearWorld = function () {
        canvas.clearRect(0,0,500,500);
    };


    var setStatus = function(coord, isLive){
        space[coord.x][coord.y].isLive = isLive;
        if (isLive)
            canvas.fillRect(coord.x*10,coord.y*10,10,10);
        else
            canvas.clearRect(coord.x*10,coord.y*10,10,10);
    };

    var getRandomCoord = function () {
        var coord ={ x:0, y:0};
        coord.x = Math.floor(Math.random()*50);
        coord.y = Math.floor(Math.random()*50);
        if(isLegal(coord))  return coord;
        else return getRandomCoord();
    };

    var isLegal = function(coord){
        return !space[coord.x][coord.y].isLive;
    };

    var updateSpace = function () {
        var temp = {};
        $.extend(true,temp,space);
        for(var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                temp[i][j].isLive = rule.check({x:i,y:j});
            }
        }
        for(var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                setStatus({x:i,y:j},temp[i][j].isLive);
            }
        }
        if(running)
            setTimeout(updateSpace,delay.value[delay.mode]);
    };

    this.onStartClick = function () {
        if(running) return;
        running = true;
        updateSpace();
    };

    this.onPauseClick = function () {
        running = false;
    };

    this.speedOnChange = function (value) {
        delay.mode = value;
    };

    this.templateOnChange = function (value) {
        template = value;
        this.onResetClick();
    };

    this.onResetClick = function () {
        density.mode = $("#density").val();
        running = false;
        setTimeout(world.init,delay.value[delay.mode]+10);//等待settimeout的更新方法停止再重置世界。
    };
}

