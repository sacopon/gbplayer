import { Register, Register8bit, UINT8_MIN } from "./register_8bit";

export const UINT16_MIN = UINT8_MIN;
export const UINT16_MAX = 65535;

export interface Register16bit extends Register {
  get hi(): number;
  set hi(value: number);
  get lo(): number;
  set lo(value: number);
}

/**
 * 16bit レジスタ
 */
export class General16bitRegister implements Register16bit {
  private _hi: Register;
  private _lo: Register;

  constructor(value: number = 0) {
    if (value < UINT16_MIN || UINT16_MAX < value) {
      throw new Error("invalid argument");
    }

    this._hi = new Register8bit((value >> 8) & 0xFF);
    this._lo = new Register8bit((value >> 0) & 0xFF);
  }

  get value() {
    return this._hi.value << 8 | this._lo.value;
  }

  get hi() {
    return this._hi.value;
  }

  set hi(value: number) {
    this._hi = new Register8bit(value);
  }

  get lo() {
    return this._lo.value;
  }

  set lo(value: number) {
    this._lo = new Register8bit(value);
  }
}
