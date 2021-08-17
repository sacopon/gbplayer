import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD D, D
 * DレジスタにDレジスタの内容を代入する命令
 */
export class LdDD implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdDD(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignD(this._operation.getD());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdDD.CYCLE;
  }
}
