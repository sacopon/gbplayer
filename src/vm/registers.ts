import { FlagRegister } from "./flag_register";
import { Register16bit, General16bitRegister } from "./register_16bit";
import { RegisterAF } from "./register_af";

/**
 * レジスタ
 */
export class Registers {
  private _AF: RegisterAF;
  private _BC: Register16bit;
  private _DE: Register16bit;
  private _HL: Register16bit;
  // private _stackPointer: number;
  // private _programCounter: number;

  constructor() {
    this._AF = new RegisterAF();
    this._BC = new General16bitRegister();
    this._DE = new General16bitRegister();
    this._HL = new General16bitRegister();
    // this._stackPointer = 0;
    // this._programCounter = 0;
  }

  /**
   * フラグレジスタ
   */
   get flag(): FlagRegister {
    return this._AF.flag;
  }

// 8bit アクセス
  /**
   * A レジスタ（AFレジスタの上位8bit）
   */
  public get A() {
    return this._AF.hi;
  }

  /**
   * A レジスタ（AFレジスタの上位8bit）
   */
   public set A(value: number) {
    this._AF.hi = value;
  }

  /**
   * F レジスタ（AFレジスタの上位8bit）
   */
   public get F() {
    return this._AF.lo;
  }

  /**
   * F レジスタ（AFレジスタの上位8bit）
   */
   public set F(value: number) {
    this._AF.lo = value;
  }

  /**
   * B レジスタ（BCレジスタの上位8bit）
   */
  public get B() {
    return this._BC.hi;
  }

  /**
   * B レジスタ（BCレジスタの上位8bit）
   */
   public set B(value: number) {
     this._BC.hi = value;
  }

  /**
   * C レジスタ（BCレジスタの下位8bit）
   */
   public get C() {
    return this._BC.lo;
  }

  /**
   * C レジスタ（BCレジスタの下位8bit）
   */
   public set C(value: number) {
     this._BC.lo = value;
  }

  /**
   * D レジスタ（DEレジスタの上位8bit）
   */
   public get D() {
    return this._DE.hi;
  }

  /**
   * D レジスタ（DEレジスタの上位8bit）
   */
   public set D(value: number) {
     this._DE.hi = value;
  }

  /**
   * E レジスタ（DEレジスタの下位8bit）
   */
   public get E() {
    return this._DE.lo;
  }

  /**
   * E レジスタ（DEレジスタの下位8bit）
   */
   public set E(value: number) {
     this._DE.lo = value;
  }

  /**
   * H レジスタ（HLレジスタの上位8bit）
   */
   public get H() {
    return this._HL.hi;
  }

  /**
   * H レジスタ（HLレジスタの上位8bit）
   */
   public set H(value: number) {
     this._HL.hi = value;
  }

  /**
   * L レジスタ（HLレジスタの下位8bit）
   */
   public get L() {
    return this._HL.lo;
  }

  /**
   * L レジスタ（HLレジスタの下位8bit）
   */
   public set L(value: number) {
     this._HL.lo = value;
  }

// 16bit アクセス
  /**
   * AF レジスタ（16bit）
   */
   get AF() {
    return this._AF.value;
  }

  /**
   * AF レジスタ（16bit）
   */
   set AF(value: number) {
    this._AF.value = value;
  }

  /**
   * BC レジスタ（16bit）
   */
  get BC() {
    return this._BC.value;
  }

  /**
   * BC レジスタ（16bit）
   */
   set BC(value: number) {
    this._BC.value = value;
  }

  /**
   * BC レジスタ（16bit）
   */
   get DE() {
    return this._DE.value;
  }

  /**
   * BC レジスタ（16bit）
   */
   set DE(value: number) {
    this._DE.value = value;
  }

  /**
   * HL レジスタ（16bit）
   */
   get HL() {
    return this._HL.value;
  }

  /**
   * HL レジスタ（16bit）
   */
   set HL(value: number) {
    this._HL.value = value;
  }

//   /**
//    * スタックポインタ(16bit)
//    * メモリ上のスタックエリアの位置を示す
//    */
//    get SP(): number;

//    /**
//     * プログラムカウンタ(16bit)
//     * 次に実行する命令のアドレスを保持する
//     */
//    get PC(): number;
}
