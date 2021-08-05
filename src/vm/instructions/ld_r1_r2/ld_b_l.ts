import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD B, L
 * BレジスタにLレジスタの内容を代入する命令
 */
export class LdBL implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdBL(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignB(this._operation.getL());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdBL.CYCLE;
  }
}
