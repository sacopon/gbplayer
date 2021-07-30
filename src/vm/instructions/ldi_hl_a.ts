import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

/**
 * Aレジスタに格納されている値をHLレジスタが指すメモリ上の番地に代入する命令
 */
export class LdiHlA implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.writeUint8(this._operation.getHL(), this._operation.getA());
    this._operation.incrementHL();
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdiHlA.CYCLE;
  }
}
