var bullButton=cc.MenuItemImage.extend({
  refreshTime:0,manaRequired:0,isRefreshed:true,
  priceTag:null,
  ctor:function(normalImage, selectedImage, disabledImage, callback, target,manaRequired)
  {
    this._super(normalImage, selectedImage, disabledImage, callback, target);
    this.manaRequired=manaRequired;
    this.priceTag=new cc.LabelTTF(this.manaRequired,"Arial",30);
    this.priceTag.setPosition(cc.p(this.width*0.5,0));
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
isPrimary:false, life_remaining:100,mana_remaining:100,
bkgSprite:null,
playerSprite:null, 
powerButtons:null, 
manaBar:null,manaIndicator:null, 
lifeBar:null, lifeIndicator:null,
catapultSprite:null, 
bullButtons:null, bullMenu:null,

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
   
    this.manaBar= new cc.ProgressTimer(new cc.Sprite(res.ManaIndicator_png));
    this.manaBar.setType(cc.ProgressTimer.TYPE_BAR);
    this.manaBar.setBarChangeRate(cc.p(1,0));
    this.manaBar.setMidpoint(cc.p(0.5,0.5));
    this.manaBar.setPercentage(this.mana_remaining);

   this.lifeBar= new cc.ProgressTimer(new cc.Sprite(res.lifeBar_png));
   this.lifeBar.setType(cc.ProgressTimer.TYPE_BAR);
   this.lifeBar.setBarChangeRate(cc.p(1,0));
   this.lifeBar.setMidpoint(cc.p(0.5,0.5));
   this.lifeBar.setPercentage(this.life_remaining);
       
    this.powerButtons=[];
    for (var i = 0 ; i < 4; i++) 
    {
     var spr= new cc.Sprite(res.powerBtnBkg_png);
     this.powerButtons.push(spr);
     this.powerButtons[i].setAnchorPoint(0.5,0.5);
      if(this.isPrimary)
      {
        this.powerButtons[i].setPosition(this.bkgSprite.width*0.2*(i+1),this.bkgSprite.height);
      }
     else
      {  this.powerButtons[i].setPosition(this.bkgSprite.width*0.2*(i+1),0);
      }
         this.bkgSprite.addChild(this.powerButtons[i],3);
    }

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
        if(this.isPrimary)
        {
        this.bullButtons[i].setPosition(this.bkgSprite.width*0.125*(i+1),0);     
        }
        else
        {
        this.bullButtons[i].setPosition(this.bkgSprite.width*0.125*(i+1),this.bkgSprite.height);
        }        

    }

    this.bullMenu=new cc.Menu(this.bullButtons);
    this.bullMenu.setPosition(0,0);
    this.bkgSprite.addChild(this.bullMenu);
    
    if(this.isPrimary)
    {
        this.playerSprite.setPosition(this.bkgSprite.width/2,(this.bkgSprite.height+this.playerSprite.height*0.5));
        this.manaBar.setMidpoint(cc.p(0,0));
        this.manaBar.setPosition(this.bkgSprite.width*3/4,(this.bkgSprite.height+this.playerSprite.height));
        this.lifeBar.setPosition(this.bkgSprite.width/4,(this.bkgSprite.height+this.playerSprite.height));
        this.setAnchorPoint(0.5,1);
        this.setPosition(cc.winSize.width*0.5,this.bkgSprite.height);
    }
    else
    {
         this.playerSprite.setPosition(this.bkgSprite.width/2,-this.playerSprite.height*0.5);
         this.manaBar.setMidpoint(cc.p(0,0));
         this.manaBar.setPosition(this.bkgSprite.width*3/4,-this.playerSprite.height);
         this.lifeBar.setPosition(this.bkgSprite.width/4,-this.playerSprite.height);
         this.setAnchorPoint(0.5,1);
         this.setPosition(cc.winSize.width*0.5,cc.winSize.height-this.bkgSprite.height);
    }

    this.manaIndicator= new cc.LabelTTF("Mana : "+this.mana_remaining.toFixed(2),"Arial",30);
    this.lifeIndicator= new cc.LabelTTF("Life : "+this.life_remaining.toFixed(2),"Arial",30);
    this.manaIndicator.setColor(new cc.color(0,0,0,1));
    this.lifeIndicator.setColor(new cc.color(0,0,0,1));
        

    this.manaIndicator.setPosition(cc.p(this.manaIndicator.width*0.5,this.manaIndicator.height*0.5));
    this.lifeIndicator.setPosition(cc.p(this.lifeIndicator.width*0.5,this.lifeIndicator.height*0.5));
    this.manaBar.addChild(this.manaIndicator);
    this.lifeBar.addChild(this.lifeIndicator);      
    this.addChild(this.bkgSprite);
    this.bkgSprite.addChild(this.lifeBar);
    this.bkgSprite.addChild(this.manaBar);
    this.bkgSprite.addChild(this.playerSprite);
    return true;

},


update:function(dt)
{
  if(this.life_remaining<=0)
  {
    isGameOver=true;
    this.life_remaining=0;
  }
this.lifeBar.setPercentage(this.life_remaining);
this.manaBar.setPercentage(this.mana_remaining);
this.manaIndicator.setString("Mana : "+this.mana_remaining.toFixed(2));
this.lifeIndicator.setString("Life : "+this.life_remaining.toFixed(2));

this.rechargeMana(dt);
this.unLockBullBtns();

},
rechargeMana:function(dt)
{
  if(this.mana_remaining<100)
  {
    this.mana_remaining+=dt*MANA_REFRESH_RATE;
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
   //this.mana_remaining-=BULL_MANA[bullId];
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

this.addChild(this.player2Base);
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
if(this.player1Base.mana_remaining==0)
 {
  this.MessageLabel.setString("Player 2 wins !\n"+this.MessageString);
 }
 else
 {
this.MessageLabel.setString("Player 1 wins !\n"+this.MessageString);
 }
    this.MessageLabel.setVisible(true);
 }  
  else
  {
 this.MessageLabel.setVisible(false); 
  
  this.player1Base.update(dt);
  this.player2Base.update(dt);
 }
},
setBullDetails:function(bullId,playerId)
{
this.getParent().setBullDetails(bullId,playerId);
},

}); 