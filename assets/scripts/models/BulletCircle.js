// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isDestroy: true,
        speed: 15,
        playerComponent : null,
        hp: 0,
    },

    anim: null,
    game: null,

    // LIFE-CYCLE CALLBACKS:

    init(){
        this.speed = 15;
        this.direction = 0;
    },

    onLoad () {
        this.game = cc.find('Canvas').getComponent('GameController').node;
    },
    start () {
    },

    startAnim(){
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('circle');
    },

    recycleBullet() {
        this.anim.stop();
        this.node.removeFromParent();

        this.init();

        this.playerComponent.bulletCirclePool.put(this.node);
    },

    update (dt) {
        if (this.isDestroy) this.recycleBullet();
        this.node.y += this.speed + this.speed * dt;
        
        if (this.node.y > this.game.height/2){

            this.recycleBullet();
        }
    },
});
