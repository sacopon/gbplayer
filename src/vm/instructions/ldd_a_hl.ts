import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * LDD A, (HL)
 * HLレジスタが指すメモリ上の番地に設定されている値(1バイト)を
 * Aレジスタに代入し、HLをデクリメントする命令
 */
export class LddAHl implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.assignA(this._operation.readUint8(this._operation.getHL()));
    this._operation.decrementHL();
    this._operation.addProgramCounter(OPECODE_BYTE);

    return LddAHl.CYCLE;
  }
}
