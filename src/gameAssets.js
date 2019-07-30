
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
      this.player1PowIndicator= new cc.LabelTTF(this.player1Power,(20));
      this.player1PowIndicator.setPosition(this.width*0.5,this.height*0.15);
      this.player2PowIndicator= new cc.LabelTTF(this.player2Power,(20));
      this.player2PowIndicator.setPosition(this.width*0.5,this.height*0.85);
      this.addChild(this.player1PowIndicator);
      this.addChild(this.player2PowIndicator);
      this.setAnchorPoint(0.5,0.5);
      this.scheduleUpdate();
      return true;
    },

    addToPlayerBulls:function(bull,playerId)
    {
   
    this.collided = false;
        if(playerId==0)
        {
            this.player1Bulls.push(bull);
            
        }
        else
        {
            this.player2Bulls.push(bull);
            
        }
     
        
    },
    
    update(dt)
    {
        this.calculatePlayerPower();
        this.handleCollision();
        this.player1PowIndicator.setString(this.player1Power.toString());  
        this.player2PowIndicator.setString(this.player2Power.toString());      
    },

    handleCollision:function()
    {
      
      //this.handlePlayer1Collisions();
      this.handleSelfBullCollision(this.player1Bulls);
      //this.handlePlayer2Collisions();
       this.handleSelfBullCollision(this.player2Bulls);
      this.handleInterPlayerCollisions();
    },
    calculatePlayerPower:function()
    {
        this.player1Power=0;
        this.player2Power=0;
        if(this.player1Bulls.length>0)
      {
        for(var i=0;i<this.player1Bulls.length;i++)
        {
            this.player1Power+=this.player1Bulls[i].getPower();
        }

      }
      if(this.player2Bulls.length>0)
      {
        for(var i=0;i<this.player2Bulls.length;i++)
        {
            this.player2Power+=this.player2Bulls[i].getPower();
        }

      }
    },
    changeSpeedOfAll:function(bulls,speed)
    {
         if(bulls.length>1)
         {
            for(var i=0;i<bulls.length-1;i++)
         {
           if(bulls[i].collidedSelf==true)
           {
            bulls[i].setSpeed(speed);
           }
         }
         
         if(bulls[bulls.length-2].collidedSelf==true)
         {
            bulls[bulls.length-1].setSpeed(speed);
         }
     }
     else
     {
        bulls[0].setSpeed(speed);
     }

    },
    handleSelfBullCollision:function(bulls)
    {
        if(bulls.length>1)
        {
            var speed=bulls[0].getSpeed();
            var offset=0;
            for(var i=0;i<bulls.length-1;i++)
            {
              if(bulls[i].collidedSelf==false && cc.rectIntersectsRect(bulls[i].getBoundingBox(),bulls[i+1].getBoundingBox()))
             {                
                bulls[i].collidedSelf=true;
                offset+=bulls[i+1].getSpeed();
                break;                
             }
            }
            this.changeSpeedOfAll(bulls,speed+offset);
        }
    },
    /*
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
                this.player1Bulls[i].collidedSelf=true;
                offset+=this.player1Bulls[i+1].getSpeed();
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
                this.player2Bulls[i].collidedSelf=true;
                offset+=this.player2Bulls[i+1].getSpeed();
                break;                
             }
            }
            this.changeSpeedOfAll(this.player2Bulls,speed+offset);                     
        }
    },*/

    handleInterPlayerCollisions:function()
    {
       if(this.collided==false&& this.player1Bulls.length>0 &&this.player2Bulls.length>0)
        {   
        
         if(cc.rectIntersectsRect(this.player1Bulls[0].getBoundingBox(),this.player2Bulls[0].getBoundingBox()))
            { 
               var speed1=this.calculateSpeedOfALL(this.player1Bulls);
               var speed2=this.calculateSpeedOfALL(this.player2Bulls); 
               var offset=speed1-speed2;//this.calculateSpeedOfALL(this.player1Bulls)-this.calculateSpeedOfALL(this.player2Bulls); 
            cc.log((speed1-offset)+";=>"+(speed2+offset)+";"+offset);
            this.changeSpeedOfAll(this.player2Bulls,-offset);
            this.changeSpeedOfAll(this.player1Bulls,+offset);
            }         
        }
     
    },
    calculateSpeedOfALL:function(bulls)
    {var speed=0;
        var joinedBulls=1;
        
            for(var i=0;i<bulls.length;i++)
            {
                if(bulls[i].collidedSelf)
                {
                    joinedBulls+=1;
                }
                else
                    {
                        break;
                    }
            }
        cc.log(joinedBulls);
        /*if(bulls.length>0)
        {*/
            for(var i=0;i<joinedBulls;i++)
            {
                if(speed<bulls[i].getSpeed())
                {
                    speed=bulls[i].getSpeed();
                }
            }

       //}
       return speed;

    },

    removeBullFromLane:function(bull)
    {
      
       if(bull._parentPlayer==0)
        {
         if(bull.getPosition().y>=MAXY+bull.height)
         {            
            this.player1Bulls.shift();
         }
         else if(bull.getPosition().y<= -bull.height)
         {           
            this.player1Bulls.pop();
         }         
        }

        if(bull._parentPlayer==1)
        {
         if(bull.getPosition().y>=MAXY+bull.height)
         {
            this.player2Bulls.pop();
         }
         else if(bull.getPosition().y<= -bull.height)
         {
            this.player2Bulls.shift();
         }         
        }
        //cc.log(this.player1Bulls.length+";"+this.player2Bulls.length);            
    },
    hurtOpponent:function(playerid,hitpoints)
    {
        if(playerid==0)
      {
        this.getParent().hurtOpponent(1,hitpoints);
      }
      else
      {this.getParent().hurtOpponent(0,hitpoints);
      }
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
             if(this.getPosition().y<0 || this.getPosition().y>=MAXY+bull.height) 
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
                 if(this.getPosition().y>this._spawnPos.y ||this.getPosition().y<= -bull.height) 
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
        this.getParent().hurtOpponent(this._parentPlayer,(this.getPower()*0.1));
        this.getParent().removeBullFromLane(this);
        this.removeFromParent();
        this.release();         
    },
});
