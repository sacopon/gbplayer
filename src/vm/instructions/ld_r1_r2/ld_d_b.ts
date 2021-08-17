import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD D, B
 * DレジスタにBレジスタの内容を代入する命令
 */
export class LdDB implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdDB(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignD(this._operation.getB());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdDB.CYCLE;
  }
}
