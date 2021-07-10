import { Emulator } from "emulator/emulator";

/**
 * メインクラス
 * window.requestAnimationFrame() とエミュレータの制御を行う
 */
class Main {
  private readonly _emulator: Emulator;
  private readonly _updateFunc: FrameRequestCallback;

  public constructor(canvas: HTMLCanvasElement) {
    this._emulator = new Emulator(canvas);
    this._updateFunc = this.update.bind(this);

    requestAnimationFrame(this._updateFunc);
  }

  public static run() {
    const main = new Main(<HTMLCanvasElement>(document.getElementById("mainCanvas")));
  }

  public update() {
    requestAnimationFrame(this._updateFunc);
    this._emulator.tick();
  }
}

// エントリーポイント
window.addEventListener("DOMContentLoaded", Main.run);
