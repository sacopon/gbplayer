class InterruptVectorTable {
  public static readonly POS = 0;
  public static readonly SIZE = 256;
}

class CartridgeHeader {
  public static readonly POS = InterruptVectorTable.SIZE;
  public static readonly SIZE = 80;
}

class ROMBank {
  public static readonly SIZE = 16 * 1024;
}

export class Memory {
  private readonly _buffer: ArrayBuffer;
  // private readonly _debugBuffer: Array<number>;
  private readonly _view: DataView;

  constructor(romBinary: Uint8Array) {
    this._buffer = new ArrayBuffer(0xFFFF);
    // this._buffer = new ArrayBuffer(InterruptVectorTable.SIZE + CartridgeHeader.SIZE + ROMBank.SIZE * 2);
    // this._debugBuffer = new Array(this._buffer.byteLength);
    this._view = new DataView(this._buffer);

    for (let i = 0; i < this._buffer.byteLength; ++i) {
      this._view.setUint8(i, romBinary[i]);
      // this._debugBuffer[i] = romBinary[i];
    }
  }

  public get buffer() {
    return this._buffer;
  }

  public getUint8(pos: number) {
    return this._view.getUint8(pos);
  }

  public setUint8(pos: number, value: number) {
    return this._view.setUint8(pos, value);
  }

  /**
   * 符号なし16bit整数を読み取る(リトルエンディアン)
   * @param pos 読み取り位置
   * @returns 読み取った値(0〜65535)
   */
  public getUint16(pos: number) {
    return this._view.getUint16(pos, true);
  }
}
