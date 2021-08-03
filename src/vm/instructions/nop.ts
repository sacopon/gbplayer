import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

export class Nop implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new Nop(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.addProgramCounter(OPCODE_BYTE);
    return Nop.CYCLE;
  }
}
