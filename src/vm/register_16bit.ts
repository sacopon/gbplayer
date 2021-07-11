import { Register8bit, UINT8_MIN } from "./register_8bit";

export const UINT16_MIN = UINT8_MIN;
export const UINT16_MAX = 65535;

/**
 * 16bit レジスタ
 */
export class Register16bit {
  private _hi: Register8bit;
  private _lo: Register8bit;

  constructor() {
    this._hi = new Register8bit();
    this._lo = new Register8bit();
  }

  get value() {
    return this._hi.value << 8 | this._lo.value;
  }

  set value(v) {
    if (v < UINT16_MIN || UINT16_MAX < v) {
      throw new Error("invalid argument");
    }

    this._hi.value = (v >> 8) & 0xFF;
    this._lo.value = (v >> 0) & 0xFF;
  }

  get hi() {
    return this._hi.value;
  }

  set hi(value) {
    this._hi.value = value;
  }

  get lo() {
    return this._lo.value;
  }

  set lo(value) {
    this._lo.value = value;
  }
}
