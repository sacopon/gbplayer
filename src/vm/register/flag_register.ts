import { Register8bit, Register } from "./register_8bit";

class ZeroFlag {
  private static readonly FLAG_BIT = 7;
  private static readonly FLAG_MASK = 1 << ZeroFlag.FLAG_BIT;

  private constructor() {}

  public static isOn(value: number) {
    return ((value & ZeroFlag.FLAG_MASK) >> ZeroFlag.FLAG_BIT) !== 0;
  }

  public static isOff(value: number) {
    return !ZeroFlag.isOn(value);
  }

  public static on(value: number): number {
    return ZeroFlag.off(value) | (1 << ZeroFlag.FLAG_BIT);
  }

  public static off(value: number): number {
    return value & (~ZeroFlag.FLAG_MASK);
  }
}

class SubtractFlag {
  private static readonly FLAG_BIT = 6;
  private static readonly FLAG_MASK = 1 << SubtractFlag.FLAG_BIT;

  private constructor() {}

  public static isOn(value: number) {
    return ((value & SubtractFlag.FLAG_MASK) >> SubtractFlag.FLAG_BIT) !== 0;
  }

  public static isOff(value: number) {
    return !SubtractFlag.isOn(value);
  }

  public static on(value: number): number {
    return SubtractFlag.off(value) | (1 << SubtractFlag.FLAG_BIT);
  }

  public static off(value: number): number {
    return value & (~SubtractFlag.FLAG_MASK);
  }
}

class HalfCarryFlag {
  private static readonly FLAG_BIT = 5;
  private static readonly FLAG_MASK = 1 << HalfCarryFlag.FLAG_BIT;

  private constructor() {}

  public static isOn(value: number) {
    return ((value & HalfCarryFlag.FLAG_MASK) >> HalfCarryFlag.FLAG_BIT) !== 0;
  }

  public static isOff(value: number) {
    return !HalfCarryFlag.isOn(value);
  }

  public static on(value: number): number {
    return HalfCarryFlag.off(value) | (1 << HalfCarryFlag.FLAG_BIT);
  }

  public static off(value: number): number {
    return value & (~HalfCarryFlag.FLAG_MASK);
  }
}

class CarryFlag {
  private static readonly FLAG_BIT = 4;
  private static readonly FLAG_MASK = 1 << CarryFlag.FLAG_BIT;

  private constructor() {}

  public static isOn(value: number) {
    return ((value & CarryFlag.FLAG_MASK) >> CarryFlag.FLAG_BIT) !== 0;
  }

  public static isOff(value: number) {
    return !CarryFlag.isOn(value);
  }

  public static on(value: number): number {
    return CarryFlag.off(value) | (1 << CarryFlag.FLAG_BIT);
  }

  public static off(value: number): number {
    return value & (~CarryFlag.FLAG_MASK);
  }
}

/**
 * Fレジスタ
 */
export class FlagRegister implements Register {
  private _register: Register8bit;

  public constructor(value: number = 0) {
    this._register = new Register8bit(value);
  }

  get value() {
    return this._register.value;
  }

  /**
   * ゼロフラグ
   * 演算結果が0であることを示す
   * 演算結果が0の場合に1となり、それ以外の場合は0となる
   */
   public get Z(): boolean {
    return ZeroFlag.isOn(this._register.value);
  }

  /**
   * サブトラクトフラグ
   * 直前に実行された命令が減算命令であったことを示す
   * 減算命令であった場合に1となり、加算命令であった場合は0となる
   */
   public get N(): boolean {
    return SubtractFlag.isOn(this._register.value);
  }

  /**
   * ハーフキャリーフラグ
   * 演算の結果、下位4ビットから上位4ビットに対して、キャリー（桁上がり）またはボロー（桁下がり）があったことを示す
   * 下位4ビットからのキャリーまたはボローがあった場合に1となり、そうでない場合は0となる
   */
   get H(): boolean {
    return HalfCarryFlag.isOn(this._register.value);
  }

  /**
   * キャリーフラグ
   * 加減算の結果、キャリーまたはボローがあったことを示す
   * キャリーまたは、ボローがあった場合に1となり、そうでい場合は0となる
   * また、ビットシフト/ローテート命令で、最上位または最下位ビットからあふれたビットをキャリーとして扱う
   */
   get C(): boolean {
    return CarryFlag.isOn(this._register.value);
  }

  set Z(z: boolean) {
    const value = z ? ZeroFlag.on(this._register.value) : ZeroFlag.off(this._register.value);
    this._register = new Register8bit(value);
  }

  set N(n: boolean) {
    const value = n ? SubtractFlag.on(this._register.value) : SubtractFlag.off(this._register.value);
    this._register = new Register8bit(value);
  }

  set H(h: boolean) {
    const value = h ? HalfCarryFlag.on(this._register.value) : HalfCarryFlag.off(this._register.value);
    this._register = new Register8bit(value);
  }

  set C(c: boolean) {
    const value = c ? CarryFlag.on(this._register.value) : CarryFlag.off(this._register.value);
    this._register = new Register8bit(value);
  }
}
