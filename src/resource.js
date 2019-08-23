/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    Background_png : "res/Background/game_background.jpg",
    mainMenuBkg_png: "res/Background/game_background_1.png",
    Player1_png : "res/PlayerUI/Player1.png",
    Player2_png : "res/PlayerUI/Player2.png",
	crown_png: "res/PlayerUI/crown.png",
    vs_png : "res/PlayerUI/vs.png",
    LaneBar_png : "res/Background/laneBar.png",
    ScoreBar1_png : "res/PlayerUI/score_bar.png",
    ScoreBar2_png : "res/PlayerUI/score_bar2.png",
    Char1_png : "res/Bulls/Char1.png",
    Char2_png : "res/Bulls/Char2.png",
    Char3_png : "res/Bulls/Char3.png",
    Char4_png : "res/Bulls/Char4.png",
    Char5_png : "res/Bulls/Char5.png",
    Char6_png : "res/Bulls/Char6.png",
    Char7_png : "res/Bulls/Char7.png",
    Char8_png : "res/Bulls/Char8.png",    
    Char4_blue_png : "res/Bulls/Char4_blue.png",
    Char4_grey_png : "res/Bulls/Char4_grey.png",
    Chars_png :["res/Bulls/Char1.png","res/Bulls/Char2.png","res/Bulls/Char3.png","res/Bulls/Char4.png","res/Bulls/Char5.png","res/Bulls/Char6.png","res/Bulls/Char7.png","res/Bulls/Char8.png"],
    Chars_grey_png :["res/Bulls/Char1_grey.png","res/Bulls/Char2_grey.png","res/Bulls/Char3_grey.png","res/Bulls/Char4_grey.png","res/Bulls/Char1_grey.png","res/Bulls/Char2_grey.png","res/Bulls/Char3_grey.png","res/Bulls/Char4_grey.png"],
    Chars_blue_png :["res/Bulls/Char1_blue.png","res/Bulls/Char2_blue.png","res/Bulls/Char3_blue.png","res/Bulls/Char4_blue.png","res/Bulls/Char1_blue.png","res/Bulls/Char2_blue.png","res/Bulls/Char3_blue.png","res/Bulls/Char4_blue.png"],
    title_png:"res/WelcomeMenu/TITLE.png",
    lifeBar_png : "res/PlayerUI/lifeBar.png",

    ManaIndicator_png:"res/PlayerUI/manaBar.png",
    IndicatorBar_png: "res/PlayerUI/barBkg.png",
    IndicatorManaBar_png: "res/PlayerUI/barBkg1.png",
    powerBtnBkg_png:"res/powerupBtn.png",
    manaPotion_png:"res/PlayerUI/bluePotion.png",
	lifePotion_png:"res/PlayerUI/redPotion.png",

    manaAnimPng:"res/PlayerUI/bluePotion_anim.png",
    lifeAnimPng:"res/PlayerUI/redPotion_anim.png",
	
    PlayBtn_png:"res/GameMenu/PlayBtn.png",
    PlayBtn_grey_png:"res/GameMenu/PlayBtn_Grey.png",
    PlayBtn_red_png:"res/GameMenu/PlayBtn_Red.png",

    PauseBtn_png:"res/GameMenu/PauseBtn.png",
    PauseBtn_grey_png:"res/GameMenu/PauseBtn_Grey.png",
    PauseBtn_red_png:"res/GameMenu/PauseBtn_Red.png",

    HelpBtn_png:"res/GameMenu/HelpBtn.png",
    HelpBtn_grey_png:"res/GameMenu/HelpBtn_Grey.png",
    HelpBtn_red_png:"res/GameMenu/HelpBtn_Red.png",
    
    RestartBtn_png:"res/GameMenu/RestartBtn.png",
    RestartBtn_grey_png:"res/GameMenu/RestartBtn_Grey.png",
    RestartBtn_red_png:"res/GameMenu/RestartBtn_Red.png",

    PlayerSelBtn1:"res/WelcomeMenu/PlayerSelBtn1.png",
    PlayerSelBtn1_grey:"res/WelcomeMenu/PlayerSelBtn1_grey.png",

    PlayerSelBtn2:"res/WelcomeMenu/PlayerSelBtn2.png",
    PlayerSelBtn2_grey:"res/WelcomeMenu/PlayerSelBtn2_grey.png",
    instPanel_png:"res/GameMenu/MenuPanel.png",
    

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
