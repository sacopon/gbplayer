import { GameBoy } from "vm/game_boy";
import { GameScreen } from "./game_screen";

/**
 * HTML5 によるゲームボーイエミュレータ
 * VM とキャンバスの橋渡しを行う
 */
export class Emulator {
  private readonly _vm: GameBoy;
  private readonly _screen: GameScreen;

  public constructor(canvas: HTMLCanvasElement) {
    this._screen = new GameScreen(canvas);
    this._vm = new GameBoy(new Uint8Array([]));
  }

  public tick() {
    this._screen.update(this._vm.exec(1));
  }
}
