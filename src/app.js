var SMALL=0,NORMAL=1,MEDIUM=2,HEAVY=3,JUMBO=4,GIENT=5,RACER=6;
var BULL_POWER=[3,6,12,24,48,96,48];
var BULL_SPEED=[3,6,12,36,60,65,100];
var BULL_MANA=[5,10,15,20,25,30,35];
var BULL_REFRESHTIME=[1,3,4,5,6,7,8];
var MAXY=720;

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
                    var laneId=target.gamelayer.isvalidLanePosition(location);
                    if(laneId!=null)
                    {                                            
                        target.spwanBull(laneId);
                    }
                   // var spawnPos=target.gamelayer.isvalidLanePosition(location);
                    /*if(spawnPos!=null)
                    {
                        if(target.playerBaseId==0)
                        {
                            spawnPos.y=0;
                        }
                        else
                        {
                          spawnPos.y=cc.winSize.height;
                        }                        
                        target.spwanBull(spawnPos);
                    }*/
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
    },
    setBullDetails:function(bullType,baseSource)
    {     
        this.bullToshoot=bullType;
        this.playerBaseId=baseSource;
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
      this.HUD.player1Base.bullButtons[this.bullToshoot].setEnabled(false);
      this.HUD.player1Base.bullButtons[this.bullToshoot].scheduleOnce(this.HUD.player1Base.bullButtons[this.bullToshoot].recharge,BULL_REFRESHTIME[this.bullToshoot]);
      }

      if(pos.y==MAXY && this.HUD.player2Base.bullButtons[this.bullToshoot].isEnabled())       
      {
      this.gamelayer.spwanBull(this.bullToshoot,pos,1,laneid);
      this.HUD.player2Base.bullButtons[this.bullToshoot].setEnabled(false);
      this.HUD.player2Base.bullButtons[this.bullToshoot].scheduleOnce(this.HUD.player2Base.bullButtons[this.bullToshoot].recharge,BULL_REFRESHTIME[this.bullToshoot]);
      }

    },
});

