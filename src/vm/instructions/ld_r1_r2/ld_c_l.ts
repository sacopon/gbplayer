import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD C, L
 * CレジスタにLレジスタの内容を代入する命令
 */
export class LdCL implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdCL(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignC(this._operation.getL());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdCL.CYCLE;
  }
}
