import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";
import { InstructionBase } from "./instruction";

export class NOP extends InstructionBase {
  public static readonly CYCLE = 4;

  constructor(register: Registers, memory: Memory) {
    super(register, memory);
  }

  public exec() {
    this.addProgramCounter(InstructionBase.OPECODE_BYTE);
    return NOP.CYCLE;
  }
}
