import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD A, E
 * AレジスタにEレジスタの内容を代入する命令
 */
export class LdAE implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdAE(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignA(this._operation.getE());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdAE.CYCLE;
  }
}
