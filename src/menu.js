var SUB_INDEX_MAINMENU= 0,SUB_INDEX_INSTMENU= 0,SUB_INDEX_PAUSEMENU= 1,SUB_INDEX_GAMEOVER=2;
var isShop=false;
var menuLayer=cc.Layer.extend({
	menuIndex:0,subMenuIndex:0,
	nextSc:0,closeTimer:2,
	menuNode:null,bgPanel:null,
	playerSelBtn1:null,playerSelBtn2:null,
	playBtn:null,mmPlayBtn:null,mainMenuBtn:null,restartBtn:null,pauseBtn:null,
	instLabel:null,menuTitle:null,
	
	ctor:function(str)
	{
		this._super();
	},

	init:function(str)
	{
		this.bgPanel=new cc.Sprite(res.instPanel_png);		
		this.bgPanel.setPosition(cc.winSize.width/2, cc.winSize.height*0.5);	
				
		this.addChild(this.bgPanel, 1);	
		
		switch(str)
		{
		case "mainMenu":
			//main menu 
			this.menuTitle= new cc.LabelTTF("","gameFont",30);
			this.addChild(this.menuTitle, 5);

			this.playerSelBtn1=new cc.MenuItemImage(res.PlayerSelBtn1,res.PlayerSelBtn1_grey,function(){vsComputer=true;this.playGame()},this); 
		
			this.playerSelBtn2=new cc.MenuItemImage(res.PlayerSelBtn2,res.PlayerSelBtn2_grey,function(){vsComputer=false;this.playGame()},this); 	
			
			this.menuNode=new cc.Menu(this.playerSelBtn1,this.playerSelBtn2);
			this.menuNode.setPosition(0, 0);
			this.addChild(this.menuNode, 1);
			this.menuIndex=0;
			this.hideall();
			this.showMainMenu();

			break;
		case "pauseMenu":
		this.menuTitle= new cc.LabelTTF("","gameFont",30);
			this.addChild(this.menuTitle, 5);
			//main pause menu	
			this.playBtn=new cc.MenuItemImage(res.PlayBtn_png,res.PlayBtn_red_png,res.PlayBtn_grey_png,function(){this.playGame()},this); 
			//this.mainMenuBtn=new cc.MenuItemImage(res.menuBtnPng,res.menuBtnSelPng,function(){this.sendToMainMenu()},this); 
			this.restartBtn=new cc.MenuItemImage(res.RestartBtn_png,res.RestartBtn_red_png,res.RestartBtn_grey_png,function(){this.restartGame()},this); 
			
			/////////////////
			this.menuNode=new cc.Menu(this.playBtn,this.restartBtn);
			this.menuNode.setPosition(0, 0);
			this.addChild(this.menuNode, 1);
            this.menuTitle.setPosition(cc.winSize.width*0.45,cc.winSize.height*0.6);
			this.menuIndex=1;	
				
			this.hideall();
			this.showPauseMenu();

			break;

		default:
			//copy main menu 

			break;
		}	
		
		
		return true;
	},
	update:function(dt)
	{
		if(cc.screen.fullScreen() )//&& resizeMe==true)
		{
			cc.view.resizeWithBrowserSize(true);
			//resizeMe=false;
		}
		
	},

	/*for back button*/
	/*goBack:function()
	{
		this.playSfx();
		this.hideall();

		if(this.menuIndex==0)
		{
		this.showMainMenu();		
		}
		else if(this.menuIndex==1)
		{
			 if(isGameOver)
			{
				this.showGameOver();	
			}
			else{
				this.showPauseMenu();
			}
		}
	
		this.displayMenu();


	},*/

	/*menu transition*/
	displayMenu:function()
	{
		this.menuNode.setEnabled(false); 
		if(this.menuIndex==0 )
		  {
		   
		    this.setVisible(true);
	    	this.playerSelBtn1.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.6);
			this.playerSelBtn2.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.4);   
		
		   this.scheduleOnce(this.stopMenuTransition,1.5);
		  }
		  
		  else
		  {
		   this.setVisible(true);		  
		    this.playBtn.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.6);
			this.restartBtn.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.4);   
		    
		    this.stopMenuTransition(0.0);
		  // this.scheduleOnce(this.stopMenuTransition,1.01);
		  }

	},
	
	 stopMenuTransition:function(dt)
		 {
		 this.menuNode.setEnabled(true); 
		 },

	/*hide menu objects*/
	hideall:function()
	{
		this.bgPanel.setVisible(false);
		if(this.menuIndex==0)
		{
			this.playerSelBtn1.setVisible(false);
			this.playerSelBtn2.setVisible(false);
		}
		else
		{
			
			this.playBtn.setVisible(false);
			this.restartBtn.setVisible(false);

		}
	},

	/*display main menu*/
	showMainMenu:function()
	{		this.bgPanel.setVisible(true);
			this.playerSelBtn1.setVisible(true);
			this.playerSelBtn2.setVisible(true);
	},


	/*display pause menu*/
	showPauseMenu:function()
	{
		isGamePaused=true;
		//cc.log("show PauseMenu");
		this.bgPanel.setVisible(true);
		this.playBtn.setVisible(true);
		this.restartBtn.setVisible(true);
		if(isGameOver)
		{
			this.playBtn.setVisible(false);
			this.playBtn.setEnabled(false);
			//this.getParent().setGameOver();
			this.menuTitle.setVisible(true);

		}
		else
		{
			this.menuTitle.setVisible(false);
		}
	},

	setMenuTitle:function(str)
	{cc.log(str);
      this.menuTitle.setString(str);
	},

	/*display instructions*/
	showInstructions:function()
	{
		
	},

	/*display game over screen*/
	/*showGameOver:function()
	{
	
	},*/

	/*call back function for play button*/
	playGame:function()
	{	
		
       var par=this.getParent();
		
		par.playGame();
	},

	/*callback function for restart button*/
	restartGame:function()
	{
		isGamePaused=true;
		isGameOver=false;		
		this.nextSc=0;
		this.schedule(this.nextSceneTimer,1.0);
	},


	/*callback function for main menu button*/
	sendToMainMenu:function()
	{
		isGamePaused=true;
		isGameOver=false;	
		this.nextSc=0;
		this.schedule(this.nextSceneTimer,1.0);
	},
	nextSceneTimer:function(dt)
	{
		if(this.closeTimer<0)
		{
			this.closeTimer--;		
		}
		else
		{
			this.unschedule(this.nextSceneTimer);
			this.nextScene(this.nextSc);
		}

	},
	nextScene:function(sceneNo)
	{

		
		/*if(cc.sys.isMobile)
		{
			cc.screen.requestFullScreen(document.getElementById('gameCanvas'));
		}*/
	
		switch(sceneNo)
		{
		
		case 0:	
			cc.director.runScene(new cc.TransitionFade(1.0,new menuScene(),000));
			break;
		case 1:
			if(!isGameOver)
			cc.director.runScene(new cc.TransitionFade(1.0,new GameScene(),000));
		
			break;
		default:
			cc.director.runScene(new cc.TransitionFade(1.0,new menuScene(),000));
		break;		
		}

	},



	onExit:function()
	{
		this._super();
		this.removeAllChildren(true);		
	}


});