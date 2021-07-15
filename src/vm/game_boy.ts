import { FrameBuffer } from "./frame_buffer";
import { Instruction } from "./instructions/instruction";
import { InstructionFactory } from "./instructions/instruction_factory";
import { Memory } from "./memory";
import { Registers } from "./registers";

/**
 * 仮想ゲームボーイの本体
 */
export class GameBoy {
  public static readonly SCREEN_WIDTH = 160;
  public static readonly SCREEN_HEIGHT = 144;
  public static readonly BYTES_PER_PIXEL = 4;

  private readonly _frameBuffer: FrameBuffer;
  private _register: Registers;
  private _memory: Memory;

  public constructor(romBinary: Uint8Array) {
    this._frameBuffer = new FrameBuffer();
    this._register = new Registers();
    this._memory = new Memory(romBinary);
  }

  public getRegister() {
    return this._register.clone();
  }

  public exec(milliseconds: number) {
    this.execFrame();
    return this.drawFrame();
  }

  private execFrame() {
    let cycle = 0;

    // 1フレーム分の処理を実行
    while (cycle < 10000) {
      cycle += this.fetch().exec();
    }

    cycle = 0;
  }

  private drawFrame() {
    //-- TEST ---------------------------------------------
    for (let y = 0; y < GameBoy.SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < GameBoy.SCREEN_WIDTH; ++x) {
        this.setPixel(x, y, 0x0000FF);
      }
    }
    //-----------------------------------------------------

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
   * プログラムカウンタが指す位置から1バイト読み込み、プログラムカウンタを進める
   * @returns 
   */
  public readUint8() {
    const value = this._memory.getUint8(this._register.PC);
    this._register.PC++;

    return value;
  }

  /**
   * プログラムカウンタが指す位置から2バイト読み込み、プログラムカウンタを進める
   * @returns 
   */
   public readUint16() {
    const value = this._memory.getUint16(this._register.PC);
    this._register.PC += 2;

    return value;
  }

  public get PC() {
    return this._register.PC;
  }

  public set PC(value: number) {
    this._register.PC = value;
  }

  /**
   *
   */
  private fetch() {
    const factory = new InstructionFactory(this._register, this._memory);

    const opecode = this.readUint8();
    const instruction = factory.create(opecode);
    instruction.readOperands();

    return instruction;
  }
}
