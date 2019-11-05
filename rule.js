/**
 * Created by Lunzi on 6/6/2017.
 */
function Rule() {
    var space;
    var liveLessLimit = 2;
    var liveMoreLimit = 3;
    var rebirthNumber = 3;

    this.check = function (coord) {
        var node = world.getSpace()[coord.x][coord.y];
        if(node.isLive){
            return (node.nearCount <= liveMoreLimit && node.nearCount >= liveLessLimit);
        }else return (node.nearCount === rebirthNumber);
    };
}