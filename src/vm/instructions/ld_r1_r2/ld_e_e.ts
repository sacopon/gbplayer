import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD E, E
 * EレジスタにEレジスタの内容を代入する命令
 */
export class LdEE implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdEE(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignE(this._operation.getE());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdEE.CYCLE;
  }
}
