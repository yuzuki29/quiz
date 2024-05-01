"use strict";
import { View } from "./view.js";

export class MainView extends View {
  constructor(context) {
    super(context);
  }

  /** プレイヤーのキーアクションを実行する */
  executePlayerAction(key) {
    // Enterが押されていたらMainViewを非表示にする
    if (key["Enter"] === true) {
      this.isVisible = false;
    }
  }

  /** 描画する */
  draw() {
    // タイトルを描画する
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "white";
    this.context.font = "24px sans-serif";
    this.context.fillText("ブロック崩し",
      this.context.canvas.width / 2,
      this.context.canvas.height / 2
    );

    // メッセージを描画する
    this.context.font = "16px sans-serif";
    this.context.fillText("Press Enter",
      this.context.canvas.width / 2,
      this.context.canvas.height / 2 + 40
    );
  }
}
