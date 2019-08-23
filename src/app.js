var isGamePaused=false;
var GameScene = cc.Scene.extend({
    bullToshoot:0,playerBaseId:0,Bkglayer:null,gamelayer:null,HUD:null,menulayer:null,origPos:null,
    //playerTurn:true,
    ctor:function()
    {this._super();
           
           cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                
                onTouchBegan: function (touch, event) 
                {                    
                    var target = event.getCurrentTarget();
                    return true;
                },
                onTouchEnded: function (touch, event)
                {  
                    var target = event.getCurrentTarget();
                    var location = target.gamelayer.convertToNodeSpace(touch.getLocation());
                    if(isGameOver==false && isGamePaused==false)
                    {
                        var laneId=target.gamelayer.isvalidLanePosition(location);
                        if(laneId!=null)
                        {                                            
                          target.spwanBull(laneId);                          
                          
                        }
                        if(cc.rectContainsPoint(target.HUD.player1Base.manaBar.getBoundingBox(), location))
                        {
                          target.HUD.player1Base.rechargeManaByTap(MANA_REFRESH_RATE);

                        }
            						if(cc.rectContainsPoint(target.HUD.player1Base.catapultSprite.getBoundingBox(), location))
                        {
                          target.HUD.player1Base.rechargeCatapultByTap();

                        }
                        
                        if(!vsComputer)
                      {
                          if(cc.rectContainsPoint(target.HUD.player2Base.manaBar.getBoundingBox(), location))
                        {
                          target.HUD.player2Base.rechargeManaByTap(MANA_REFRESH_RATE);

                        }
						            if(cc.rectContainsPoint(target.HUD.player2Base.catapultSprite.getBoundingBox(), location))
                        {
                          target.HUD.player2Base.rechargeCatapultByTap();

                        }
                      }
                    }
                   
                    return true;    
                },
        }, this);
  
    },
    onEnterTransitionDidFinish:function () {
        this._super();
        this.origPos=this.getPosition();
        //cc.log(this.origPos);
        this.Bkglayer = new BackgroundLayer();
        this.addChild(this.Bkglayer);

        this.gamelayer = new GameLayer();
        
        this.addChild(this.gamelayer);

        this.HUD = new UILayer();
        
        this.addChild(this.HUD);

       

        this.menulayer=new menuLayer();
        this.menulayer.init("pauseMenu");
        this.addChild(this.menulayer,6);
       
        this.menulayer.setVisible(false);
        
        this.menulayer.hideall();
        
        this.menulayer.showPauseMenu();
        
        this.menulayer.displayMenu();
            
        //this.scheduleOnce(this.shake,1);

        this.scheduleUpdate();
    },
    update:function(dt)
    {
       if(isGamePaused)
        {
          this.pauseGame();
        }
        this.HUD.update(dt);
        this.gamelayer.update(dt);

    },

increaseMana:function(val)
{if(val==0)
{
this.HUD.player1Base.mana_remaining+=manaPotionVal;}
else
{
	this.HUD.player2Base.mana_remaining+=manaPotionVal;
}
},
increaseLife:function(val)
{if(val==0)
{
this.HUD.player1Base.life_remaining+=lifePotionVal;}
else
{
	this.HUD.player2Base.life_remaining+=lifePotionVal;
}
},
    shake:function()
  {
	  cc.log("shake");
  var move = cc.moveTo(0.05, cc.p(8, 8));
  var move_back = move.reverse();
  var move_seq = cc.sequence(move, move_back);
  var move_rep = cc.repeat(move_seq, 4);//move_seq.repeatForever();
 // var t_copy = move_rep.clone();
  this.runAction(move_rep);
  },
  resetPosition:function()
  {
    cc.log("resetPosition");
    this.setPosition(this.origPos);
  },
    setBullDetails:function(bullType,baseSource)
    {     
        this.bullToshoot=bullType;
        this.playerBaseId=baseSource;
   
    },
    hurtOpponent:function(opponentId,hitpoints)
    {
      this.HUD.hurtPlayerBase(opponentId,hitpoints);
    },


    spwanBull:function(laneid)//(pos)
    { 
      var pos = this.gamelayer.getSpwanPosition(laneid);
                       if(this.playerBaseId==0)
                        {
                            pos.y=0;
                            
                        }
                        else
                        {
                          pos.y=MAXY;
                          
                        }

      if((pos.y==0 && this.HUD.player1Base.bullButtons[this.bullToshoot].isEnabled()))
      {
      this.gamelayer.spwanBull(this.bullToshoot,pos,0,laneid);
      this.HUD.player1Base.lockBullBtn(this.bullToshoot);
      }

      if(pos.y==MAXY && this.HUD.player2Base.bullButtons[this.bullToshoot].isEnabled())       
      {
      this.gamelayer.spwanBull(this.bullToshoot,pos,1,laneid);
      this.HUD.player2Base.lockBullBtn(this.bullToshoot);
      }

     if(vsComputer)
      {
       playerTurn=!playerTurn;
      }
    },
    pauseGame:function()
    {
      isGamePaused=true;
      this.HUD.setVisible(false);
      
      this.menulayer.enabled=true;
      this.menulayer.hideall();
      this.menulayer.showPauseMenu();
      this.menulayer.displayMenu();
      this.HUD.setEnabled(false);
      if(vsComputer)
        {
          this.unschedule(this.handleAISpwan);
        }

    },

   playGame:function()
    {
      isGamePaused=false;
      this.menulayer.subMenuIndex=SUB_INDEX_PAUSEMENU;
      this.HUD.setVisible(true);
      this.HUD.setEnabled(true);
      this.menulayer.enabled=false;
      this.menulayer.setVisible(false);

      if(vsComputer)
        { 
          this.schedule(this.handleAISpwan,4.0);
        }
    },
    handleAISpwan:function(dt)
    {
      if(!isGamePaused && !isGameOver && !playerTurn)
      {
      var laneId=Math.floor((Math.random() * 5) + 0);
      //this.playerBaseId=1;
      this.HUD.HandleAITurn(dt);
      //cc.log(this.playerBaseId+" this is player base id");
      this.spwanBull(laneId);
      
      }
    },
    setGameOver:function(str)
    {//cc.log("set menu title");
      this.menulayer.setMenuTitle(str);
    },

  onExit:function()
  {
    this._super();
    this.removeAllChildren(true);   
  }

});

