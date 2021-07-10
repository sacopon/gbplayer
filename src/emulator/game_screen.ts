import { GameBoy } from "vm/game_boy";

/**
 * ゲーム画面
 * VM が生成した画像をキャンバスに転送する
 */
export class GameScreen {
  private readonly _context: CanvasRenderingContext2D;
  private readonly _imageData: ImageData;

  constructor(canvas: HTMLCanvasElement) {
    this._context = canvas.getContext("2d")!;
    this._imageData = this._context.createImageData(GameBoy.SCREEN_WIDTH, GameBoy.SCREEN_HEIGHT);
  }

  update(image: Uint8Array) {
    this._imageData.data.set(image, 0);
    this._context.putImageData(this._imageData, 0, 0);
  }
}
