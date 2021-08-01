import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

/**
 * LD A, A
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LdAA implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.assignA(this._operation.getA());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdAA.CYCLE;
  }
}
