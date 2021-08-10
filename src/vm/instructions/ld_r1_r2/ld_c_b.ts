import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD C, B
 * CレジスタにBレジスタの内容を代入する命令
 */
export class LdCB implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdCB(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignC(this._operation.getB());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdCB.CYCLE;
  }
}
