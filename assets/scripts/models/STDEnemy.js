cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        explosion1: cc.Prefab,
        randomRange: 0,
        isItemCont: false,
        basedYCordinate: 0,
        type: 0,
        audio: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    anim: null,
    isDead: false, 
    player: null,
    currentHp: 0,

    onLoad () {
        this.currentHp = this.hp;
        let game = cc.find('Canvas').getComponent('GameController');
        this.player = game.player.getComponent('Player');

        this.isDead = false;
        this.anim = this.getComponent(cc.Animation);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        var animState = this.anim.getAnimationState('explosion2');
        animState.wrapMode = cc.WrapMode.Normal;

        var node = this.node;
        

        this.anim.on('finished', function() {
            node.removeFromParent();
        });

    },
    getRandomNumber() {
        return Math.floor(Math.random() * (this.randomRange + 1)) - this.randomRange/2;
    },

    onCollisionEnter: function (other, self) {
        cc.audioEngine.playEffect(this.audio, false);

        let newExplosion1 = newExplosion1 = cc.instantiate(this.explosion1);
        newExplosion1.setPosition(this.getRandomNumber(),this.getRandomNumber());

        this.node.addChild(newExplosion1);

        switch(other.node.name){
            case 'Player':
                this.currentHp = 0;
                other.node.getComponent('Player').warning();
                break;
            case 'BulletPlayer':
                let bulletPlayer = other.node.getComponent('BulletPlayer');

                this.currentHp-= bulletPlayer.hp;

                bulletPlayer.hp -= this.hp;
                if (bulletPlayer.hp <= 0){
                    bulletPlayer.recycleBullet();
                }
                break;
            case 'BulletCircle':
                let bulletCircle = other.node.getComponent('BulletCircle');
                this.currentHp-= bulletCircle.hp;

                bulletCircle.hp -= this.hp;
                if (bulletCircle.hp <= 0){
                    bulletCircle.recycleBullet();
                }
                break;
        }

        var animState = this.anim.getAnimationState('explosion2');
        if (this.currentHp<=0 && !animState.isPlaying && !this.isDead) {
            this.anim.play('explosion2');

            if (this.isItemCont){
                this.node.parent.getComponent('EnemyController').createItem(this.node.x, this.node.y, this.type);
            }
        }
       
    },
    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
    },
    onCollisionExit: function (other, self) {
        // console.log('on collision exit');
    },

    onDestroy(){
        
    },
    
    start () {

    },
    update (dt) {
        
    },
});
