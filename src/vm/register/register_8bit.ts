export const UINT8_MIN = 0;
export const UINT8_MAX = 255;

export interface Register {
  get value(): number;
}

/**
 * 8bit レジスタ
 */
 export class Register8bit implements Register {
  private readonly _value: number;

  constructor(value: number = 0) {
    if (value < UINT8_MIN || UINT8_MAX < value) {
      throw new Error("invalid argument");
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}
