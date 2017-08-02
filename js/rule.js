/**
 * Created by Lunzi on 6/6/2017.
 */
function Rule() {
    var space;
    var nearCoord = [
        [-1,-1],[0,-1],[1,-1],
        [-1,0],[1,0],
        [-1,1],[0,1],[1,1]
    ];

    var liveLessLimit = 2;
    var liveMoreLimit = 3;
    var rebirthNumber = 3;

    this.check = function (coord) {
        space = world.getSpace();
        var liveCount = 0;
        var originStatus = space[coord.x][coord.y].isLive;
        for(var i = 0; i < 8; i++){
            var tempX = coord.x + nearCoord[i][0];
            var tempY = coord.y + nearCoord[i][1];
            if (isLegel(tempX,tempY) && space[tempX][tempY].isLive){
                liveCount +=  1;
            }
        }
        if(originStatus){
            return (liveCount <= liveMoreLimit && liveCount >= liveLessLimit);
        }else return (liveCount === rebirthNumber);
    };
    var isLegel = function (tempX, tempY) {
        console.log();
        return !(tempX < 0 || tempX >= size || tempY < 0 || tempY >= size);
    }
}