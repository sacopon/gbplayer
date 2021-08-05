import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD B, C
 * BレジスタにCレジスタの内容を代入する命令
 */
export class LdBC implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdBC(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignB(this._operation.getC());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdBC.CYCLE;
  }
}
