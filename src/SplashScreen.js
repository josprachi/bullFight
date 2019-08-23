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
		this.instlayer.reduceTime();	
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
				isGamePaused=!isGamePaused;
				isGameOver=false;				
				this.scheduleOnce(this.enterGame,0.5);	
	},
	enterGame:function(dt)
	{
		//cc.log("enter game  from splash"+ isGamePaused);
		cc.director.runScene(new splashScene());//GameScene());
		
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

GameTitle:null,
SuperGamingTitle:null,
varsionTitle:null,
	/*constructor*/
	ctor:function(){
		this._super();	
		return true;			 
	},

	/*Display splash image*/
	init:function(){

		this.splash= new cc.Sprite(res.mainMenuBkg_png);
		this.splash.setPosition(cc.winSize.width/2, cc.winSize.height/2);	
	
		
		this.addChild(this.splash,1); 


		this.GameTitle=new cc.LabelTTF("-SUPER BULL FIGHT-","Arial",45);
        this.GameTitle.setPosition(cc.winSize.width/2,cc.winSize.height*0.80);
        this.addChild(this.GameTitle, 3);

        this.SuperGamingTitle=new cc.LabelTTF("-SuperGaming-","Arial",30);
        this.SuperGamingTitle.setPosition(cc.winSize.width/2,cc.winSize.height*0.95);
        this.addChild(this.SuperGamingTitle, 3);


        this.varsionTitle=new cc.LabelTTF("Version: "+ 3.0,"Arial",24);
        this.varsionTitle.setPosition(cc.winSize.width/2,cc.winSize.height*0.1);
        this.addChild(this.varsionTitle, 3);
	},
	/*countdown timer for displaying menu*/
	reduceTime:function()
	{
		this.getParent().menuLayer.displayMenu();
	},
	/*onexit*/
	onExit:function()
	{
		this._super();
		this.removeAllChildren(true);		
	}

});

	var splashScene=cc.Scene.extend({
		
		instlayer:null,


		ctor : function() {
			this.instlayer=null;

			this._super();	
			return true;
			
		},

		/*Display splash layer*/
		onEnterTransitionDidFinish:function () 
		{
		
			this._super();
			this.instlayer=new splashLayer();		
			this.addChild(this.instlayer, 1);
			this.instlayer.init();
			//this.instlayer.reduceTime();	
			return true;
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
		  this.scheduleOnce(this.enterGame,0.5);	
		},
		enterGame:function(dt)
		{
			//cc.log("enter game  from splash"+ isGamePaused);
			cc.director.runScene(new GameScene());
			
		}

	});



	splashLayer=cc.Layer.extend({
		closeTime:2,
		collisionParticle:null,

		Player1Spr:null,	
		player1Score:null,
		Player1Name:null,
		Player2Spr:null,
		player2Score:null,
		Player2Name:null,
		vsSprite:null,
		Player1Crown:null,
		Player2Crown:null,
		
		/*constructor*/
		ctor:function(){
			this._super();	
			return true;			 
		},

		/*Display splash image*/
		init:function(){

		
		
		this.Player1Spr=new cc.Sprite(res.Player1_png);	
		this.player1Score=new cc.LabelTTF("0","Arial",30);       
		this.Player1Name=new cc.LabelTTF("Player1","Arial",24);
		this.Player1Crown=new cc.Sprite(res.crown_png);
		
		
		
		this.Player1Spr.setPosition(cc.winSize.width/2,cc.winSize.height*0.25);
		this.Player1Spr.setAnchorPoint(0.5,1);
		this.addChild(this.Player1Spr);
		this.player1Score.setPosition(cc.winSize.width*0.25,cc.winSize.height*0.1);
		this.addChild(this.player1Score);
		this.Player1Name.setPosition(cc.winSize.width/2,cc.winSize.height*0.1);
		this.addChild(this.Player1Name);

		this.Player2Spr=new cc.Sprite(res.Player2_png);	
		this.player2Score=new cc.LabelTTF("0","Arial",30);       
		this.Player2Name=new cc.LabelTTF("Player2","Arial",24);
		this.Player2Crown=new cc.Sprite(res.crown_png);
		this.Player2Spr.setPosition(cc.winSize.width/2,cc.winSize.height*0.75);
		
		this.Player2Spr.setAnchorPoint(0.5,0);
		this.addChild(this.Player2Spr);
		this.player2Score.setPosition(cc.winSize.width*0.25,cc.winSize.height*0.85);
		this.addChild(this.player2Score);
		this.Player2Name.setPosition(cc.winSize.width/2,cc.winSize.height*0.9);
		this.addChild(this.Player2Name);
		
		this.Player1Crown.setPosition(cc.winSize.width*0.2,cc.winSize.height*0.1);
		this.Player2Crown.setPosition(cc.winSize.width*0.2,cc.winSize.height*0.85);
		
		this.addChild(this.Player1Crown);
		this.addChild(this.Player2Crown);
		
		this.vsSprite=new cc.Sprite(res.vs_png);
		this.vsSprite.setPosition(cc.winSize.width/2,cc.winSize.height/2);
		this.addChild(this.vsSprite,6);
		
		
		this.schedule(this.reduceTime,0.25);
		 
		},
		/*countdown timer for displaying menu*/
		reduceTime:function()
		{
		this.closeTime--;
		if(this.closeTime==0)
			{this.unschedule(this.reduceTime);
		      this.movePlayers();
			  this.scheduleOnce(this.shake,0.5);			  
			  this.scheduleOnce(this.PlayGame,3);
			 
			}
		},
		
		
		
		PlayGame:function()
		{
     		this.getParent().playGame();
		},
		
		/*onexit*/
		onExit:function()
		{
			this._super();
			this.removeAllChildren(true);		
		},
		
		movePlayers:function()
		{
			var move =cc.moveTo(0.5, this.vsSprite.getPosition());
			var movecopy=move.clone();
			this.Player1Spr.runAction(move);
			this.Player2Spr.runAction(movecopy);
			
		},

		shake:function()
		{
		var move = cc.moveBy(0.05, cc.p(8, 8));
		var move_back = move.reverse();
		var move_seq = cc.sequence(move, move_back);
		var move_rep = move_seq.repeatForever();
		var t_copy = move_rep.clone();
		this.Player1Spr.runAction(move_rep);
		this.Player2Spr.runAction(t_copy);
		},

	});



