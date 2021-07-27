import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

/**
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LoadRegisterBIntoRegisterA extends InstructionBase {
  public static readonly CYCLE = 4;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);
  }

  public exec() {
    this.assignA(this.getB());
    this.addProgramCounter(InstructionBase.OPECODE_BYTE);

    return LoadRegisterBIntoRegisterA.CYCLE;
  }
}
