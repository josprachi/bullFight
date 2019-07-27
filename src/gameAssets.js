var bull= cc.Sprite.extend({
    _spawnPos:null,_type:0,_power:null,_speed:null,_manaRequired:null,_parentPlayer:0,
    ctor:function(type,pos,parentPlayer)
    {
        this._type=type;
        this._super(res.Chars_png[this._type]);
        this.setPower(BULL_POWER[this._type]);
        this.setSpeed(BULL_POWER[this._type]);//temporary set to power, later i'll set it to speed
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
             if(this.getPosition().y<cc.winSize.height)   
             {
                this.setPosition(cc.p(this.getPosition().x,this.getPosition().y+=(this._speed*dt*10)));
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
                this.setPosition(cc.p(this.getPosition().x,this.getPosition().y-=(this._speed*dt*10)));
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
});
