
cc.game.onStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    cc.view.adjustViewPort(true);
    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
    cc.view.setDesignResolutionSize(640,960, cc.ResolutionPolicy.SHOW_ALL);
     //var screenSize = cc.view.getFrameSize();
    //console.log("screen size is "+ screenSize.width+";"+screenSize.height);
    cc.view.resizeWithBrowserSize(true);
    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new menuScene());//GameScene());
    }, this);
};
cc.game.run();