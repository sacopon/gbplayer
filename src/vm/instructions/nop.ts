import { CpuOperation } from "vm/cpu_operation";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction, OPECODE_BYTE } from "./instruction";

export class NOP implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.addProgramCounter(OPECODE_BYTE);
    return NOP.CYCLE;
  }
}
