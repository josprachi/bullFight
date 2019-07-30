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
    Background_png : "res/game_background.jpg",
    Player1_png : "res/Player1.png",
    Player2_png : "res/Player2.png",
    LaneBar_png : "res/laneBar.png",
    ScoreBar1_png : "res/score_bar.png",
    ScoreBar2_png : "res/score_bar2.png",
    Char1_png : "res/Char1.png",
    Char2_png : "res/Char2.png",
    Char3_png : "res/Char3.png",
    Char4_png : "res/Char4.png",
    Char5_png : "res/Char5.png",
    Char6_png : "res/Char6.png",
    Char7_png : "res/Char7.png",
    Char8_png : "res/Char8.png",
    Chars_png :["res/Char1.png","res/Char2.png","res/Char3.png","res/Char4.png","res/Char5.png","res/Char6.png","res/Char7.png","res/Char8.png"],
    Chars_grey_png :["res/Char1_grey.png","res/Char2_grey.png","res/Char3_grey.png","res/Char4_grey.png","res/Char1_grey.png","res/Char2_grey.png","res/Char3_grey.png","res/Char4_grey.png"],
    Chars_blue_png :["res/Char1_blue.png","res/Char2_blue.png","res/Char3_blue.png","res/Char4_blue.png","res/Char1_blue.png","res/Char2_blue.png","res/Char3_blue.png","res/Char4_blue.png"],
    Char4_blue_png : "res/Char4_blue.png",
    Char4_grey_png : "res/Char4_grey.png",
    /*Char1_grey_png : "res/Char1_grey.png",
    Char2_grey_png : "res/Char2_grey.png",
    Char3_grey_png : "res/Char3_grey.png",
    Char4_grey_png : "res/Char4_grey.png",
    Char1_blue_png : "res/Char1_blue.png",
    Char2_blue_png : "res/Char2_blue.png",
    Char3_blue_png : "res/Char3_blue.png",
    Char4_blue_png : "res/Char4_blue.png",*/
    lifeBar_png : "res/lifeBar.png",

    ManaIndicator_png:"res/manaBar.png",
    powerBtnBkg_png:"res/powerupBtn.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
