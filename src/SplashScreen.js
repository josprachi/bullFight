var isGamePaused=false;
var menuScene=cc.Scene.extend({

	menuLayer:null,
	instlayer:null,


	ctor : function() {
		this.instlayer=null;

		this._super();	
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) 
			{	var target = event.getCurrentTarget();
				var location = target.convertToNodeSpace(touch.getLocation());
				return true;
			},
			onTouchEnded: function (touch, event) {	
				var target = event.getCurrentTarget();
				var location = target.convertToNodeSpace(touch.getLocation());
				var targetSize = target.getContentSize();
				var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
				return true;
			}
		}, this);
		
	},

	/*Display splash layer*/
	onEnterTransitionDidFinish:function () 
	{
	
		this._super();
		this.instlayer=new instLayer();		
		this.addChild(this.instlayer, 1);
		this.instlayer.init();
		this.menuLayer=new menuLayer();
		this.menuLayer.init("mainMenu");
		this.addChild(this.menuLayer,6);
		this.menuLayer.setVisible(false);
		this.menuLayer.hideall();
		this.menuLayer.showMainMenu();	
		return true;
	},
	update:function(dt)
	{
		this.menuLayer.update(dt);
	},
	reset:function()
	{
	},

	/*Onexit*/
	onExit:function()
	{
		this._super();
		this.removeAllChildren(true);
	},
	
	/*Scene transition*/
	onExitTransitionDidStart:function()
	{

	},
	playGame:function()
	{
		
		{
				//isGamePaused=true;
				isGamePaused=!isGamePaused;
				isGameOver=false;				
				this.scheduleOnce(this.enterGame,0.5);
			}	
	},
	enterGame:function(dt)
	{
		//cc.log("enter game  from splash"+ isGamePaused);
		cc.director.runScene(new GameScene());
		
	}

});


/*Layer to display splash image and transition of scene into game scene*/
instLayer=cc.Layer.extend({
	closeTime:3,
	splash:null,
	nameLabel:null,
	isInstOn:false,
	instLabel:null,
	ind:0,
	/*constructor*/
	ctor:function(){
		this._super();	

		/*event manager for user input*/	
		return true;
		//this.init();		 
	},

	/*Display splash image*/
	init:function(){

		this.splash= new cc.Sprite(res.Background_png);
		this.splash.setPosition(cc.winSize.width/2, cc.winSize.height/2);	
	
		
		this.addChild(this.splash,1); 
		this.nameLabel=new cc.Sprite(res.title_png);
		this.addChild(this.nameLabel, 3);	
		this.nameLabel.setPosition(cc.winSize.width/2,cc.winSize.height*0.80);
		this.schedule(this.reduceTime,0.25);
	//	this.scheduleUpdate();
		return true;
	},

	


	/*countdown timer for displaying menu*/
	reduceTime:function(dt)
	{
		this.closeTime--;
		if(this.closeTime==0){
			this.getParent().menuLayer.displayMenu();
			}
		/*if(!cc.sys.isMobile)
		{
			if(this.closeTime==0){
			this.getParent().menuLayer.displayMenu();
			}
		}
		else
		{
			if(typeof window.orientation === 'undefined')
			{
				if(this.closeTime<=0 && window.matchMedia("(orientation: landscape)").matches)		
				{
			
					this.closeTime=3;
				}

				if(this.closeTime==0 && window.matchMedia("(orientation: portrait)").matches)
				{
				
				this.getParent().menuLayer.displayMenu();
				}					
			}
			else
			{
				if(this.closeTime<=0 && (((window.orientation===(90)||(window.orientation===(-90))) )))
				{
				this.closeTime=3;
				}
				if(this.closeTime==0 && !(window.orientation===(90)||(window.orientation===(-90))))
				{
				this.getParent().menuLayer.displayMenu();
				}
			}
		}*/
	},

	/*update*/
	/*update:function(dt)
	{
		if(this.ind!=langIndex)
		{
		this.setCopyStr();
		this.ind=langIndex;
		
		}
	},*/

	/*onexit*/
	onExit:function()
	{
		this._super();
		this.removeAllChildren(true);		
	}

});

