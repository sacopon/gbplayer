import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD D, E
 * DレジスタにEレジスタの内容を代入する命令
 */
export class LdDE implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdDE(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignD(this._operation.getE());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdDE.CYCLE;
  }
}
