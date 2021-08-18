import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD E, H
 * EレジスタにHレジスタの内容を代入する命令
 */
export class LdEH implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdEH(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignE(this._operation.getH());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdEH.CYCLE;
  }
}
