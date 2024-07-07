// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onDestroy: function(){
        this.node.destroy();
    },
    

    // onLoad () {
       
    // },

    // start () {

    // },

    update (dt) {
        if (Math.abs(this.node.y) > this.node.height){
            this.node.y = this.node.height - 2;
        }
        this.node.y -= 2;
    },
});
