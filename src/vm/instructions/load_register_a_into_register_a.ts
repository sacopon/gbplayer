import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

/**
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LoadRegisterAIntoRegisterA extends InstructionBase {
  public static readonly CYCLE = 4;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);
  }

  public exec() {
    this.assignA(this.getA());
    this.addProgramCounter(InstructionBase.OPECODE_BYTE);

    return LoadRegisterAIntoRegisterA.CYCLE;
  }
}
