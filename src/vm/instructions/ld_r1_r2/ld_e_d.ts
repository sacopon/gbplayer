import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD E, D
 * EレジスタにDレジスタの内容を代入する命令
 */
export class LdED implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdED(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignE(this._operation.getD());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdED.CYCLE;
  }
}
