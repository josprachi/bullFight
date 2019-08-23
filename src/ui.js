	var bullButton=cc.MenuItemImage.extend({
	  refreshTime:0,manaRequired:0,isRefreshed:true,
	  priceTag:null,
	  
	  ctor:function(normalImage, selectedImage, disabledImage, callback, target,manaRequired)
	  {
		this._super(normalImage, selectedImage, disabledImage, callback, target);
		this.manaRequired=manaRequired;
		this.priceTag=new cc.LabelTTF(this.manaRequired,"Arial",26);
		this.priceTag.setColor(new cc.color(0,0,0,1));
		
		this.addChild(this.priceTag);
		return true;
	  },
	 
	  lock:function()
	  {
		  this.setEnabled(false);
		  this.isRefreshed=false;
	  },

	 recharge:function(dt)
	 {
	  this.isRefreshed=true;
	 },

	});



	var playerBase= cc.Node.extend({
	isPrimary:false, life_remaining:100,mana_remaining:100,catapultPower:0,
	bkgSprite:null,
	playerSprite:null, 
	//powerButtons:null, 
	manaBar:null,manaIndicator:null,
	lifeBarBkg:null,manaBarBkg:null, 
	lifeBar:null, lifeIndicator:null,
	catapultSprite:null,catapultDisabledSprite:null,catapultBtn:null, 
	bullButtons:null, bullMenu:null,
	powermenu:null,

	smallBullBtn:null,
	mediumBullBtn:null,
	normalBullBtn:null,
	heavyBullBtn:null,
	jumboBullBtn:null,
	gientbullBtn:null,
	racerbullBtn:null,

	ctor:function(isPrimary)
	{
	this._super();
	this.isPrimary=isPrimary;

	return true;
	},
	init:function(bkgImage,playerImage)
	{
		this.bkgSprite=new cc.Sprite(bkgImage);
		this.playerSprite=new cc.Sprite(playerImage);
		this.playerSprite.setAnchorPoint(0.5,0.5);
		this.playerSprite.setScale(0.35,0.35);
	   
		this.manaBar= new cc.ProgressTimer(new cc.Sprite(res.ManaIndicator_png));
		this.manaBar.setType(cc.ProgressTimer.TYPE_BAR);
		this.manaBar.setBarChangeRate(cc.p(1,0));
		this.manaBar.setMidpoint(cc.p(0,0));
		this.manaBar.setPercentage(this.mana_remaining);

	   this.lifeBar= new cc.ProgressTimer(new cc.Sprite(res.lifeBar_png));
	   this.lifeBar.setType(cc.ProgressTimer.TYPE_BAR);
	   this.lifeBar.setBarChangeRate(cc.p(1,0));
	   this.lifeBar.setMidpoint(cc.p(0,0));
	   this.lifeBar.setPercentage(this.life_remaining);

	   this.manaBarBkg=new cc.Sprite(res.IndicatorManaBar_png);

	   this.lifeBarBkg=new cc.Sprite(res.IndicatorBar_png);
		  
	 
		this.bullButtons=[];

		this.smallBullBtn=new bullButton(res.Chars_png[SMALL],res.Chars_blue_png[SMALL],res.Chars_grey_png[SMALL],function(){this.releaseBull(SMALL)},this,BULL_MANA[SMALL]);
		this.normalBullBtn=new bullButton(res.Chars_png[NORMAL],res.Chars_blue_png[NORMAL],res.Chars_grey_png[NORMAL],function(){this.releaseBull(NORMAL)},this,BULL_MANA[NORMAL]);
		this.mediumBullBtn=new bullButton(res.Chars_png[MEDIUM],res.Chars_blue_png[MEDIUM],res.Chars_grey_png[MEDIUM],function(){this.releaseBull(MEDIUM)},this,BULL_MANA[MEDIUM]);
		this.heavyBullBtn=new bullButton(res.Chars_png[HEAVY],res.Chars_blue_png[HEAVY],res.Chars_grey_png[HEAVY],function(){this.releaseBull(HEAVY)},this,BULL_MANA[HEAVY]);
		this.gientBullBtn=new bullButton(res.Chars_png[GIENT],res.Chars_blue_png[GIENT],res.Chars_grey_png[GIENT],function(){this.releaseBull(GIENT)},this,BULL_MANA[GIENT]);
		this.jumboBullBtn=new bullButton(res.Chars_png[JUMBO],res.Chars_blue_png[JUMBO],res.Chars_grey_png[JUMBO],function(){this.releaseBull(JUMBO)},this,BULL_MANA[JUMBO]);
		this.racerBullBtn=new bullButton(res.Chars_png[RACER],res.Chars_blue_png[RACER],res.Chars_grey_png[RACER],function(){this.releaseBull(RACER)},this,BULL_MANA[RACER]);
		
		this.bullButtons.push(this.smallBullBtn);
		this.bullButtons.push(this.normalBullBtn);
		this.bullButtons.push(this.mediumBullBtn);
		this.bullButtons.push(this.heavyBullBtn);
		this.bullButtons.push(this.jumboBullBtn);
		this.bullButtons.push(this.gientBullBtn);
		this.bullButtons.push(this.racerBullBtn);

		for(var i=0; i<this.bullButtons.length;i++)
		{
			
			this.bullButtons[i].setAnchorPoint(0.5,0.5);
			//if(this.isPrimary)
			{
			this.bullButtons[i].setPosition(this.bkgSprite.width*0.125*(i+1),0);     
			this.bullButtons[i].priceTag.setPosition(cc.p(this.bullButtons[i].width*0.75,this.bullButtons[i].height*0.85));
			
			}
			/*else
			{
			this.bullButtons[i].setPosition(this.bkgSprite.width*0.125*(i+1),0);
			this.bullButtons[i].priceTag.setPosition(cc.p(this.bullButtons[i].width*0.5,this.bullButtons[i].height*1.1));
			} */       
            
		}

		
		
		//if(this.isPrimary)
		{
			this.lifeBarBkg.setPosition(cc.p(this.bkgSprite.width*0.5,this.bkgSprite.height+this.lifeBarBkg.height*0.5));//this.lifeBarBkg.height*0.5));
		    this.manaBarBkg.setPosition(cc.p(this.bkgSprite.width*0.5,-this.manaBarBkg.height*0.75));
	
			this.playerSprite.setPosition(this.bkgSprite.width/2,(this.bkgSprite.height+this.playerSprite.height*0.15));
			//this.manaBar.setMidpoint(cc.p(0,0));
			this.manaBar.setPosition(this.manaBarBkg.getPosition());//(this.bkgSprite.width*3/4,(this.bkgSprite.height+this.playerSprite.height*0.15));
			this.lifeBar.setPosition(this.lifeBarBkg.getPosition());//(this.bkgSprite.width/4,(this.bkgSprite.height+this.playerSprite.height*0.15));
			this.setAnchorPoint(0.5,1);
			this.setPosition(cc.winSize.width*0.5,this.bkgSprite.height);
		}
		/*else
		{
			 this.playerSprite.setPosition(this.bkgSprite.width/2,-this.playerSprite.height*0.15);
			// this.manaBar.setMidpoint(cc.p(0,0));
			 this.manaBar.setPosition(this.bkgSprite.width*3/4,-this.playerSprite.height*0.15);
			 this.lifeBar.setPosition(this.bkgSprite.width/4,-this.playerSprite.height*0.15);
			 this.setAnchorPoint(0.5,1);
			 this.setPosition(cc.winSize.width*0.5,cc.winSize.height-this.bkgSprite.height);
		}*/

		this.manaIndicator= new cc.LabelTTF(this.mana_remaining.toFixed(1),"Arial",30);
		this.lifeIndicator= new cc.LabelTTF(this.life_remaining.toFixed(1),"Arial",30);
		this.manaIndicator.setColor(new cc.color(0,0,0,1));
		this.lifeIndicator.setColor(new cc.color(0,0,0,1));
			

		this.manaIndicator.setPosition(cc.p(this.manaIndicator.width*0.65,0));//this.manaIndicator.height*0.5));
		this.lifeIndicator.setPosition(cc.p(this.lifeIndicator.width*0.65,0));//this.lifeIndicator.height*0.5));
		this.manaBarBkg.addChild(this.manaIndicator);
		this.lifeBarBkg.addChild(this.lifeIndicator); 


	   this.catapultSprite= new cc.ProgressTimer(new cc.Sprite(res.Char8_png));
	   this.catapultSprite.setType(cc.ProgressTimer.TYPE_BAR);
	   this.catapultSprite.setBarChangeRate(cc.p(0,1));
	   this.catapultSprite.setMidpoint(cc.p(0,0));
	   this.catapultSprite.setPercentage(this.catapultPower);

	  
	   this.catapultBtn=new cc.MenuItemImage(res.Char8_png,res.Char4_blue_png,res.Char4_grey_png,function(){this.shootCatapult()},this);

		if(this.isPrimary)
		{   
		  this.catapultBtn.setPosition(cc.p(cc.winSize.width*0.98,cc.winSize.height*0.25));
		  this.catapultSprite.setPosition(cc.p(cc.winSize.width*0.98,cc.winSize.height*0.25));
		}
	   else
	   {
	     this.catapultBtn.setPosition(cc.p(cc.winSize.width*0.12,cc.winSize.height*0.25));
	     this.catapultSprite.setPosition(cc.p(cc.winSize.width*0.12,cc.winSize.height*0.25));
	   }

		this.powermenu=new cc.Menu(this.catapultBtn);
		this.powermenu.setPosition(0,0);
		this.bkgSprite.addChild(this.powermenu);
		this.bkgSprite.addChild(this.catapultSprite);

		this.bullMenu=new cc.Menu(this.bullButtons);
		this.bullMenu.setPosition(0,this.bkgSprite.height*0.3);
		/*if(!this.isPrimary)
		{
		this.bullMenu.setRotation(180);	
		}*/
		this.bkgSprite.addChild(this.bullMenu,3);

		this.addChild(this.bkgSprite);
		this.bkgSprite.addChild(this.lifeBar);
		this.bkgSprite.addChild(this.manaBar);
		this.bkgSprite.addChild(this.playerSprite,9);


		this.bkgSprite.addChild(this.lifeBarBkg,1);
		this.bkgSprite.addChild(this.manaBarBkg,1);

		return true;

	},

	shootCatapult:function()
	{
	  if(this.catapultSprite.getPercentage()==100)
	  {
		if(this.isPrimary)
	  {
		this.getParent().hurtPlayerBase(1,catapultDamage);
	  }
	  else
	  {
		this.getParent().hurtPlayerBase(0,catapultDamage);
	  }
	  this.catapultSprite.setPercentage(0);
	}

	},
	update:function(dt)
	{
	  if(this.life_remaining<=0)
	  {
		isGameOver=true;
		this.life_remaining=0;
	  }

	  if(this.life_remaining>=100)
	  {		
		this.life_remaining=100;
	  }
	   if(this.mana_remaining>=100)
	  {		
		this.mana_remaining=100;
	  }
	this.lifeBar.setPercentage(this.life_remaining);
	this.manaBar.setPercentage(this.mana_remaining);

	this.catapultSprite.setPercentage(this.catapultPower);
	if(this.catapultPower==100)
	{
	  this.catapultBtn.setEnabled(true);
	}
	else{
	  this.catapultBtn.setEnabled(false);
	}

	this.manaIndicator.setString(this.mana_remaining.toFixed(0));
	this.lifeIndicator.setString(this.life_remaining.toFixed(0));

	this.rechargeMana(dt);
	this.unLockBullBtns();
	this.rechargeCatapult(dt);

	},
	rechargeCatapult:function(dt)
	{
	  if(this.catapultPower<100)
	  {
		this.catapultPower+=dt*catapultRechargeRate;
	  }
	},
	rechargeCatapultByTap:function()
	{
	  if(this.catapultPower<100)
	{
	this.catapultPower+=catapultRechargeRate;
	}
	},
	rechargeMana:function(dt)
	{
	  if(this.mana_remaining<100)
	  {
		this.mana_remaining+=dt*MANA_REFRESH_RATE;
	  }
	},
	rechargeManaByTap:function()
	{
	   if(this.mana_remaining<100)
	  {
		this.mana_remaining+=MANA_REFRESH_RATE;
	  }
	},
	unLockBullBtns:function()
	{
	  for(var i=0;i<this.bullButtons.length;i++)
	  {
		if(this.mana_remaining>=BULL_MANA[i] && this.bullButtons[i].isRefreshed)
		{
		  this.bullButtons[i].setEnabled(true);
		}
		else
		{
		  this.bullButtons[i].setEnabled(false);
		}
	  }
	},
	lockBullBtn:function(bullId)
	{
	  this.mana_remaining-=BULL_MANA[bullId];
	  this.bullButtons[bullId].lock();
	  this.bullButtons[bullId].scheduleOnce(this.bullButtons[bullId].recharge,BULL_REFRESHTIME[bullId]);
		 
	},
	releaseBull:function(bullId)
	{
	   if(this.mana_remaining>=BULL_MANA[bullId])
	  {
		var playerId;
		if(this.isPrimary)
		{
		  playerId=0;    
		}
		else
		{
		  playerId=1;
		}
	   this.getParent().setBullDetails(bullId,playerId);   
	  }
	},

	});

	var UILayer = cc.Layer.extend({
	player1Base:null,
	player2Base:null,
	MessageLabel:null,
	MessageString:"Please refresh the browser\nwindow to restart the game!",
	ctor:function(){
	this._super();
	this.player1Base= new playerBase(true);
	this.player1Base.init(res.ScoreBar1_png,res.Player1_png);

	this.addChild(this.player1Base);


	this.player2Base= new playerBase(false);
	this.player2Base.init(res.ScoreBar2_png,res.Player2_png);
	this.player2Base.setAnchorPoint(0.5,1);
    this.player2Base.setRotation(180);
	this.player2Base.setPosition(cc.winSize.width/2,cc.winSize.height-this.player2Base.bkgSprite.height*1.05);
	this.addChild(this.player2Base);
	if(vsComputer==true)
	{

	   this.player2Base.powermenu.enabled=false;
	   this.player2Base.bullMenu.enabled=false;
	}

	this.MessageLabel=new cc.LabelTTF(this.MessageString,"Arial",40);
	this.MessageLabel.setColor(new cc.color(0,0,0,1));
	this.MessageLabel.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.5);
	this.addChild(this.MessageLabel);
	return true;
	},

	hurtPlayerBase:function(playerId,hitpoints)
	{
	if(playerId==0)
	{
	  this.player1Base.life_remaining-=hitpoints;
	}
	else
	{
		this.player2Base.life_remaining-=hitpoints;
	 } 
	},
	update:function(dt)
	{
	  if(isGameOver)
	  {
	if(this.player1Base.life_remaining<=0)
	 {
		 this.getParent().setGameOver("Player 2 Wins!");
	 }
	if(this.player2Base.life_remaining<=0)
	 {
	  this.getParent().setGameOver("Player 1 Wins!");
	//this.MessageLabel.setString("Player 1 wins !");//+this.MessageString);
	 }
		this.MessageLabel.setVisible(true);
		this.getParent().pauseGame();
	 }  
	  else
	  {
		if(!isGamePaused)
	   {
		this.MessageLabel.setVisible(false); 
	  
		this.player1Base.update(dt);
		this.player2Base.update(dt);
		if(vsComputer && !playerTurn)
		{
		this.player1Base.powermenu.enabled=false;
		this.player1Base.bullMenu.enabled=false;
		}
		else
		{
		this.player1Base.powermenu.enabled=true;
		this.player1Base.bullMenu.enabled=true; 
		}
	   }
	   else
	   {
		this.MessageLabel.setString("PAUSE");
	   }
	 }
	},
	setBullDetails:function(bullId,playerId)
	{
	this.getParent().setBullDetails(bullId,playerId);
	},
	rechargeCatapult:function(pow)
	{
	  this.player1Base.rechargeCatapult(pow);
	  this.player2Base.rechargeCatapult(pow);
	},

	setEnabled:function(enabled)
	{
	  if(enabled)
	  {
	  
		this.player1Base.powermenu.enabled=true;
		this.player1Base.bullMenu.enabled=true;
		if(vsComputer==false)
		{
		  this.player2Base.powermenu.enabled=true;
		  this.player2Base.bullMenu.enabled=true;
		} 
	  }
	  else
	  {
		this.player1Base.powermenu.enabled=false;
		this.player2Base.powermenu.enabled=false;
		this.player1Base.bullMenu.enabled=false;
		this.player2Base.bullMenu.enabled=false;
	 
	  }
	},

	HandleAITurn:function(dt)
	{
	  bullId=Math.floor((Math.random() * 6) + 0); 
	  this.player2Base.releaseBull(bullId);
	},

	}); 