/*
 * runstant
 */

var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 640;
var GameMain;

phina.globalize();
var ASSETS = {
  image: {
    'Back':'img/BG.png',
    'Man': 'img/Man.png',
    'Lady':'img/Lady.png',
    'Wine':'img/Wine.png',

    'TitleLogo':'img/titlelogo.png',


    'Logo':'img/logo.png',
    'Retry':'img/Retry.png',
    'Tweet':'img/Tweet.png',

  },



};
phina.define('MainScene', {
  superClass: 'CanvasScene',

  init: function(options) {
    this.superInit(options);

    var floor = RectangleShape({
      fill: 'brown',
      stroke: false,
      padding: 0,
    }).addChildTo(this);
    GameMain = this;
    floor.origin.set(0, 0);
    floor.position.y = this.gridY.span(12);
    floor.width = SCREEN_WIDTH;
    floor.height = this.gridY.span(4);

    this.bg = Sprite("Back").addChildTo(this);
    this.bg.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
    this.bg.setPosition(this.gridX.center(),this.gridY.center());

    this.Man = Sprite("Man").addChildTo(this);
    this.Man.setSize(150,150)
    this.Man.setPosition(this.gridX.center(-7),this.gridY.center(3));

    this.Lady = Sprite("Lady").addChildTo(this);
    this.Lady.setSize(150,150)
    this.Lady.x = this.gridX.span(12);
    this.Lady.y = this.gridY.span(11);



    var target = RectangleShape({
      fill: '',
      stroke: false,
      padding: 0,
      width: 128,
      height: 32,
    }).addChildTo(this);
    target.x = this.gridX.span(12);
    target.y = this.gridY.span(13);
    target.origin.y = 0;
    this.target = target;

    var wine = Sprite("Wine").addChildTo(this);
    wine.width = 50;
    wine.height = 70;
    wine.padding = 0;

    wine.x = this.gridX.span(1);
    wine.y = this.gridY.span(12.9);
    wine.origin.y = 1;
    this.wine = wine;

    this.gameoverflg  =false;
    this.nage  =false;

    // ラベルを表示
    this.startlabel = Label('右にフリックして飛ばす').addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(0),this.gridY.center(6.3));
    this.startlabel.fill = 'white'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 44; // フォントサイズを変更
    this.startlabel.tweener
      .clear()
      .to({alpha:1,scaleX:1,scaleY:1}, 1500,"easeOutSine")
      .wait(400)
      .to({alpha:4,scaleX:0.8,scaleY:0.8}, 1500,"easeInSine")
      .setLoop(true);

      this.tlogo = Sprite("TitleLogo").addChildTo(this);
      this.tlogo.setSize(800,350)
      this.tlogo.setPosition(this.gridX.center(),this.gridY.center(-5));
  },

  update: function(app) {
    var self = this;
    var p = app.pointer;

    if(!this.nage){

      if (p.getPointingEnd() && p.fx > 0) {
        this.startlabel.remove();
        this.tlogo.remove();
        this.wine.vx = p.fx;
        this.wine.update = function() {
          this.vx*=0.9;
          this.x += this.vx;
          if (this.vx <= 0.01) {
            this.vx = 0;
            self.gameover();
          }
        };
        this.nage = true;
      }
    }
  },

  ReStart: function(){
    this.wine.x = this.gridX.span(1);
    this.wine.y = this.gridY.span(12.9);
    this.nage = false;
    this.gameoverflg = false;
    this.wine.update = function() {};

      this.tlogo = Sprite("TitleLogo").addChildTo(this);
      this.tlogo.setSize(800,350)
      this.tlogo.setPosition(this.gridX.center(),this.gridY.center(-5));
      // ラベルを表示
      this.startlabel = Label('右にフリックして飛ばす').addChildTo(this);
      this.startlabel.setPosition(this.gridX.center(0),this.gridY.center(6.3));
      this.startlabel.fill = 'white'; // 色を変更
      this.startlabel.strokeWidth = 8;
      this.startlabel.fontSize = 44; // フォントサイズを変更
      this.startlabel.tweener
        .clear()
        .to({alpha:1,scaleX:1,scaleY:1}, 1500,"easeOutSine")
        .wait(400)
        .to({alpha:4,scaleX:0.8,scaleY:0.8}, 1500,"easeInSine")
        .setLoop(true);
  },

  gameover: function() {
    var score = Math.abs(this.wine.x-this.target.x).floor(1);
    if(this.gameoverflg == false){
      var result = Result(score).addChildTo(this);
      this.gameoverflg = true;
    }

  },
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,

  });

  app.run();
});
