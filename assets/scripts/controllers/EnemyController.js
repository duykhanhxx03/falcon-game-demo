cc.Class({
    extends: cc.Component,

    properties: {
        Bolatoa: cc.Prefab,
        BoOng_Xanhla: cc.Prefab,
        BoOng_Xanhduong: cc.Prefab,
        BoOng_Vang: cc.Prefab,
        RuoiOng_Xanhla: cc.Prefab,
        RuoiOng_Do: cc.Prefab,
        RuoiGiam_Vang: cc.Prefab,
        BoMuoi_Do: cc.Prefab,
        BoMuoi_Xanhla: cc.Prefab,
        BoMuoi_Xanh: cc.Prefab,
        Boss: cc.Prefab,
        Item: cc.Prefab,
        game: cc.Node,
        BolatoaPool: cc.NodePool,
        BoOng_XanhlaPool: cc.NodePool,
        BoOng_XanhduongPool: cc.NodePool,
        BoOng_VangPool: cc.NodePool,
        RuoiOng_XanhlaPool: cc.NodePool,
        RuoiOng_DoPool: cc.NodePool,
        RuoiGiam_VangPool: cc.NodePool,
        BoMuoi_DoPool: cc.NodePool,
        BoMuoi_XanhlaPool: cc.NodePool,
        BoMuoi_XanhPool: cc.NodePool,
    },

    // LIFE-CYCLE CALLBACKS:
    stage: 0,
    onLoad () {
        this.BolatoaPool = new cc.NodePool();
        this.BoMuoi_DoPool = new cc.NodePool();
        this.BoMuoi_XanhPool = new cc.NodePool();
        this.BoMuoi_XanhlaPool = new cc.NodePool();
        this.RuoiOng_DoPool = new cc.NodePool();
        this.RuoiOng_XanhlaPool = new cc.NodePool();
        this.RuoiGiam_VangPool = new cc.NodePool();
        this.BoOng_XanhlaPool = new cc.NodePool();
        this.BoOng_VangPool = new cc.NodePool();
        this.BoOng_XanhduongPool = new cc.NodePool();

        this.enemyInitStageMap = [
            {
                prefab: this.BoMuoi_Do,
                pool: this.BoMuoi_DoPool,
            },
            {
                prefab:this.BoMuoi_Xanh,
                pool: this.BoMuoi_XanhPool,
            },
            {
                prefab:this.BoMuoi_Xanhla,
                pool: this.BoMuoi_XanhlaPool,
            },
            {
                prefab:this.RuoiOng_Do,
                pool:this.RuoiOng_DoPool
            },
            {
                prefab:this.RuoiOng_Xanhla,
                pool:this.RuoiOng_XanhlaPool
            },
            {
                prefab:this.RuoiGiam_Vang,
                pool:this.RuoiGiam_VangPool
            },
            {
                prefab:this.BoOng_Xanhla,
                pool:this.BoOng_XanhlaPool
            },
            {
                prefab:this.BoOng_Vang,
                pool:this.BoOng_VangPool
            },
            {
                prefab:this.BoOng_Xanhduong,
                pool:this.BoOng_XanhduongPool
            },
        ];

        this.initEnemyPool();
        this.createEnemyStage1();
        
        this.node.setPosition(0, 0);
        this.stage = 1;
    },


    // [this.BoMuoi_Do, this.BoMuoi_Xanh, this.BoMuoi_Xanhla,
    //     this.RuoiOng_Do,  this.RuoiOng_Xanhla, this.RuoiGiam_Vang, this.BoOng_Xanhla, this.BoOng_Vang, this.BoOng_Xanhduong];

    enemyInitStageMap: null,


    initEnemyPool() {
        let initialEnemyCount = 4 * 7;
        for (let i = 0; i < this.enemyInitStageMap.length; i++) {
            for (let j = 0; j < initialEnemyCount; j++) {
                let enemyNode = cc.instantiate(this.enemyInitStageMap[i].prefab);
                this.enemyInitStageMap[i].pool.put(enemyNode);
            }
        }
    },

    createEnemyStage1(){
        let initStage1Map = [
            {
                prefab: this.BoOng_Vang,
                pool: this.BoOng_VangPool
            },
            {
                prefab: this.BoOng_XanhLa,
                pool: this.BoOng_XanhlaPool
            },
            {
                prefab: this.BoOng_Xanhduong,
                pool: this.BoOng_XanhduongPool
            },
        ];
        const offset = 300;
        let bolatoa = cc.instantiate(this.Bolatoa);
        bolatoa.y = offset;
        this.node.addChild(bolatoa);

        // Bo ong
        for (let i = 1; i<=3; i++){
            for (let j = 0; j<4; j++){
                let left = null;
                if (initStage1Map[i-1].pool.size() > 0) {
                    left = initStage1Map[i-1].pool.get();
                } else {
                    left = cc.instantiate(initStage1Map[i-1].prefab);
                    left.getComponent('STDEnemy').pool = this.Explosion1Pool;
                }

                let right = null;
                if (initStage1Map[i-1].pool.size() > 0) {
                    right = initStage1Map[i-1].pool.get();
                } else {
                    right = cc.instantiate(initStage1Map[i-1].prefab);
                    right.getComponent('STDEnemy').pool = this.Explosion1Pool;
                }

                // let left = cc.instantiate(boOngList[i-1]);
                // let right = cc.instantiate(boOngList[i-1]);
    
                left.y = right.y = this.game.height/2 + 100;
                left.x = -j * (40 + i * 3) - (20) - i * 5;
                right.x = j * (40 + i * 3) + (20) + i * 5;

                left.angle = +(90 - i * 7);
                right.angle = -(90 - i * 7);
    
                this.node.addChild(left); this.node.addChild(right);

                cc.tween(left)
                .to(0.4 + 0.15*i, { position: cc.v2(left.x, - (i * 45 - j * j * 3) - 40 + offset) },)
                .start();

                cc.tween(right)
                .to(0.4 + 0.15*i, { position: cc.v2( right.x, - (i * 45 - j * j * 3) - 40 + offset) },)
                .start();
            }
        }

        // Ruoi ong xanh la
        for (let i = 0; i<3; i++){
            let left = null;
            if (this.RuoiOng_XanhlaPool.size() > 0) {
                left = this.RuoiOng_XanhlaPool.get();
            } else {
                left = cc.instantiate(this.RuoiOng_Xanhla);
                left.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }

            let right = null;
            if (this.RuoiOng_XanhlaPool.size() > 0) {
                right = this.RuoiOng_XanhlaPool.get();
            } else {
                right = cc.instantiate(this.RuoiOng_Xanhla);
                right.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }
            
            left.x = -100 - i * 30;
            right.x = 100 + i * 30;

            // left.y = + i * 30 + offset;
            // right.y = + i * 30 + offset;

            left.y = right.y = this.game.height/2 + 100;

            this.node.addChild(left); this.node.addChild(right);
            cc.tween(left)
            .to(0.5 + 0.1*i, { position: cc.v2(left.x, + i * 30 + offset) },)
            .start();

            cc.tween(right)
            .to(0.5 + 0.1*i, { position: cc.v2(right.x, + i * 30 + offset) },)
            .start();
        }

        // Ruoi ong do
        for (let i = 0; i<4; i++){
            let left = null;
            if (this.RuoiOng_DoPool.size() > 0) {
                left = this.RuoiOng_DoPool.get();
            } else {
                left = cc.instantiate(this.RuoiOng_Do);
                left.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }

            let right = null;
            if (this.RuoiOng_DoPool.size() > 0) {
                right = this.RuoiOng_DoPool.get();
            } else {
                right = cc.instantiate(this.RuoiOng_Do);
                right.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }
            
            left.x = -75 - i * 30;
            right.x = 75 + i * 30;

            // left.y = + i * 30 + 50 + offset;
            // right.y = + i * 30 + 50 + offset;

            left.angle = -45;
            right.angle = 45;

            left.y = right.y = this.game.height/2 + 100;

            this.node.addChild(left); this.node.addChild(right);
            cc.tween(left)
            .to(0.3 + 0.1*i, { position: cc.v2(left.x, + i * 30 + 50 + offset) },)
            .start();

            cc.tween(right)
            .to(0.3 + 0.1*i, { position: cc.v2(right.x, + i * 30 + 50 + offset) },)
            .start();
        }

        //item
        let n = this.node.children.length;
        for (let i = 0; i<3; i++){
            let enemy = this.node.children[this.getRandomNumber(n)].getComponent('STDEnemy');
            enemy.isItemCont = true;
            enemy.type = this.getRandomNumber(4) +1 ;
        }
        //item upgrade
        let enemy = this.node.children[this.getRandomNumber(n)].getComponent('STDEnemy');
        enemy.isItemCont = true;
        enemy.type = 5;
    },
    getRandomNumber(n) {
        return Math.floor(Math.random() * n);
    },

    createEnemyStage2(){
        const offset = this.game.height/2 + 100;
        this.node.setPosition(0, 0);

        let ex = 3;

        for (let k = 0; k<this.enemyInitStageMap.length - ex; k++){
            for (let i = 0; i<4; i++){
                let tmp = null;

                if (this.enemyInitStageMap[k].pool.size() > 0) {
                    tmp = this.enemyInitStageMap[k].pool.get();
                } else {
                    tmp = cc.instantiate(this.enemyInitStageMap[k].prefab);
                    tmp.getComponent('STDEnemy').pool = this.Explosion1Pool;
                }

                tmp.x = 0;
                tmp.y = 40 * i + k * 4 * 40 + offset;
                this.node.addChild(tmp);
                for (let j = 0; j<3; j++){
                    let left = null;
                    if (this.enemyInitStageMap[k].pool.size() > 0) {
                        left = this.enemyInitStageMap[k].pool.get();
                    } else {
                        left = cc.instantiate(this.enemyInitStageMap[k].prefab);
                        left.getComponent('STDEnemy').pool = this.Explosion1Pool;
                    }

                    let right = null;
                    if (this.enemyInitStageMap[k].pool.size() > 0) {
                        right = this.enemyInitStageMap[k].pool.get();
                    } else {
                        right = cc.instantiate(this.enemyInitStageMap[k].prefab);
                        left.getComponent('STDEnemy').pool = this.Explosion1Pool;
                    }

                    // let left = cc.instantiate(list[k]);
                    // let right = cc.instantiate(list[k]);
        
                    left.x = -55 * (j+1);
                    right.x = 55 * (j+1);
                    left.y = right.y = 40 * i + k * 4 * 40 + offset;
    
                    this.node.addChild(left); this.node.addChild(right);
                }
            }
        }

        // bolatoa row: 4
        for (let i = 1; i<=2; i++){
            let left = null;
            if (this.BolatoaPool.size() > 0) {
                left = this.BolatoaPool.get();
            } else {
                left = cc.instantiate(this.Bolatoa);
                left.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }

            let right = null;
            if (this.BolatoaPool.size() > 0) {
                right = this.BolatoaPool.get();
            } else {
                right = cc.instantiate(this.Bolatoa);
                right.getComponent('STDEnemy').pool = this.Explosion1Pool;
            }
            // let left = cc.instantiate(this.Bolatoa);
            // let right = cc.instantiate(this.Bolatoa);
            left.x = -i * 55  + (i==1? 0:-55);
            right.x = i * 55  + (i==1? 0:55);
            left.y = right.y = (this.enemyInitStageMap.length - ex) * 4 * 40 + 10 + offset;

            this.node.addChild(left); this.node.addChild(right);
        }

        // //bolatoa row: element: 3
        
        let left = null;
        if (this.BolatoaPool.size() > 0) {
            left = this.BolatoaPool.get();
        } else {
            left = cc.instantiate(this.Bolatoa);
            left.getComponent('STDEnemy').pool = this.Explosion1Pool;
        }

        let mid = null;
        if (this.BolatoaPool.size() > 0) {
            mid = this.BolatoaPool.get();
        } else {
            mid = cc.instantiate(this.Bolatoa);
            mid.getComponent('STDEnemy').pool = this.Explosion1Pool;
        }

        let right = null;
        if (this.BolatoaPool.size() > 0) {
            right = this.BolatoaPool.get();
        } else {
            right = cc.instantiate(this.Bolatoa);
            right.getComponent('STDEnemy').pool = this.Explosion1Pool;
        }

        // let left = cc.instantiate(this.Bolatoa);
        // let mid = cc.instantiate(this.Bolatoa);
        // let right = cc.instantiate(this.Bolatoa);
        left.x = -55 * 2;
        mid.x = 0;
        right.x = 55 * 2;
        left.y = mid.y = right.y = (this.enemyInitStageMap.length - ex) * 4 * 40 + 100 + offset;

        this.node.addChild(left); this.node.addChild(mid); this.node.addChild(right);
        // console.log(this.BolatoaPool);
        
    },

    createEnemyStage3(){
        this.game.getComponent('GameController').disableTouch();

        let player = this.game.getComponent('GameController').player;

        cc.tween(player)
            .to(1, { position: cc.v2(0, -this.game.height/3 + 50) }, { easing: 'cubicInOut' })
            .start();

        let boss = cc.instantiate(this.Boss);
        let skeleton = boss.getComponent(sp.Skeleton);
        this.node.addChild(boss);
        const offset = (this.game.height / 2) - boss.height * boss.scale/2 - 150;

        const desination = cc.v2(0, offset - 200);
        this.node.setPosition(0, 0);
        boss.y = offset + 300;
        // boss.y = offset;

        cc.tween(boss)
            .to(1, { position: cc.v2(0, offset) }, { easing: 'cubicInOut' })
            .start()

        cc.tween(boss)
            .repeatForever(
                cc.tween()
                .to(1, { position: desination }, { easing: 'cubicInOut' })
                .call(()=>{
                    skeleton.setAnimation(0, 'Attack 1_offset', false);
                })
                .to(1.5, { position: desination },)
                .to(1, { position: cc.v2(0, offset) }, { easing: 'cubicOut' })
                .call(()=>{
                    skeleton.setAnimation(0, 'idle_offset', false);
                })
                .to(1.5, { position: cc.v2(0, offset) },)

                // change animation
                .to(1, { position: desination }, { easing: 'cubicInOut' })
                .call(()=>{
                    skeleton.setAnimation(0, 'Attack 2_offset', false);
                })
                .to(1.5, { position: desination },)
                .to(1, { position: cc.v2(0, offset) }, { easing: 'cubicOut' })
                .call(()=>{
                    skeleton.setAnimation(0, 'idle_offset', false);
                })
                .to(1.5, { position: cc.v2(0, offset) },)
            )
            .start();

    },


    createItem(x, y, type){
        var item = cc.instantiate(this.Item);
        item.getComponent('Item').type = type;

        item.setPosition(x, y);

        this.node.addChild(item);
    },

    start () {
    },

    update (dt) {
        if (this.stage === 1 && this.node.children.length === 0){
            this.stage = 2;
            this.createEnemyStage2();
            
        }
        if (this.stage === 2){
            if (this.node.children.length !== 0){
                for (let i = 0; i<this.node.children.length; i++){
                    this.node.children[i].y -= 2;
                    if (this.node.children[i].y < -this.game.height/2){
                        this.node.children[i].destroy();
                    }
                }
            } else {
                this.stage = 3;
                this.createEnemyStage3();
            }
        }
    },
});
