import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

/**
 * LDD (HL), A
 * HLレジスタが指すメモリ上の番地にAレジスタの値を代入し、HLレジスタをデクリメントする命令
 */
export class LddHlA implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.writeUint8(this._operation.getHL(), this._operation.getA());
    this._operation.decrementHL();
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LddHlA.CYCLE;
  }
}
