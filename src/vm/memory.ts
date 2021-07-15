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
  private _buffer: ArrayBuffer;
  private _view: DataView;

  constructor(romBinary: Uint8Array) {
    this._buffer = new ArrayBuffer(InterruptVectorTable.SIZE + CartridgeHeader.SIZE + ROMBank.SIZE * 2);
    this._view = new DataView(this._buffer);

    for (let i = 0; i < this._buffer.byteLength; ++i) {
      this._view.setUint8(i, romBinary[i]);
    }
  }

  public get buffer() {
    return this._buffer;
  }

  public getUint8(pos: number) {
    return this._view.getUint8(pos);
  }

  public getUint16(pos: number) {
    return this._view.getUint16(pos);
  }
}