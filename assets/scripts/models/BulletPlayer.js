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
        direction: 0,
        speed: 15,
        playerComponent : null,
        hp: 0,
        bulletLevel: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    anim: null,
    gane: null,

    init(){
        this.speed = 15;
        this.direction = 0;
        this.hp = 5;
        this.bulletLevel = 0;
    },

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.game = cc.find('Canvas').getComponent('GameController').node;
    },
    start () {
    },
    
    startAnim(){
        let position = null;
        switch(this.direction){
            case 0:
                this.anim.play('mid1');
                position = cc.v2(this.node.x, this.node.y + (this.bulletLevel <= 2? 100 : 120));
                break;
            case -1:
                position = cc.v2(this.node.x - 6, this.node.y + 100);
                break;
            case 1:
                position = cc.v2(this.node.x + 6, this.node.y + 100);
                break;
            case -2:
                position = cc.v2(this.node.x - 10, this.node.y + 100);
                break;
            case 2:
                position = cc.v2(this.node.x + 10, this.node.y + 100);
                break;
            case 31:
                position = cc.v2(this.node.x + 12, this.node.y + 130);
                break;
            case 32:
                position = cc.v2(this.node.x + 24, this.node.y + 130);
                break;
            case 33:
                position = cc.v2(this.node.x + 36, this.node.y + 130);
                break;
            case -31:
                position = cc.v2(this.node.x - 12, this.node.y + 130);
                break;
            case -32:
                position = cc.v2(this.node.x - 24, this.node.y + 130);
                break;
            case -33:
                position = cc.v2(this.node.x - 36, this.node.y + 130);
                break;
        }
        cc.tween(this.node)
            .to(0.08, { position: position }, { easing: 'linear' })
            .start();

        
    }, 

    recycleBullet() {
        this.node.removeFromParent();
        this.init();
        this.playerComponent.bulletPool.put(this.node);
    },

    update (dt) {
        if (this.isDestroy) this.recycleBullet();
        this.node.y += this.speed + this.speed * dt;
        
        if (this.node.y > this.game.height/2){
            this.recycleBullet();
        }
    },
});
