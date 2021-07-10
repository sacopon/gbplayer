/**
 * 仮想ゲームボーイの本体
 */
export class GameBoy {
  public static readonly SCREEN_WIDTH = 160;
  public static readonly SCREEN_HEIGHT = 144;
  public static readonly BYTES_PER_PIXEL = 4;

  private readonly _frameBuffer: ArrayBuffer;
  private readonly _frameBufferView: DataView;

  public constructor(romBinary: Uint8Array) {
    this._frameBuffer = new ArrayBuffer(GameBoy.SCREEN_WIDTH * GameBoy.SCREEN_HEIGHT * GameBoy.BYTES_PER_PIXEL);
    this._frameBufferView = new DataView(this._frameBuffer);
  }

  public exec(step: number) {
    //-- TEST ---------------------------------------------
    for (let y = 0; y < GameBoy.SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < GameBoy.SCREEN_WIDTH; ++x) {
        this.setPixel(x, y, 0x0000FF);
      }
    }
    //-----------------------------------------------------

    return new Uint8Array(this._frameBuffer);
  }

  /**
   * 色を塗る
   *
   * @param x X 座標
   * @param y Y 座標
   * @param rgb RGB(888)
   */
  private setPixel(x: number, y: number, rgb: number) {
    // RGB(888) -> RGBA(8888) に変換して4バイトで上書き
    this._frameBufferView.setUint32((y * GameBoy.SCREEN_WIDTH + x) * GameBoy.BYTES_PER_PIXEL, rgb << 8 | 0xFF);
  }
}
