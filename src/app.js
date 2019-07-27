var SMALL=0,NORMAL=1,MEDIUM=2,HEAVY=3,JUMBO=4,GIENT=5,RACER=6;
var BULL_POWER=[3,6,12,24,48,96,48];
var BULL_SPEED=[3,6,12,36,60,65,100];
var BULL_MANA=[5,10,15,20,25,30,35];
var BULL_REFRESHTIME=[1,3,4,5,6,7,8];



var BackgroundLayer = cc.Layer.extend({
bkgSprite:null,laneSprite:null,
ctor:function()
{
    this._super();
    var size = cc.winSize;
    this.bkgSprite = new cc.Sprite(res.Background_png);    
    this.bkgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
    this.addChild(this.bkgSprite, 0);

    return true;

},
});

var GameLayer = cc.Layer.extend({
lanes:null,

ctor:function()
{
    this._super();
    this.lanes=[];
    var startingPos=cc.winSize.width*0.2;

    for(var i=0;i<5;i++)
    {
        var spr= new cc.Sprite(res.ScoreBar1_png);
        this.lanes.push(spr);
        this.lanes[i].setAnchorPoint(0.5,0.5);
        this.lanes[i].setRotation(90);
        this.lanes[i].setPosition(startingPos+cc.winSize.width*0.15*(i),cc.winSize.height*0.5);
        this.addChild(this.lanes[i]);
    }
return true;
},
isvalidLanePosition:function(location)
{
  for(var i=0;i<this.lanes.length;i++)
  {
    if(cc.rectContainsPoint(this.lanes[i].getBoundingBox(),location))
    {
        return(cc.p(this.lanes[i].getPosition().x,0));
    }
    else if(i==this.lanes.length-1)
        {
            return null;
        }
  }
},

spwanBull:function(bullType,location)
{
var _bull=new bull(bullType,location);
_bull.setPosition(location);
_bull.scheduleUpdate();
this.addChild(_bull);
},

init:function()
{

},
});

var bull= cc.Sprite.extend({
    _spawnPos:null,_type:0,_power:null,_speed:null,_manaRequired:null,_refreshTime:null,refreshed:null,
    ctor:function(type,pos)
    {this._type=type;
        //this._super();
        this._super(res.Chars_png[this._type]);
        this.setPower(BULL_POWER[this._type]);
        this.setSpeed(BULL_SPEED[this._type]);
        this._spawnPos=pos;
           
        return true;
    },
    init:function()
    {

    },
    setSpwanPos:function(pos)
    {
        this._spawnPos=pos;
    },
    getPower:function()
    {
        return this._power;
    },
    getSpeed:function()
    {
        return this._speed;
    },
    setPower:function(pow)
    {
        this._power = pow;
    },
    setSpeed:function(speed)
    {
        this._speed=speed;
    },
    update:function(dt)
    {
        this.moveForward(dt);
    },
    moveForward:function(dt)
    {
     
    if(this._spawnPos.y==0)
     {
             if(this.getPosition().y<cc.winSize.height)   
             {
                this.setPosition(cc.p(this.getPosition().x,this.getPosition().y+=(this._speed*dt*5)));
             }
             else
             {
               this.die();
             }
    }
    if(this._spawnPos.y==cc.winSize.height)
    {
             if(this.getPosition().y>0)   
             {
                this.setPosition(cc.p(this.getPosition().x,this.getPosition().y-=(this._speed*dt*5)));
             }
             else
             {
               this.die();
             }
     }
    },
    die:function()
    {
        this.unscheduleUpdate();
        this.removeFromParent();
        this.release();         
    },
    reset:function(){},

});

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
                    var spawnPos=target.gamelayer.isvalidLanePosition(location);
                    if(spawnPos!=null)
                    {
                        if(target.playerBaseId==0)
                        {
                            spawnPos.y=0;
                        }
                        else
                        {
                          spawnPos.y=cc.winSize.height;
                        }                        
                        target.gamelayer.spwanBull(target.bullToshoot,spawnPos);
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
    },
    setBullDetails:function(bullType,baseSource)
    {        
        this.bullToshoot=bullType;
        this.playerBaseId=baseSource;
    },
});

