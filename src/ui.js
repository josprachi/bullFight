var bullButton=cc.MenuItemImage.extend({
  refreshTime:0,manaRequired:0,
  ctor:function(normalImage, selectedImage, disabledImage, callback, target)
  {
    this._super(normalImage, selectedImage, disabledImage, callback, target);
    return true;
  },
 recharge:function(dt)
 {
this.setEnabled(true);
 },
});



var playerBase= cc.Node.extend({
isPrimary:false, life_remaining:0,powerUps:null, 
bkgSprite:null,
playerSprite:null, powerButtons:null, manaBar:null,manaIndicator:null, lifeBar:null, lifeIndicator:null,
catapultSprite:null, bullStrip:null,tempBullSprite:null, bullButtons:null, bullMenu:null,
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
    var manaBarSpr=new cc.Sprite(res.ManaIndicator_png);
    this.manaBar= new cc.ProgressTimer(manaBarSpr);
    this.manaBar.setType(cc.ProgressTimer.TYPE_RADIAL);
    this.manaBar.setBarChangeRate(cc.p(1,0));
    this.manaBar.setAnchorPoint(0.5,0.5);
    this.manaBar.setPercentage(10);

this.lifeBar= new cc.ProgressTimer(new cc.Sprite(res.lifeBar_png));
this.lifeBar.setType(cc.ProgressTimer.TYPE_BAR);
        this.lifeBar.setBarChangeRate(cc.p(1,0));
        this.lifeBar.setMidpoint(cc.p(0,0));
        this.lifeBar.setPercentage(100);
        //this.loadPanel.setScale(0.5,0.5);
        
    //this.bullStrip = new ccui.ListView();
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

    this.smallBullBtn=new bullButton(res.Chars_png[SMALL],res.Chars_blue_png[SMALL],res.Chars_grey_png[SMALL],function(){this.releaseBull(SMALL)},this);
    this.normalBullBtn=new bullButton(res.Chars_png[NORMAL],res.Chars_blue_png[NORMAL],res.Chars_grey_png[NORMAL],function(){this.releaseBull(NORMAL)},this);
    this.mediumBullBtn=new bullButton(res.Chars_png[MEDIUM],res.Chars_blue_png[MEDIUM],res.Chars_grey_png[MEDIUM],function(){this.releaseBull(MEDIUM)},this);
    this.heavyBullBtn=new bullButton(res.Chars_png[HEAVY],res.Chars_blue_png[HEAVY],res.Chars_grey_png[HEAVY],function(){this.releaseBull(HEAVY)},this);
    this.gientBullBtn=new bullButton(res.Chars_png[GIENT],res.Chars_blue_png[GIENT],res.Chars_grey_png[GIENT],function(){this.releaseBull(GIENT)},this);
    this.jumboBullBtn=new bullButton(res.Chars_png[JUMBO],res.Chars_blue_png[JUMBO],res.Chars_grey_png[JUMBO],function(){this.releaseBull(JUMBO)},this);
    this.racerBullBtn=new bullButton(res.Chars_png[RACER],res.Chars_blue_png[RACER],res.Chars_grey_png[RACER],function(){this.releaseBull(RACER)},this);
    
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
        this.bullButtons[i].setPosition(this.bkgSprite.width*0.11*(i+1),0);     
        }
        else
        {
        this.bullButtons[i].setPosition(this.bkgSprite.width*0.11*(i+1),this.bkgSprite.height);
        }        

    }

    this.bullMenu=new cc.Menu(this.bullButtons);//(this.smallBullBtn,this.normalBullBtn,this.mediumBullBtn,this.heavyBullBtn,this.jumboBullBtn,this.gientBullBtn, this.racerBullBtn);
    this.bullMenu.setPosition(0,0);
    this.bkgSprite.addChild(this.bullMenu);
    /*for(var i=0;i<this.bullButtons.length;i++)
    {
    this.bullButtons[i].setCallback(this.releaseBull(i),this);
    }*/
    if(this.isPrimary)
    {
        this.playerSprite.setPosition(this.bkgSprite.width/2,(this.bkgSprite.height+this.playerSprite.height*0.5));//(this.bkgSprite.width*0.5,this.bkgSprite.height*0.5);
        this.manaBar.setMidpoint(cc.p(0,0));
        this.manaBar.setPosition(this.bkgSprite.width/2,(this.manaBar.height));
        this.lifeBar.setPosition(this.bkgSprite.width/2,(this.bkgSprite.height+this.playerSprite.height*0.5));
        this.setAnchorPoint(0.5,1);
        this.setPosition(cc.winSize.width*0.5,this.bkgSprite.height);
    }
    else
    {
         this.playerSprite.setPosition(this.bkgSprite.width/2,-this.playerSprite.height*0.5);
         this.manaBar.setMidpoint(cc.p(0,0));
         this.manaBar.setPosition(this.bkgSprite.width/2,0);
         this.lifeBar.setPosition(this.bkgSprite.width/2,-this.playerSprite.height*0.5);
         this.setAnchorPoint(0.5,1);
         this.setPosition(cc.winSize.width*0.5,cc.winSize.height-this.bkgSprite.height);
    }
    this.addChild(this.bkgSprite);
    this.bkgSprite.addChild(this.lifeBar);
    this.bkgSprite.addChild(this.manaBar);
    this.bkgSprite.addChild(this.playerSprite);
    return true;

},
/*setCallBackForBullButtons:function()
{
  for(var i=0;i<this.bullButtons.length;i++)
    {
    this.bullButtons[i].setCallback(this.releaseBull(i),this);
    }
},*/

releaseBull:function(bullId)
{//cc.log(bullId);

  var playerId;
  if(this.isPrimary){
    playerId=0;
  }
  else
  {
    playerId=1;
  }
  
  this.bullButtons[bullId].setEnabled(false);
  this.bullButtons[bullId].scheduleOnce(this.bullButtons[bullId].recharge,BULL_REFRESHTIME[bullId]);
  this.getParent().setBullDetails(bullId,playerId);
//cc.log("releasebull");
},

});
var UILayer = cc.Layer.extend({
player1Base:null,
player2Base:null,
ctor:function(){
this._super();
this.player1Base= new playerBase(true);
this.player1Base.init(res.ScoreBar1_png,res.Player1_png);

this.addChild(this.player1Base);

this.player2Base= new playerBase(false);
this.player2Base.init(res.ScoreBar2_png,res.Player2_png);

this.addChild(this.player2Base);
return true;
},
init:function()
{
  /*this.player1Base.setCallBackForBullButtons();
  this.player2Base.setCallBackForBullButtons();
  */
},
setBullDetails:function(bullId,playerId)
{
  cc.log(bullId+";"+playerId);
this.getParent().setBullDetails(bullId,playerId);
},

}); 