import { CpuAccessor } from "vm/cpu_accessor";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LoadRegisterAIntoRegisterA implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _accessor: CpuAccessor;

  constructor(register: RegisterSet, memory: Memory) {
    this._accessor = new CpuAccessor(register, memory);
  }

  public exec() {
    this._accessor.assignA(this._accessor.getA());
    this._accessor.addProgramCounter(OPECODE_BYTE);

    return LoadRegisterAIntoRegisterA.CYCLE;
  }
}
