"use strict";
import { MainView } from "./views/mainview.js";
import { GameView } from "./views/gameview.js";
import { ResultView } from "./views/resultview.js";

export class BlocksGame {
  #canvas;
  #context;
  /** 画面に表示するビューの名前 */
  #viewname = "";
  /** メイン画面 */
  #mainView = null;
  /** ゲーム画面 */
  #gameView = null;
  /** 結果画面 */
  #resultView = null;
  /** インターバルID */
  #intervalId = null;
  /** インターバルの時間 */
  #INTERVAL_TIME_MS = 1000 / 60;

  constructor(canvasId) {
    this.#canvas = document.getElementById(canvasId);
    if (this.#canvas === null) {
      throw new Error("canvas要素が取得できません");
    }
    this.#context = this.#canvas.getContext("2d");

    this.#mainView = new MainView(this.#context);
    this.#gameView = new GameView(this.#context);
    this.#resultView = new ResultView(this.#context);

    // 表示するビューをメイン画面にする
    this.#viewname = "MainView";

    // ゲームを開始する
    this.#start();
  }

  /** インターバルを開始する */
  #start() {
    this.#intervalId = setInterval(() => {
      this.#run();
    }, this.#INTERVAL_TIME_MS);
  }

  /** インターバルを停止する */
  #stop() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  /** インターバルで実行する関数 */
  #run() {
    switch (this.#viewname) {
      case "MainView":
        console.log("MainView");
        // ゲーム画面を描画する
        this.#gameView.draw();
        // メイン画面を描画する
        this.#mainView.draw();
        // メイン画面が非表示の場合はゲーム画面に切り替える
        if (this.#mainView.isVisible === false) {
          this.#viewname = "GameView";
        }
        break;
      case "GameView":
        console.log("GameView");
        // 画面をクリアする
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // ゲーム画面を更新する
        this.#gameView.update();
        // ゲーム画面を描画する
        this.#gameView.draw();
        // ゲーム画面が非表示の場合は結果画面に切り替える
        if (this.#gameView.isVisible === false) {
          this.#viewname = "ResultView";
        }
        break;
      case "ResultView":
        console.log("ResultView");
        // 結果画面を描画する
        this.#resultView.draw(this.#gameView.resultMessage);
        //  ゲームを停止する
        this.#stop();
        break;
    }
  }

  setKeydownKey(key) {
    switch (this.#viewname) {
      case "MainView":
        this.#mainView.executePlayerAction({ [key]: true });
        break;
      case "GameView":
        this.#gameView.executePlayerAction({ [key]: true });
        break;
      case "ResultView":
        break;
    }
  }

  setKeyupKey(key) {
    switch (this.#viewname) {
      case "MainView":
        break;
      case "GameView":
        this.#gameView.executePlayerAction({ [key]: false });
        break;
      case "ResultView":
        break;
    }
  }
}
