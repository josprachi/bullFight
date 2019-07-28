

var lane= cc.Sprite.extend({
    player1Bulls:null,player2Bulls:null,player1Power:null,player2Power:null,
    player1PowIndicator:null,player2PowIndicator:null,
    collided:false,

    ctor:function(img)
    {
      this._super(img);
      this.player1Bulls=[];
      this.player2Bulls=[];
      this.player1Power=0;
      this.player2Power=0;
      this.player1PowIndicator= new cc.LabelTTF(this.player1Power,(12));
      this.player1PowIndicator.setPosition(this.width*0.5,this.height*0.15);
      this.player2PowIndicator= new cc.LabelTTF(this.player2Power,(12));
      this.player2PowIndicator.setPosition(this.width*0.5,this.height*0.85);
      this.addChild(this.player1PowIndicator);
      this.addChild(this.player2PowIndicator);
      this.setAnchorPoint(0.5,0.5);
      this.scheduleUpdate();
      return true;
    },

    addToPlayerBulls:function(bull,playerId)
    {
        if(playerId==0)
        {
            this.player1Bulls.push(bull);
             cc.log("bull added in array"+this.player1Bulls.length);
            this.player1Power=this.player1Bulls[this.player1Bulls.length-1].getPower();
            this.player1PowIndicator.setString(this.player1Power.toString());
        }
        else
        {
            this.player2Bulls.push(bull);
             cc.log("bull added in array"+this.player2Bulls.length);
            this.player2Power=this.player2Bulls[this.player2Bulls.length-1].getPower();
            this.player2PowIndicator.setString(this.player2Power.toString());
        }

        
    },
    
    update(dt)
    {
        this.handleCollision();        
    },

    handleCollision:function()
    {
      this.handleInterPlayerCollisions();
      this.handlePlayer1Collisions();
      this.handlePlayer2Collisions();
    },
    changeSpeedOfAll:function(bulls,speed)
    {
         for(var i=0;i<bulls.length-1;i++)
         {
           if(cc.rectIntersectsRect(bulls[i].getBoundingBox(),bulls[i+1].getBoundingBox()))
           {
            bulls[i].setSpeed(speed);
           }
         }
         if(bulls[bulls.length-2].collidedSelf==true)
         {
            bulls[bulls.length-1].setSpeed(speed);
         }

    },
    handlePlayer1Collisions:function()
    {
        if(this.player1Bulls.length>1)
        {
            var speed=this.player1Bulls[0].getSpeed();
            var offset=0;
            for(var i=0;i<this.player1Bulls.length-1;i++)
            {
              if(this.player1Bulls[i].collidedSelf==false && cc.rectIntersectsRect(this.player1Bulls[i].getBoundingBox(),this.player1Bulls[i+1].getBoundingBox()))
             {  
                this.collided = false;
                this.player1Bulls[i].collidedSelf=true;
                offset=this.player1Bulls[i+1].getSpeed();
                break;                
             }
            }
            this.changeSpeedOfAll(this.player1Bulls,speed+offset);
        }
    },
    handlePlayer2Collisions:function()
    {
        if(this.player2Bulls.length>1)
        {

            var speed=this.player2Bulls[0].getSpeed();
            var offset=0;
            for(var i=0;i<this.player2Bulls.length-1;i++)
            {
              if(this.player2Bulls[i].collidedSelf==false && cc.rectIntersectsRect(this.player2Bulls[i].getBoundingBox(),this.player2Bulls[i+1].getBoundingBox()))
             {  
                this.collided = false;
                this.player2Bulls[i].collidedSelf=true;
                offset=this.player2Bulls[i+1].getSpeed();
                break;                
             }
            }
            this.changeSpeedOfAll(this.player2Bulls,speed+offset);                     
        }
    },

    handleInterPlayerCollisions:function()
    { 
        if(this.collided==false)
        {
        //cc.log("1; "+this.player1Bulls.length+";"+this.player2Bulls.length);
        if(this.player1Bulls.length>0 &&this.player2Bulls.length>0)
        {
            cc.log("Here");
         if(cc.rectIntersectsRect(this.player1Bulls[0].getBoundingBox(),this.player2Bulls[0].getBoundingBox()))
         {  
           this.collided = true;        
           var speed=this.player1Bulls[0].getSpeed()-this.player2Bulls[0].getSpeed();
           this.player1Bulls[0].setSpeed(speed);
           this.player2Bulls[0].setSpeed(speed*-1);           
         }
        }
     }
    },
    removeBullFromLane:function(bull)
    {
      
       if(bull._parentPlayer==0)
        {
         if(bull.getPosition().y>=MAXY)
         {
            
            this.player1Bulls.shift();
         }
         else if(bull.getPosition().y<=0)
         {
           
            this.player1Bulls.pop();
         }         
        }

        if(bull._parentPlayer==1)
        {
         if(bull.getPosition().y>=MAXY)
         {
            this.player2Bulls.pop();
         }
         else if(bull.getPosition().y<=0)
         {
            this.player2Bulls.shift();
         }         
        }
        //cc.log(this.player1Bulls.length+";"+this.player2Bulls.length);            
    },


});
var bull= cc.Sprite.extend({
    _spawnPos:null,_type:0,_power:null,_speed:null,_manaRequired:null,_parentPlayer:0,
    _direction:0,collidedSelf:false,collidedOpp:false,
    ctor:function(type,pos,parentPlayer)
    {
        this._type=type;
        this._super(res.Chars_png[this._type]);
        this.setPower(BULL_POWER[this._type]);
        this.setSpeed(BULL_POWER[this._type]);
        this._spawnPos=pos;
        this._parentPlayer=parentPlayer;
        return true;
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
             if(this.getPosition().y<0 || this.getPosition().y>=MAXY) 
             {
               this.die() 
             }
             else
             {
               this.setPosition(cc.p(this.getPosition().x,this.getPosition().y+=(this._speed*dt*10)));
             }
     }
     if(this._spawnPos.y==MAXY)
     {
                 if(this.getPosition().y>this._spawnPos.y ||this.getPosition().y<=0) 
                 {
                    this.die();
                 }
                 else
                 {
                   this.setPosition(cc.p(this.getPosition().x,this.getPosition().y-=(this._speed*dt*10)));
                 }
     }
    },
    die:function()
    {
        this.unscheduleUpdate();
        this.getParent().removeBullFromLane(this);
        this.removeFromParent();
        this.release();         
    },
});
