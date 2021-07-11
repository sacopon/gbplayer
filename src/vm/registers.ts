import { Register16bit } from "./register_16bit";

/**
 * レジスタ
 */
export class Registers {
  // private _AF: Register16bit;
  private _BC: Register16bit;
  private _DE: Register16bit;
  private _HL: Register16bit;
  // private _stackPointer: number;
  // private _programCounter: number;
  // private _zeroFlag: boolean;
  // private _subtractFlag: boolean;
  // private _halfCarryFlag: boolean;
  // private _carryFlag: boolean;

  constructor() {
    this._BC = new Register16bit();
    this._DE = new Register16bit();
    this._HL = new Register16bit();
    // this._A = 0;
    // this._F = 0;
    // this._stackPointer = 0;
    // this._programCounter = 0;
    // this._zeroFlag = false;
    // this._subtractFlag = false;
    // this._halfCarryFlag = false;
    // this._carryFlag = false;
  }

// 8bit アクセス
  /**
   * B レジスタ（BCレジスタの上位8bit）
   */
  public get B() {
    return this._BC.hi;
  }

  /**
   * B レジスタ（BCレジスタの上位8bit）
   */
   public set B(value) {
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
   public set C(value) {
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
   public set D(value) {
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
   public set E(value) {
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
   public set H(value) {
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
   public set L(value) {
     this._HL.lo = value;
  }

  // /** フラグレジスタ */
  // get F() {
  //   // TODO: 未実装
  //   return 0;
  // }

//   /**
//    * B レジスタ（BCレジスタの上位8bit） 
//    */
//   get B() {
//     return this._B;
//   }

//   /**
//    * C レジスタ（BCレジスタの下位8bit）
//    */
//   get C() {
//     return this._C;
//   }

//   /**
//    * D レジスタ（DEレジスタの上位8bit）
//    */
//   get D() {
//     return this.D;
//   }

//   /**
//    * E レジスタ（DEレジスタの下位8bit）
//    */
//   get E() {
//     return this._E;
//   }

//   /**
//    * H レジスタ（HLレジスタの上位8bit）
//    */
//   get H() {
//     return this._H;
//   }

//   /**
//    * L レジスタ（HLレジスタの下位8bit）
//    */
//   get L() {
//     return this._L;
//   }

// 16bit アクセス
  /**
   * BC レジスタ（16bit）
   */
  get BC() {
    return this._BC.value;
  }

  /**
   * BC レジスタ（16bit）
   */
   set BC(value) {
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
   set DE(value) {
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
   set HL(value) {
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
 
// // フラグレジスタ
//   /**
//    * ゼロフラグ
//    * 演算結果が0であることを示す
//    * 演算結果が0の場合に1となり、それ以外の場合は0となる
//    */
//   get ZF(): number;

//   /**
//    * サブトラクトフラグ
//    * 直前に実行された命令が減算命令であったことを示す
//    * 減算命令であった場合に1となり、加算命令であった場合は0となる
//    */
//   get NF(): number;

//   /**
//    * ハーフキャリーフラグ
//    * 演算の結果、下位4ビットから上位4ビットに対して、キャリー（桁上がり）またはボロー（桁下がり）があったことを示す
//    * 下位4ビットからのキャリーまたはボローがあった場合に1となり、そうでない場合は0となる
//    */
//   get HF(): number;

//   /**
//    * キャリーフラグ
//    * 加減算の結果、キャリーまたはボローがあったことを示す
//    * キャリーまたは、ボローがあった場合に1となり、そうでい場合は0となる
//    * また、ビットシフト/ローテート命令で、最上位または最下位ビットからあふれたビットをキャリーとして扱う
//    */
//   get CF(): number;
}
