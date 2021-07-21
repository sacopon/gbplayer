import { FlagRegister } from "./flag_register";
import { Register16bit, UINT16_MAX, UINT16_MIN } from "./register_16bit";
import { Register8bit, Register } from "./register_8bit";

/**
 * AFレジスタ
 */
export class RegisterAF implements Register16bit {
  private _accumulator: Register;
  private _flagRegister: FlagRegister;

  constructor(value: number = 0) {
    if (value < UINT16_MIN || UINT16_MAX < value) {
      throw new Error("invalid argument");
    }

    this._accumulator = new Register8bit((value >> 8) & 0xFF);
    this._flagRegister = new FlagRegister((value >> 0) & 0xFF);
  }

  get value() {
    return this._accumulator.value << 8 | this._flagRegister.value;
  }

  get hi() {
    return this._accumulator.value;
  }

  set hi(value: number) {
    this._accumulator = new Register8bit(value);
  }

  get lo() {
    return this._flagRegister.value;
  }

  set lo(value: number) {
    this._flagRegister = new FlagRegister(value);
  }

  get flag(): FlagRegister {
    return this._flagRegister;
  }
}
