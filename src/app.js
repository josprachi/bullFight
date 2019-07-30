var SMALL=0,NORMAL=1,MEDIUM=2,HEAVY=3,JUMBO=4,GIENT=5,RACER=6;
var BULL_POWER=[3,6,12,24,48,96,48];
var BULL_SPEED=[3,6,12,36,60,65,100];
var BULL_MANA=[10,20,30,40,50,60,70];
var BULL_REFRESHTIME=[1,3,4,5,6,7,8];
var MAXY=720;
var MANA_REFRESH_RATE=3;
var isGameOver=false;
var catapultDamage=30;
var catapultRechargeRate=5;

var HelloWorldScene = cc.Scene.extend({
    bullToshoot:0,playerBaseId:0,Bkglayer:null,gamelayer:null,HUD:null,
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
                    if(isGameOver==false)
                    {
                        var laneId=target.gamelayer.isvalidLanePosition(location);
                        if(laneId!=null)
                        {                                            
                          target.spwanBull(laneId);
                          target.HUD.rechargeCatapult(catapultRechargeRate);
                        }
                    }
                   
                    return true;    
                },
        }, this);
  
    },
    onEnterTransitionDidFinish:function () {
        this._super();
        this.Bkglayer = new BackgroundLayer();
        this.addChild(this.Bkglayer);

        this.gamelayer = new GameLayer();
        
        this.addChild(this.gamelayer);

        this.HUD = new UILayer();
        
        this.addChild(this.HUD);
        this.scheduleUpdate();
    },
    update:function(dt)
    {
        this.HUD.update(dt);
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

    },
});

