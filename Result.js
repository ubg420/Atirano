phina.define("Result", {
    superClass: "DisplayElement",
    init: function(score) {
      this.superInit({
        width: 0,
        height: 0,
      });

      this.x = 0;
      this.y = 0;

      // ラベルを表示
      var scoretext = Label('彼女との距離').addChildTo(this);
      scoretext.setPosition(500,100);
      scoretext.fill = 'white'; // 色を変更
      scoretext.strokeWidth = 8;
      scoretext.fontSize = 64; // フォントサイズを変更


      var scoretext2 = Label(score + ' cm').addChildTo(this);
      scoretext2.setPosition(500,200);
      scoretext2.fill = 'white'; // 色を変更
      scoretext2.strokeWidth = 8;
      scoretext2.fontSize = 64; // フォントサイズを変更



      var tweet = Sprite('Tweet',200,70).addChildTo(this);

      var url = "http://cachacacha.com/GAME/Atirano/";
      this.ResultTxt = "";

      var Tweettxt = encodeURIComponent("彼女との距離 " + score + "cm" + this.ResultTxt + " " + url + "  #あちらのお客様からです #かちゃコム");

      tweet.x = 500;
      tweet.y = 580;

      tweet.setInteractive(true);
      // タッチ終了時に発火
      tweet.onclick = function() {
        // 自身を削除
        window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
      };

      var retry = Sprite('Retry',200,70).addChildTo(this);
      retry.x = 760;
      retry.y = 580;

      // タッチ判定を有効に
      retry.setInteractive(true);
      // タッチ終了時に発火
      self = this;
      retry.onclick = function() {
        // 自身を削除
        GameMain.ReStart();
        self.remove();

      };



      var logo = Sprite('Logo',200,70).addChildTo(this);
      logo.x = 210;
      logo.y = 580;

      // タッチ判定を有効に
      logo.setInteractive(true);
      // タッチ終了時に発火
      logo.onclick = function() {
        window.open("http://www.cachacacha.com/");
      };

    },

    update: function(app) {

    },

});
