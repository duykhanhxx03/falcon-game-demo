cc.Class({
    extends: cc.Component,

    properties: {
        backgroundPrefab:{
            default: null,
            type: cc.Prefab,
        },
        player: {
            default: null,
            type: cc.Node
        },
        nhaydo: cc.Prefab,
        isMouseTouch: false,
    },
    
    // LIFE-CYCLE CALLBACKS:
    // setMouseTouchEnd(){
    //     this.isMouseTouch = false;
    // },

    onLoad () {
        this.isMouseTouch = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.setMouseTouchEnd, this);

        this.player.y = -this.node.height/2 - 50;

        cc.tween(this.player)
            .to(1, { position: cc.v2(0, -this.node.height/2 + 100) }, { easing: 'cubicInOut' })
            .start();

        //add first background
        const bgHeight = 1280;
        const bgWidth = 880;
        this.addNewBGParallax(-bgWidth/2,bgHeight/2);
        this.addNewBGParallax(bgWidth/2,bgHeight/2);
        this.addNewBGParallax(-bgWidth/2,-bgHeight/2);
        this.addNewBGParallax(+bgWidth/2,-bgHeight/2);
    },

    onTouchMove (event) {
        this.isMouseTouch = true;
        var newPos = cc.v2(event.getLocation().x - this.node.width/2, event.getLocation().y - this.node.height/2);
        // console.log(this);
        this.player.setPosition(newPos);
        this.player.getComponent('Player').fire(); 
    },

    setMouseTouchEnd(){
        this.isMouseTouch = false;
    },

    disableTouch(){
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.setMouseTouchEnd, this);
        this.player.getComponent('Player').unscheduleAllCallbacks();
    },

    
    onDestroy(){
        this.disableTouch();
    },

    warning(){
        let tmp = cc.instantiate(this.nhaydo);
        this.node.addChild(tmp);
        tmp.setPosition(0,0);
        var screenH = cc.view.getVisibleSize().height;
        var screenW = cc.view.getVisibleSize().width;
        tmp.width = screenW;
        tmp.height = screenH;
    },


    addNewBGParallax: function(x, y){
        var newBackgroundPrefab = cc.instantiate(this.backgroundPrefab);
        this.node.insertChild(newBackgroundPrefab, 0);
        newBackgroundPrefab.setPosition(x,y);
       
        newBackgroundPrefab.getComponent("Background").game = this;
    },

    start () {

    },

    update (dt) {
        
    },

});
