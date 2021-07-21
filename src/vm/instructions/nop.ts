import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

export class NOP extends InstructionBase {
  public static readonly CYCLE = 4;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);
  }

  public exec() {
    this.addProgramCounter(InstructionBase.OPECODE_BYTE);
    return NOP.CYCLE;
  }
}
