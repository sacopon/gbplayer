import { Register8bit, UINT8_MAX, UINT8_MIN } from "./register_8bit";

/**
 * フラグレジスタの定義
 */
export interface FlagRegister {
  get value(): number;
  set value(v: number);

  /**
   * ゼロフラグ
   * 演算結果が0であることを示す
   * 演算結果が0の場合に1となり、それ以外の場合は0となる
   */
  get Z(): boolean;
  set Z(value: boolean);

  /**
   * サブトラクトフラグ
   * 直前に実行された命令が減算命令であったことを示す
   * 減算命令であった場合に1となり、加算命令であった場合は0となる
   */
  get N(): boolean;
  set N(value: boolean);

  /**
   * ハーフキャリーフラグ
   * 演算の結果、下位4ビットから上位4ビットに対して、キャリー（桁上がり）またはボロー（桁下がり）があったことを示す
   * 下位4ビットからのキャリーまたはボローがあった場合に1となり、そうでない場合は0となる
   */
  get H(): boolean;
  set H(value: boolean);

  /**
   * キャリーフラグ
   * 加減算の結果、キャリーまたはボローがあったことを示す
   * キャリーまたは、ボローがあった場合に1となり、そうでい場合は0となる
   * また、ビットシフト/ローテート命令で、最上位または最下位ビットからあふれたビットをキャリーとして扱う
   */
  get C(): boolean;
  set C(value: boolean);
}

/**
 * Fレジスタ
 */
export class RegisterF implements Register8bit, FlagRegister {
  private static readonly ZERO_FLAG_BIT = 7;
  private static readonly ZERO_FLAG_MASK = 1 << RegisterF.ZERO_FLAG_BIT;

  private static readonly SUBTRACT_FLAG_BIT = 6;
  private static readonly SUBTRACT_FLAG_MASK = 1 << RegisterF.SUBTRACT_FLAG_BIT;

  private static readonly HALF_CARRY_FLAG_BIT = 5;
  private static readonly HALF_CARRY_FLAG_MASK = 1 << RegisterF.HALF_CARRY_FLAG_BIT;

  private static readonly CARRY_FLAG_BIT = 4;
  private static readonly CARRY_FLAG_MASK = 1 << RegisterF.CARRY_FLAG_BIT;

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

  get Z(): boolean {
    return (this.value & RegisterF.ZERO_FLAG_MASK) !== 0;
  }

  set Z(value: boolean) {
    this.value = (this.value & (~RegisterF.ZERO_FLAG_MASK)) | ((value ? 1 : 0) << RegisterF.ZERO_FLAG_BIT);
  }

  get N(): boolean {
    return (this.value & RegisterF.SUBTRACT_FLAG_MASK) !== 0;
  }

  set N(value: boolean) {
    this.value = (this.value & (~RegisterF.SUBTRACT_FLAG_MASK)) | ((value ? 1 : 0) << RegisterF.SUBTRACT_FLAG_BIT);
  }

  get H(): boolean {
    return (this.value & RegisterF.HALF_CARRY_FLAG_MASK) !== 0;
  }

  set H(value: boolean) {
    this.value = (this.value & (~RegisterF.HALF_CARRY_FLAG_MASK)) | ((value ? 1 : 0) << RegisterF.HALF_CARRY_FLAG_BIT);
  }

  get C(): boolean {
    return (this.value & RegisterF.CARRY_FLAG_MASK) !== 0;
  }

  set C(value: boolean) {
    this.value = (this.value & (~RegisterF.CARRY_FLAG_MASK)) | ((value ? 1 : 0) << RegisterF.CARRY_FLAG_BIT);
  }

}
