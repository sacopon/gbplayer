export class FrameBuffer {
  public static readonly SCREEN_WIDTH = 160;
  public static readonly SCREEN_HEIGHT = 144;
  public static readonly BYTES_PER_PIXEL = 4;

  private _buffer: ArrayBuffer;
  private _view: DataView;

  constructor() {
    this._buffer = new ArrayBuffer(FrameBuffer.SCREEN_WIDTH * FrameBuffer.SCREEN_HEIGHT * FrameBuffer.BYTES_PER_PIXEL);
    this._view = new DataView(this._buffer);
  }

  public get buffer() {
    return this._buffer;
  }

  /**
   * 色を塗る
   *
   * @param x X 座標
   * @param y Y 座標
   * @param rgb RGB(888)
   */
   public setPixel(x: number, y: number, rgb: number) {
    // RGB(888) -> RGBA(8888) に変換して4バイトで上書き
    this._view.setUint32((y * FrameBuffer.SCREEN_WIDTH + x) * FrameBuffer.BYTES_PER_PIXEL, rgb << 8 | 0xFF);
  }
}
