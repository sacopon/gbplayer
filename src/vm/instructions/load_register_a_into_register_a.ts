import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

/**
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LoadRegisterAIntoRegisterA implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.assignA(this._operation.getA());
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LoadRegisterAIntoRegisterA.CYCLE;
  }
}
