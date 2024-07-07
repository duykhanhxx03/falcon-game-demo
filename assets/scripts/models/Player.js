cc.Class({
    extends: cc.Component,

    properties: {
        level: 0,   
        bulletPrefab:cc.Prefab,
        bulletCirclePrefab: cc.Prefab,
        bulletLevel: 0,
        itemCount: 0,
        bulletSound: cc.AudioClip,
        game: cc.Node,
        bulletPool: cc.NodePool,
        bulletCirclePool: cc.NodePool,
    },

    deathTouchRemain: 0,
    isFire: false,  
    currentFireSpeedIndex: 0,
    fireSpeed: null,
    anim: null,
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.bulletPool = new cc.NodePool();
        this.initBulletPool();

        this.bulletCirclePool = new cc.NodePool();
        this.initBulletCirclePool();
        
        this.fireSpeed = {
            1: 0.16,
            2: 0.14,
        };
        this.itemCount = 0;
        this.isFire = false;
        this.currentFireSpeedIndex = 1;
        this.level = 1;
        this.isFire = false;
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('player_lv1');
    },

    initBulletPool() {
        let initialBulletCount = 200;
        for (let i = 0; i < initialBulletCount; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    },


    initBulletCirclePool() {
        let initialBulletCount = 100;
        for (let i = 0; i < initialBulletCount; ++i) {
            let bullet = cc.instantiate(this.bulletCirclePrefab);
            this.bulletCirclePool.put(bullet);
        }
    },

    warning(){
        this.game.getComponent('GameController').warning();
    },

    start () {
        
    },

    upgradeBulletLevel(){
        if (this.bulletLevel < 2){
            this.bulletLevel++;
            this.unscheduleAllCallbacks();
            this.isFire = false;
            this.fire();
        }
    },

    upgradeFireSpeed(){
        if (this.currentFireSpeedIndex < 2){
            this.currentFireSpeedIndex++;
            this.unscheduleAllCallbacks();
            this.isFire = false;
            this.fire();
        }
    },

    upgradePlayer: function(){
        this.anim.play('player_lv2_bounce_in');
        this.level = 2;
        this.bulletLevel = 3;
        this.unscheduleAllCallbacks();
        this.isFire = false;
        this.fire();
    },

    fire: function(){
        let gameController = this.game.getComponent('GameController');

        const bulletLv1Posision = [-15, -15, +15, +15];
        const bulletLv1Direction = [-1, 1, -1, 1];

        const bulletLv2Posision = [-16, -16, -16,  +16, +16, +16];
        const bulletLv2Direction = [-2, 0, 2, -2, 0, 2];

        const bulletLv3Posision = [0, 0, 0, 0, 0, 0, 0];
        const bulletLv3Direction = [-33,-32,-31, 0, 31, 32, 33];
        cc.audioEngine.setEffectsVolume(0.5);

        switch(this.bulletLevel){
            case 1:
                if (gameController.isMouseTouch && !this.isFire){
                    let callback = function(){
                        cc.audioEngine.playEffect(this.bulletSound, false);
                        if (this.isFire && !gameController.isMouseTouch){
                            this.isFire = false;
                            console.log("unschedule");
                            this.unschedule(callback);
                            // this.unscheduleAllCallbacks();
                        }
                        for (let i = 0; i < 4; i++){
                            let bullet = null;
                            if (this.bulletPool.size() > 0) {
                                bullet = this.bulletPool.get();
                            } else {
                                bullet = cc.instantiate(this.bulletPrefab);
                                console.log("new bullet");
                            }

                            bullet.scaleX = 0.8;
                            bullet.scaleY = 1;

                            bullet.getComponent("BulletPlayer").isDestroy = false;
                            bullet.getComponent("BulletPlayer").direction = bulletLv1Direction[i];
                            bullet.getComponent("BulletPlayer").playerComponent = this;
                            bullet.getComponent("BulletPlayer").hp = 5;

                            bullet.setPosition(this.node.position.x + bulletLv1Posision[i], this.node.position.y + 60);
                            this.node.parent.addChild(bullet);
                            bullet.getComponent("BulletPlayer").startAnim();
                        }        
                    };

                    this.schedule(callback, this.fireSpeed[this.currentFireSpeedIndex]);
                    this.isFire = true;
                }
                
                break;
            case 2:
                if (gameController.isMouseTouch && !this.isFire){
                    let callback = function(){
                        cc.audioEngine.playEffect(this.bulletSound, false);
                        if (this.isFire && !gameController.isMouseTouch){
                            this.isFire = false;
                            console.log("unschedule");
                            this.unschedule(callback);
                            // this.unscheduleAllCallbacks();
                        }
                        for (let i = 0; i < 6; i++){
                            let bullet = null;
                            if (this.bulletPool.size() > 0) {
                                bullet = this.bulletPool.get();
                            } else {
                                bullet = cc.instantiate(this.bulletPrefab);
                                console.log("new bullet");
                            }
                            bullet.getComponent("BulletPlayer").isDestroy = false;
                            bullet.getComponent("BulletPlayer").direction = bulletLv2Direction[i];
                            bullet.getComponent("BulletPlayer").playerComponent = this;
                            bullet.getComponent("BulletPlayer").hp = 15;
                            bullet.getComponent("BulletPlayer").bulletLevel = 2;
                            

                            bullet.scaleX = 0.8;
                            bullet.scaleY = 1;

                            bullet.setPosition(this.node.position.x + bulletLv2Posision[i], this.node.position.y + 60);
                            this.node.parent.addChild(bullet);
                            bullet.getComponent("BulletPlayer").startAnim();
                        }   
                    };

                    this.schedule(callback, this.fireSpeed[this.currentFireSpeedIndex]);
                    this.isFire = true;
                }
                break;
            case 3:
                if (gameController.isMouseTouch && !this.isFire){
                    let callback = function(){
                        cc.audioEngine.playEffect(this.bulletSound, false);
                        if (this.isFire && !gameController.isMouseTouch){
                            this.isFire = false;
                            console.log("unschedule");
                            this.unschedule(callback);
                            // this.unscheduleAllCallbacks();
                        }

                        for (let i = 0; i < 7; i++){
                            let bullet = null;
                            if (this.bulletPool.size() > 0) {
                                bullet = this.bulletPool.get();
                            } else {
                                bullet = cc.instantiate(this.bulletPrefab);
                                console.log("new bullet");
                            }
                            bullet.getComponent("BulletPlayer").isDestroy = false;
                            bullet.getComponent("BulletPlayer").direction = bulletLv3Direction[i];
                            bullet.getComponent("BulletPlayer").playerComponent = this;
                            bullet.getComponent("BulletPlayer").hp = 30;

                            bullet.scaleX = 0.8;
                            bullet.scaleY = 1;
                            bullet.setPosition(this.node.position.x + bulletLv3Posision[i], this.node.position.y + 60);
                            this.node.parent.addChild(bullet);
                            bullet.getComponent("BulletPlayer").startAnim();
                        }
                        
                        
                        // bullet circle
                        let bulletCircle = null;
                        if (this.bulletCirclePool.size() > 0) {
                            bulletCircle = this.bulletCirclePool.get();
                        } else {
                            bulletCircle = cc.instantiate(this.bulletCirclePrefab);
                        }

                        bulletCircle.scaleX = 0.3;
                        bulletCircle.scaleY = 0.3;
                        
                        bulletCircle.getComponent("BulletCircle").isDestroy = false;
                        bulletCircle.setPosition(this.node.position.x - 20, this.node.position.y + 60);
                        bulletCircle.getComponent("BulletCircle").startAnim();
                        bulletCircle.getComponent("BulletCircle").playerComponent = this;
                        bulletCircle.getComponent("BulletCircle").hp = 30;
                        this.node.parent.addChild(bulletCircle);
                        
                        // bullet circle
                        bulletCircle = null;
                        if (this.bulletCirclePool.size() > 0) {
                            bulletCircle = this.bulletCirclePool.get();
                        } else {
                            bulletCircle = cc.instantiate(this.bulletCirclePrefab);
                            console.log("new bullet");
                        }

                        bulletCircle.scaleX = 0.3;
                        bulletCircle.scaleY = 0.3;

                        bulletCircle.getComponent("BulletCircle").isDestroy = false;
                        bulletCircle.setPosition(this.node.position.x + 20, this.node.position.y + 60);
                        bulletCircle.getComponent("BulletCircle").playerComponent = this;
                        bulletCircle.getComponent("BulletCircle").hp = 35;
                        bulletCircle.getComponent("BulletCircle").startAnim();
                        this.node.parent.addChild(bulletCircle);
                    };
                   
                    this.schedule(callback, this.fireSpeed[this.currentFireSpeedIndex]);
                    this.isFire = true;
                }
                   
                break
        }
    },

    update (dt) {
        switch(this.level){
            case 1:
                break;
            case 2:
                var animState = this.anim.getAnimationState('player_lv2_bounce_in');
                if (!animState.isPlaying && !this.anim.getAnimationState('player_lv2').isPlaying){
                    this.anim.play('player_lv2');
                }
                break;
        }
        
    },
});
