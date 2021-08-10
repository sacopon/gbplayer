import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD C, E
 * CレジスタにEレジスタの内容を代入する命令
 */
export class LdCE implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdCE(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignC(this._operation.getE());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdCE.CYCLE;
  }
}
