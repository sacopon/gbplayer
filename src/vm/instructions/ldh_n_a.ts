import { CpuAccessor } from "vm/cpu_accessor";
import { IMMEDIATE_1BYTE, Instruction, OPECODE_BYTE } from "./instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number) {
    this.value = value;
  }
}

/**
 * LDH (n), A
 * メモリ上の[0xFF00 + n]の番地にレジスタAの値を代入する命令
 */
export class LdhNA implements Instruction {
  public static readonly CYCLE = 12;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _accessor: CpuAccessor;
  private readonly _operand: Operands;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;

    const value = this._accessor.readOperandUint8();
    this._operand = new Operands(value);
  }

  public exec() {
    this._accessor.writeUint8(LdhNA._LOAD_OFFSET + this._operand.value, this._accessor.getA());
    this._accessor.addProgramCounter(OPECODE_BYTE + IMMEDIATE_1BYTE);

    return LdhNA.CYCLE;
  }
}
