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

spwanBull:function(bullType,location,playerId)
{
var _bull=new bull(bullType,location,playerId);
_bull.setPosition(location);
_bull.scheduleUpdate();
this.addChild(_bull);
},

init:function()
{

},
});
