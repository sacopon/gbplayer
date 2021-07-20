import { FrameBuffer } from "./frame_buffer";
import { Instruction } from "./instructions/instruction";
import { InstructionFactory } from "./instructions/instruction_factory";
import { Memory } from "./memory";
import { Registers } from "./register/registers";

/**
 * 仮想ゲームボーイの本体
 */
export class GameBoy {
  public static readonly SCREEN_WIDTH = 160;
  public static readonly SCREEN_HEIGHT = 144;
  public static readonly BYTES_PER_PIXEL = 4;

  /** TODO: 別のところへ移動することになる */
  private readonly _frameBuffer: FrameBuffer;
  /** レジスタ */
  private readonly _register: Registers;
  /** メモリ領域 */
  private readonly _memory: Memory;

  public constructor(romBinary: Uint8Array) {
    this._frameBuffer = new FrameBuffer();
    this._register = new Registers();
    this._memory = new Memory(romBinary);
  }

  /**
   * 指定時間分の処理を実行する
   *
   * @param milliseconds 処理を実行する時間(ミリ秒)
   * @returns 生成されたフレームバッファ
   */
  public exec(milliseconds: number): Uint8Array {
    this.execFrame();
    return this.drawFrame();
  }

  /**
   * 1フレーム分の処理を実行する
   */
  private execFrame() {
    let cycle = 0;

    // 1フレーム分の処理を実行
    while (cycle < 10000) {
      cycle += this.fetch().exec();
    }

    cycle = 0;
  }

  /**
   * OAM の内容を元にフレームバッファを作成する
   *
   * @returns ピクセルデータ配列
   */
  private drawFrame(): Uint8Array {
    // TODO: 未実装
    for (let y = 0; y < GameBoy.SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < GameBoy.SCREEN_WIDTH; ++x) {
        // this.setPixel(x, y, 0x0000FF);
        this.setPixel(x, y, Math.floor(Math.min(Math.random() * 0xFFFFFF, 0xFFFFFF)));
      }
    }

    return new Uint8Array(this._frameBuffer.buffer);
  }

  /**
   * 色を塗る
   *
   * @param x X 座標
   * @param y Y 座標
   * @param rgb RGB(888)
   */
  private setPixel(x: number, y: number, rgb: number) {
    this._frameBuffer.setPixel(x, y, rgb);
  }

  /**
   * オペコード + オペランドを読み込む
   */
  private fetch(): Instruction {
    const factory = new InstructionFactory(this._register, this._memory);

    const opecode = this.readUint8();
    const instruction = factory.create(opecode);

    return instruction;
  }

  /**
   * プログラムカウンタが指す位置から1バイト読み込み、プログラムカウンタを進める
   * @returns 
   */
   private readUint8() {
    const value = this._memory.getUint8(this._register.PC);
    this._register.PC++;

    return value;
  }
}
