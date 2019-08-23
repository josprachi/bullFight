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
    pauseMenu:null,
    pauseBtn:null,

    ctor:function()
    {
        this._super();
        this.lanes=[];
        var startingPos=cc.winSize.width*0.2;

        for(var i=0;i<5;i++)
        {
            var spr= new lane(res.LaneBar_png);
            this.lanes.push(spr);
            this.lanes[i].setAnchorPoint(0.5,0.5);
            this.lanes[i].setPosition(startingPos+cc.winSize.width*0.15*(i),cc.winSize.height*0.5);
            this.addChild(this.lanes[i]);
        }

             this.pauseBtn=new cc.MenuItemImage(res.PauseBtn_png,res.PauseBtn_grey_png,function(){this.pauseGame()},this); 
             this.pauseMenu=new cc.Menu(this.pauseBtn);
             this.pauseMenu.setPosition(this.pauseBtn.width*0.6, cc.winSize.height*0.5);
                this.addChild(this.pauseMenu, 3);
    return true;
    },
    pauseGame:function()
    {
        isGamePaused=true;
    },
increaseMana:function(val)
{this.getParent().increaseMana(val)},
increaseLife:function(val)
{this.getParent().increaseLife(val)},

    isvalidLanePosition:function(location)
    {
      for(var i=0;i<this.lanes.length;i++)
      {
        if(cc.rectContainsPoint(this.lanes[i].getBoundingBox(),location))
        {
            return i;
        }
        else if(i==this.lanes.length-1)
            {
                return null;
            }
      }
    },
    
    getSpwanPosition:function(laneid)
    {
    	return cc.p(this.lanes[laneid].width*0.5,0);
    },
    
    addBullToLane:function(bull,laneid)
    {
    this.lanes[laneid].addChild(bull);
    this.lanes[laneid].addToPlayerBulls(bull,bull._parentPlayer);
    },

    spwanBull:function(bullType,location,playerId,laneid)
    {
    var _bull=new bull(bullType,location,playerId);
    _bull.setPosition(location);
    _bull.scheduleUpdate();
    this.addBullToLane(_bull,laneid);
    },

    hurtOpponent:function(opponentId,hitpoints)
        {
          this.getParent().hurtOpponent(opponentId,hitpoints);
		  //this.getParent().shake();
        },
	
    shake:function()
	{  cc.log("shake from game layer");
		//var pos=this.getParent().getPosition();
		this.getParent().shake();
        this.getParent().resetPosition();
        
	},	
    
    update:function(dt)
     {
        if(!isGamePaused && !isGameOver)
        {
            this.pauseMenu.enabled==true;
            this.pauseMenu.setVisible(true);
        }
        else
        {
            this.pauseMenu.enabled==false;
            this.pauseMenu.setVisible(false);
        }

     },   

    });
