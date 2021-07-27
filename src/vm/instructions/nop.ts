import { CpuAccessor } from "vm/cpu_accessor";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction, OPECODE_BYTE } from "./instruction";

export class NOP implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _accessor: CpuAccessor;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;
  }

  public exec() {
    this._accessor.addProgramCounter(OPECODE_BYTE);
    return NOP.CYCLE;
  }
}
