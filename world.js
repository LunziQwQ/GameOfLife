/**
 * Created by Lunzi on 6/6/2017.
 */
"use strict";
var rule = new Rule();
var world = new World();
var template = new Template();

template.updateTemplateList();
world.init();

//禁用浏览器右键菜单
$("#world")[0].oncontextmenu = function () {
    return false;
};

//当按下鼠标按钮时开始绘图
window.addEventListener('mousedown', function () {
    drawMousePos();                                     //绘制点击时的点
    $("#world").bind('mousemove', drawMousePos);        //按下鼠标移动时绑定绘制事件
    $("#world").bind('mouseenter',function () {         //鼠标按下后再进入canvas区域时绑定绘制事件
        $("#world").bind('mousemove', drawMousePos);
    })
});

//绘制当前鼠标所在的点的Cell
function drawMousePos() {
    var elementPos =world.getCanvasElementPos();
    var mousePos = getMousePos(event);
    if(mousePos.x >= elementPos.x1 && mousePos.x <= elementPos.x2 &&
        mousePos.y >= elementPos.y1 && mousePos.y <= elementPos.y2) {
        var worldPos = {
            x: Math.floor((mousePos.x - elementPos.x1) / cellSize),
            y: Math.floor((mousePos.y - elementPos.y1) / cellSize)
        };
        world.setCoordStatus(worldPos, event.buttons == 1);     //绘制当前鼠标所在像素的Cell，左键黑色，其他白色
    }
}

//当松开鼠标时，解绑绘制事件
window.addEventListener('mouseup', function () {
    $("#world").unbind("mousemove");
    $("#world").unbind("mouseenter");
});

//当鼠标离开canvas区域时解绑绘制事件
$("#world").bind('mouseleave', function () {
    $("#world").unbind("mousemove");
});

//获得当前鼠标相对于页面的位置
function getMousePos(event) {
    var e = event || window.event;
    return { 'x': e.clientX, 'y': e.clientY };
}


function World() {
    var space = undefined;                          //Cell数组
    var canvas =$("#world")[0].getContext("2d");    //Canvas控件
    var canvasElement = $("#world")[0];             //Canvas元素
    var isRunning = false;                          //初始游戏状态
    var template = "Random";                        //初始模板


    var nearCoord = [
        [-1,-1],[0,-1],[1,-1],
        [-1,0],[1,0],
        [-1,1],[0,1],[1,1]
    ];

    this.getSpace = function () {return space;};     //space getter
    this.setCoordStatus = function (coord, isLive) {setStatus(coord, isLive);};

    /**
     * 获取当前Canvas元素位置
     * @returns {{x1: number coord x1, y1: number coord x2, x2: number coord y1, y2: number coord y2}}
     */
    this.getCanvasElementPos = function () {
        return {
            x1: canvasElement.getBoundingClientRect().left + 20,
            y1: canvasElement.getBoundingClientRect().top + 20,
            x2: canvasElement.getBoundingClientRect().left + canvasElement.width + 20,
            y2: canvasElement.getBoundingClientRect().top + canvasElement.height + 20
        };
    };

    /**
     * 初始化Canvas元素，控件及模板菜单，更新Canvas元素位置
     */
    this.init = function () {
        canvasElement.height = worldSize;
        canvasElement.width = worldSize;
        size = Math.round(worldSize/cellSize);
        clearWorld();
        space = new Array(size);
        for(var i = 0; i < size; i++){
            space[i] = new Array(size);
            for(var j = 0; j < size; j++){
                space[i][j] = {isLive:false, needChange:false, nearCount:0};
            }
        }
        if(template ==="Random")
            for(var i = 0; i < density * size * size; i++)
                setStatus(getRandomCoord(),true);
        else
            initTemplate(template);

    };

    /**
     * 在Canvas中绘制指定的模板
     * @param templateName 模板名称
     */
    function initTemplate(templateName) {
        var temp = new Template().templateList[templateName];
        var off = temp.offsetCoord;
        temp.liveList.forEach(function (x) {
            setStatus({x:x[0]+off.x,y:x[1]+off.y}, true);
        });
    }

    /**
     * 清空所有绘图
     */
    var clearWorld = function () {
        canvas.clearRect(0,0,worldSize,worldSize);
    };

    /**
     * 将指定坐标的Cell绘制为指定状态
     * @param coord 坐标
     * @param isLive Cell状态
     */
    var setStatus = function(coord, isLive){
        for(var i = 0; i < 8; i++){
            var tempX = coord.x + nearCoord[i][0];
            var tempY = coord.y + nearCoord[i][1];
            if(coordIsLegel(tempX,tempY))
                space[tempX][tempY].nearCount += isLive ? 1 : -1;
        }

        space[coord.x][coord.y].isLive = isLive;
        if (isLive)
            canvas.fillRect(coord.x*cellSize,coord.y*cellSize,cellSize,cellSize);
        else
            canvas.clearRect(coord.x*cellSize,coord.y*cellSize,cellSize,cellSize);
    };

    var coordIsLegel = function (tempX, tempY) {
        console.log();
        return !(tempX < 0 || tempX >= size || tempY < 0 || tempY >= size);
    };

    /**
     * 获得一个world数组范围内状态为死亡的Cell随机坐标
     * @returns {{x: number coord x, y: number coord y}}
     */
    var getRandomCoord = function () {
        var coord ={ x:0, y:0};
        coord.x = Math.floor(Math.random()*size);
        coord.y = Math.floor(Math.random()*size);
        if(isLegal(coord))  return coord;
        else return getRandomCoord();
    };

    /**
     * 判断指定坐标的Cell是否为存活状态
     * @param coord 坐标
     * @returns {boolean} 是否存活
     */
    var isLegal = function(coord){
        return !space[coord.x][coord.y].isLive;
    };

    /**
     * 绘制一次world，若游戏状态为开始，按照指定delay不断刷新world
     */
    var updateSpace = function () {
        var temp = new Array(0);
        for(var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                if(space[i][j].isLive !== rule.check({x:i,y:j})) {
                    space[i][j].needChange = true;
                    temp.push({x: i, y: j});
                }
            }
        }
        temp.forEach(function (item) {
            setStatus(item, !space[item.x][item.y].isLive);
            space[item.x][item.y].needChange = false;
        });
        
        if(isRunning)
            setTimeout(updateSpace,delay);
    };

    /**
     * 将游戏状态设为开始，刷新World
     */
    this.onStartClick = function () {
        if(isRunning) return;
        isRunning = true;
        updateSpace();
    };

    /**
     * 将游戏状态设为暂停
     */
    this.onPauseClick = function () {
        isRunning = false;
    };

    /**
     * 更改刷新delay
     * @param value delay编号
     */
    this.speedOnChange = function (value) {
        delay = Math.floor(1000 / value);
    };

    /**
     * 更改模板并重置World
     * @param value 模板编号
     */
    this.templateOnChange = function (value) {
        template = value;
        this.onResetClick();
    };

    /**
     * 重置World并将游戏状态设为暂停
     */
    this.onResetClick = function () {
        isRunning = false;
        density = $("#density").val();
        setTimeout(world.init,delay+10);//等待settimeout的更新方法停止再重置世界。
    };

    /**
     * 更新随机密度并重置world
     * @param value
     */
    this.densityOnChange = function (value) {
        if(value>MAX_DENSITY) $("#density").val(MAX_DENSITY);
        if(value<MIN_DENSITY) $("#density").val(MIN_DENSITY);
    };

    /**
     * 更新world大小并重置world
     * @param value
     */
    this.worldSizeOnChange = function (value) {
        if(value>MAX_WORLDSIZE) $("#world_size").val(MAX_WORLDSIZE);
        if(value<MIN_WORLDSIZE) $("#world_size").val(MIN_WORLDSIZE);
        worldSize = $("#world_size").val();
        this.onResetClick();
    };

    /**
     * 更新Cell大小并重置world
     * @param value
     */
    this.cellSizeOnChange = function (value) {
        if(value>MAX_CELLSIZE) $("#cell_size").val(MAX_CELLSIZE);
        if(value<MIN_CELLSIZE) $("#cell_size").val(MIN_CELLSIZE);
        cellSize = $("#cell_size").val();
        this.onResetClick();
    };
}

