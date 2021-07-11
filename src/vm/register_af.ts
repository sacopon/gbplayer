import { FlagRegister, RegisterF } from "./flag_register";
import { Register16bit, UINT16_MAX, UINT16_MIN } from "./register_16bit";
import { General8bitRegister, Register8bit } from "./register_8bit";

/**
 * AFレジスタ
 */
export class RegisterAF implements Register16bit {
  private _hi: Register8bit;
  private _lo: FlagRegister;

  constructor() {
    this._hi = new General8bitRegister();
    this._lo = new RegisterF();
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

  get flag(): FlagRegister {
    return this._lo;
  }

  // get Z(): boolean {
  //   return this._lo.Z;
  // }

  // set Z(value: boolean) {
  //   this._lo.Z = value;
  // }

  // get N(): boolean {
  //   return this._lo.N;
  // }

  // set N(value: boolean) {
  //   this._lo.N = value;
  // }

  // get H(): boolean {
  //   return this._lo.H;
  // }

  // set H(value: boolean) {
  //   this._lo.H = value;
  // }

  // get C(): boolean {
  //   return this._lo.C;
  // }

  // set C(value: boolean) {
  //   this._lo.C = value;
  // }
}
