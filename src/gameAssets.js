 var SMALL=0,NORMAL=1,MEDIUM=2,HEAVY=3,JUMBO=4,GIENT=5,RACER=6; 
 var BULL_POWER=[3,6,12,24,48,96,48]; 
 var BULL_SPEED=[3,6,12,36,60,65,100]; 
 var BULL_MANA=[10,20,30,40,50,60,70]; 
 var BULL_REFRESHTIME=[1,3,4,5,6,7,8]; 
 var MAXY=720; 
 var MANA_REFRESH_RATE=3; 
 var isGameOver=false;
 var catapultDamage=30; 
 var catapultRechargeRate=1; 
 var vsComputer=false; 
 var playerTurn=false;
 var player1Wins=false;


 var lane= cc.Sprite.extend({
 player1Bulls:null,
 player2Bulls:null,
 player1Power:null,
 player2Power:null,
 player1PowIndicator:null,
 player2PowIndicator:null,
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
     this.player1PowIndicator.setVisible(false); 
     this.player2PowIndicator.setVisible(false); 
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

 displayPlayerPower:function() 
 {
   if(this.player1Power>0)
    {
      this.player1PowIndicator.setVisible(true);
    }

   if(this.player2Power>0) 
   {
     this.player2PowIndicator.setVisible(true); 
   }
 }, 

 update:function(dt) 
 {
    if(!isGamePaused && !isGameOver) 
    {
      this.calculatePlayerPower(); 
      this.handleCollision(); 
      this.displayPlayerPower(); 
    } 
}, 

handleCollision:function() 
{
   this.handleSelfBullCollision(this.player1Bulls); 
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
         {
          this.player1Power+=this.player1Bulls[i].getPower(); 
         }
      }
    } 

    if(this.player2Bulls.length>0)
     {
      for(var i=0;i<this.player2Bulls.length;i++)
       {
         {
           this.player2Power+=this.player2Bulls[i].getPower(); 
          }
       }
     } 
    this.player1PowIndicator.setString(this.player1Power.toString()); 
    this.player2PowIndicator.setString(this.player2Power.toString()); 
}, 
 changeSpeedOfAll:function(bulls,speed)
    {
         if(bulls.length>1)
         {
            for(var i=0;i<bulls.length-1;i++)
         {
           if(bulls[i].collidedSelf==true ||bulls[0].collidedOpp==true)
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
/*
changeSpeedOfAll:function(bulls,speed) 
{
  if(bulls.length>1) 
  { 
     for(var i=0;i<bulls.length-1;i++) 
      {
         if(bulls[i].collidedSelf==true||bulls[i].collidedOpp==true) 
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
        if(bulls[i].collidedSelf==false && bulls[i].collidesWithBull(bulls[i+1])) 
        {
         bulls[i].collidedSelf=true; 
         if((bulls[i].getPower()<bulls[i+1].getPower()))// ||(bulls[i].getSpeed()<bulls[i+1].getSpeed())) 
         {
            offset+=(bulls[i+1].getSpeed());
         }
         break; 
        } 
     }
     for(var i=0;i<bulls.length-1;i++) 
      {
         if(bulls[i].collidedSelf==true) 
         {
            bulls[i].setSpeed(speed+offset);
         }

        if(bulls[bulls.length-2].collidedSelf==true) 
         {         
           bulls[bulls.length-1].setSpeed(speed);
         }
      } 
      
 } 
}, */

    handleSelfBullCollision:function(bulls)
    {
        if(bulls.length>1)
        {
            var speed=bulls[0].getSpeed();
            var offset=0;
            for(var i=0;i<bulls.length-1;i++)
            {
              if(bulls[i].collidedSelf==false && bulls[i].collidesWithBull(bulls[i+1]))
             {                
                bulls[i].collidedSelf=true;
                offset+=bulls[i+1].getSpeed();
                break;                
             }
            }
            this.changeSpeedOfAll(bulls,speed+offset);
        }
    },

/*handleInterPlayerCollisions:function() 
{
   if(this.collided==false&& this.player1Bulls.length>0 &&this.player2Bulls.length>0) 
   {
     var offset=0; 
     var speed1=this.calculateSpeedOfAll(this.player1Bulls);
        var speed2=this.calculateSpeedOfAll(this.player2Bulls); 
     if(this.player1Bulls[0].collidesWithBull(this.player2Bulls[0]))
      { 
        //offset=this.player1Bulls[0].getSpeed()-this.player2Bulls[0].getSpeed();
        this.collided=true;
//        offset+=this.player1Power-this.player2Power;
        offset=speed1-speed2;  


        this.player1Bulls[0].collidedOpp=true; 
        this.player2Bulls[0].collidedOpp=true; 
       // cc.log(offset+";"+this.player1Power+";"+this.player2Power);
        this.changeSpeedOfAll(this.player1Bulls,+offset); 
        this.changeSpeedOfAll(this.player2Bulls,-offset); 
      } 
    } 
  },*/
   handleInterPlayerCollisions:function()
    {
       if(this.collided==false&& this.player1Bulls.length>0 &&this.player2Bulls.length>0)
        {   
        var offset=0;
        var speed1=this.calculateSpeedOfAll(this.player1Bulls);
        var speed2=this.calculateSpeedOfAll(this.player2Bulls); 
         if(this.player1Bulls[0].collidesWithBull(this.player2Bulls[0]))//getBoundingBox(),this.player2Bulls[0].getBoundingBox()))
            {            
            offset=speed1-speed2;
            this.player1Bulls[0].collidedOpp=true;
             this.player2Bulls[0].collidedOpp=true;
            cc.log(offset);      
            this.changeSpeedOfAll(this.player1Bulls,+offset);
            this.changeSpeedOfAll(this.player2Bulls,-offset);
            }
                     
        }
     
    },  
calculateSpeedOfAll:function(bulls)
{
       var speed=0;
        //var joinedBulls=1;
        
            for(var i=0;i<bulls.length;i++)
            {
                if(bulls[i].collidedSelf)
                {
                   speed=bulls[i].getSpeed();
                    //joinedBulls+=1;
                }
                else
                    {
                        break;
                    }
            }
        
            /*for(var i=0;i<joinedBulls;i++)
            {
                if(speed<bulls[i].getSpeed())
                {
                    speed=bulls[i].getSpeed();
                }
            }*/

       
       return speed;

},
  removeBullFromLane:function(bull) 
  {
    if(bull._parentPlayer==0) 
      {
        if(bull.getPosition().y>=MAXY) 
          {
            this.player1Bulls.shift(); 
          }
        else if(bull.getPosition().y<= 0) 
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
          else if(bull.getPosition().y<= 0) 
            {
              this.player2Bulls.shift(); 
            } 
        } 
  }, 
  hurtOpponent:function(playerid,hitpoints) 
  {cc.log("hurtOpponent");
    if(playerid==0) 
      {
        this.getParent().hurtOpponent(1,hitpoints);
      } 
    else 
      {
        this.getParent().hurtOpponent(0,hitpoints); 
      } 
	  this.getParent().shake();
  }, 
 }); 

     var bull= cc.Sprite.extend({
      _spawnPos:null,
      _type:0,
      _power:null,
      _speed:null,
      _manaRequired:null,
      _parentPlayer:0,
       _direction:0,
       collidedSelf:false,
      collidedOpp:false, 
      ctor:function(type,pos,parentPlayer)
       {
        this._type=type;
         this._super(res.Chars_png[this._type]);
         this.setPower(BULL_POWER[this._type]);
         this.setSpeed(BULL_SPEED[this._type]); 
         this._spawnPos=pos; 
         this._parentPlayer=parentPlayer; 
         return true; 
       }, 
     setSpwanPos:function(pos) {this._spawnPos=pos; }, 
     getPower:function() {return this._power; }, 
     getSpeed:function() {return this._speed; }, 
     setPower:function(pow) {this._power = pow; }, 
     setSpeed:function(speed) {this._speed=speed; }, 
    
     update:function(dt) 
     {
      if(!isGamePaused && !isGameOver) 
        {
          this.moveForward(dt); 
        }
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
            this.setPosition(cc.p(this.getPosition().x,this.getPosition().y+=(this._speed*dt))); 
          } 
        } 
      if(this._spawnPos.y==MAXY) 
        {
          if(this.getPosition().y>this._spawnPos.y ||this.getPosition().y<= 0) 
            {
              this.die(); 
            } 
          else 
            {
              this.setPosition(cc.p(this.getPosition().x,this.getPosition().y-=(this._speed*dt))); 
            }
         } 
       }, 
     collidesWithBull:function(bull) 
     {
      if(cc.rectIntersectsRect(this.getBoundingBox(),bull.getBoundingBox())) 
        {
          return true; 
        } 
      else
        {
          return false; 
        } 
      }, 
     die:function() 
     {
		 cc.log("die");
      this.unscheduleUpdate();
     // this.getParent().shake();	  
      this.getParent().hurtOpponent(this._parentPlayer,(this.getPower()*0.5)); 
      this.getParent().removeBullFromLane(this); 
      this.removeFromParent(); 
      this.release(); 
    }, 
  });