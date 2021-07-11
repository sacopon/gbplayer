import { Register8bit, General8bitRegister, UINT8_MIN } from "./register_8bit";

export const UINT16_MIN = UINT8_MIN;
export const UINT16_MAX = 65535;

export interface Register16bit {
  get value(): number;
  set value(value: number);
  get hi(): number;
  set hi(value: number);
  get lo(): number;
  set lo(value: number);
}

/**
 * 16bit レジスタ
 */
export class General16bitRegister implements Register16bit {
  private _hi: Register8bit;
  private _lo: Register8bit;

  constructor() {
    this._hi = new General8bitRegister();
    this._lo = new General8bitRegister();
  }

  get value() {
    return this._hi.value << 8 | this._lo.value;
  }

  set value(v: number) {
    if (v < UINT16_MIN || UINT16_MAX < v) {
      throw new Error("invalid argument");
    }

    this._hi.value = (v >> 8) & 0xFF;
    this._lo.value = (v >> 0) & 0xFF;
  }

  get hi() {
    return this._hi.value;
  }

  set hi(value: number) {
    this._hi.value = value;
  }

  get lo() {
    return this._lo.value;
  }

  set lo(value: number) {
    this._lo.value = value;
  }
}
