import { FlagRegister } from "./flag_register";
import { Register16bit, UINT16_MAX, UINT16_MIN } from "./register_16bit";
import { Register8bit, Register } from "./register_8bit";

/**
 * AFレジスタ
 */
export class RegisterAF implements Register16bit {
  private _hi: Register;
  private _lo: FlagRegister;

  constructor(value: number = 0) {
    if (value < UINT16_MIN || UINT16_MAX < value) {
      throw new Error("invalid argument");
    }

    this._hi = new Register8bit((value >> 8) & 0xFF);
    this._lo = new FlagRegister((value >> 0) & 0xFF);
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
    this._lo = new FlagRegister(value);
  }

  get flag(): FlagRegister {
    return this._lo;
  }
}
