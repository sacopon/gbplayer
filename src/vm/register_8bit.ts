export const UINT8_MIN = 0;
export const UINT8_MAX = 255;

export interface Register8bit {
  get value(): number;
  set value(v: number);
}

/**
 * 8bit レジスタ
 */
 export class General8bitRegister implements Register8bit {
  private _value: number;

  constructor() {
    this._value = 0;
  }

  get value() {
    return this._value;
  }

  set value(v: number) {
    if (v < UINT8_MIN || UINT8_MAX < v) {
      throw new Error("invalid argument");
    }

    this._value = v;
  }
}
