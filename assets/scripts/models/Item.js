cc.Class({
    extends: cc.Component,

    properties: {
        Item1: cc.Prefab,
        Item2: cc.Prefab,
        Item3: cc.Prefab,
        Item4: cc.Prefab,
        Ttem_upgrade_player: cc.Prefab,
        type: 0,
        ItemBullet: cc.Prefab,
        audio: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:
    anim: null,
    game: null,

    getRandomNumber(n) {
        return Math.floor(Math.random() * (2 * n + 1)) - n;
    },
    onLoad () {
        cc.tween(this.node)
            .to(0.15, { position: cc.v2(this.node.x + this.getRandomNumber(40), this.node.y + this.getRandomNumber(40)) },
                { easing: 'cubicOut' },)
            .start();
        this.game = cc.find('Canvas').getComponent('GameController');
        this.anim = this.getComponent(cc.Animation);
        //collision manager
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        if (this.type>=1 && this.type<=4){
            var itemBullet = cc.instantiate(this.ItemBullet);
            itemBullet.setPosition(0,0);
            this.node.addChild(itemBullet);
        }

        if (this.type == 5){
            var item5 = cc.instantiate(this.Ttem_upgrade_player);
            item5.setPosition(0,0);
            this.node.addChild(item5);
        }

        switch(this.type){
            case 1: 
                var item1 = cc.instantiate(this.Item1);
                item1.setPosition(0,0);
                this.node.addChild(item1);
                break;
            case 2:
                var item2 = cc.instantiate(this.Item2);
                item2.setPosition(0,0);
                this.node.addChild(item2);
                
                break;
            case 3:
                var item3 = cc.instantiate(this.Item3);
                item3.setPosition(0,0);
                this.node.addChild(item3);
                break;
            case 4:
                var item4 = cc.instantiate(this.Item4);
                item4.setPosition(0,0);
                this.node.addChild(item4);
                break;
        }
    },
    
    onCollisionStay (other, self) {
        var playerPosition = other.node.position;

        var dist = this.node.position.sub(playerPosition).mag();

        let player = other.getComponent('Player');

        const speed = 6;
        if (dist > 30){
            if (this.game.isMouseTouch){
                if (this.node.x > playerPosition.x){
                    this.node.x -= speed;
                } else if (this.node.x < playerPosition.x){
                    this.node.x += speed;
                }
    
                if (this.node.y > playerPosition.y){
                    this.node.y -= speed;
                } else if (this.node.y < playerPosition.y){
                    this.node.y += speed;
                }
            }
        } else {
            ++player.itemCount;
            if (this.type==5){
                player.upgradePlayer();
            } else 
            switch(player.itemCount){
                case 1: 
                    break;
                case 2:
                    player.upgradeBulletLevel();
                    break;
                case 3:
                    player.upgradeFireSpeed();
                    break;
            }
            this.node.destroy();
            
        }
    },

    start () {

    },

    onDestroy(){
        cc.audioEngine.playEffect(this.audio, false);
    },

    update (dt) {
        if (this.game.isMouseTouch){
            this.node.y-=2;
        }
        if (this.node.y < -1280/2){
            this.node.destroy();
        }
    }
});
