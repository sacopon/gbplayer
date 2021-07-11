export const UINT8_MIN = 0;
export const UINT8_MAX = 255;

/**
 * 8bit レジスタ
 */
 export class Register8bit {
  private _value: number;

  constructor() {
    this._value = 0;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    if (v < UINT8_MIN || UINT8_MAX < v) {
      throw new Error("invalid argument");
    }

    this._value = v;
  }
}
