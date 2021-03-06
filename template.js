/**
 * Created by Lunzi on 6/6/2017.
 */
"use strict";

function Template() {
    this.templateList = {
        "GliderGun":new gliderGun(),
        "GollyLogo":new gollyLogo(),
        "Flower":new flower(),
        "OneLine_1":new oneLine1(),
        "OneLine_2":new oneLine2(),
        "OneLine_3":new oneLine3(),
        "Century(103)":new century(),
        "SitDown(2000+)":new sitDown(),
        "empty":new empty()
    };

    function gliderGun() {
        this.offsetCoord = {x:0,y:0};
        var width = 38;
        var heigth = 11;
        this.liveList =
            [[1,5],[2,5],[1,6],[2,6],[11,5],[11,6],[11,7],[12,4],[13,3],[14,3]
            ,[16,4],[17,5],[17,6],[18,6],[15,6],[17,7],[16,8],[12,8],[13,9],[14,9]
            ,[21,3],[21,4],[21,5],[22,3],[22,4],[22,5],[23,2],[23,6],[25,1],[25,2]
            ,[25,6],[25,7],[35,3],[35,4],[36,3],[36,4]];
    }
    
    function gollyLogo() {
        this.liveList =
            [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,7],[0,8]
            ,[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,7],[1,8]
            ,[2,7],[2,8]
            ,[3,0],[3,1],[3,7],[3,8]
            ,[4,0],[4,1],[4,7],[4,8]
            ,[5,0],[5,1],[5,7],[5,8]
            ,[6,0],[6,1]
            ,[7,0],[7,1],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]
            ,[8,0],[8,1],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]];
        this.offsetCoord = {x:Math.floor(size/2-5),y:Math.floor(size/2-5)};
    }

    function flower() {
        this.liveList =
            [[11,0],[10,1],[11,1],[12,1],[10,2],[12,2],[13,2],[13,3]
                ,[2,7],[3,7],[8,7],[9,7],[1,8],[2,8],[13,8],[0,9],[1,9],[13,9]
                ,[1,10],[2,10],[18,10],[19,10],[7,11],[19,11],[20,11]
                ,[7,12],[18,12],[19,12],[11,13],[12,13],[17,13],[18,13]
                ,[7,17],[7,18],[8,18],[10,18],[8,19],[9,19],[10,19],[9,20]];
        this.offsetCoord = {x: Math.floor(size/2-11), y: Math.floor(size/2-11)};
    }

    function oneLine1() {
        this.liveList =
            [[0,0],[1,0],[2,0],[3,0],[4,0],[6,0],[7,0],[8,0],[11,0],[12,0],[13,0],[14,0]];
        this.offsetCoord = {x: Math.floor(size/2-8), y: Math.floor(size/2)};
    }

    function oneLine2() {
        this.liveList =
            [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]
                , [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0]
                , [28, 0], [29, 0], [30, 0]];
        this.offsetCoord = {x: Math.floor(size/2-15), y: Math.floor(size/2)};
    }

    function oneLine3() {
        this.liveList =
            [[0,0],[1,0],[2,0],[6,0],[7,0],[8,0],[9,0],[11,0],[12,0],[13,0],[14,0]
            ,[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0]];
        this.offsetCoord = {x: Math.floor(size/2-115), y: Math.floor(size/2)};

    }

    function century() {
        this.liveList =
            [[0,0],[1,0],[1,1],[2,1],[3,1],[2,2]];
        this.offsetCoord = {x: Math.floor(size/2+2)+2, y: Math.floor(size/2-10)};
    }

    function sitDown() {
        this.liveList = [[0,0],[3,1],[0,2],[2,2],[3,2],[0,3],[1,3],[3,3]];
        this.offsetCoord = {x: Math.floor(size/2-10), y: Math.floor(size/2-10)};
    }

    function empty() {
        this.liveList = [];
        this.offsetCoord = {x: 0, y: 0};
    }


    this.updateTemplateList = function(){
        for(var x in this.templateList) {
            $("#template").append("<option value='"+x+"'>"+x+"</option>");
        }
    }
}