import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD A, H
 * AレジスタにHレジスタの内容を代入する命令
 */
export class LdAH implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdAH(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignA(this._operation.getH());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdAH.CYCLE;
  }
}
