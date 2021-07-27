import { CpuAccessor } from "vm/cpu_accessor";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";

class Operands {
  public readonly jumpPos: number;

  public constructor(jumpPos: number) {
    this.jumpPos = jumpPos;
  }
}

export class JumpToAddress implements Instruction {
  public static readonly CYCLE = 16;

  private readonly _accessor: CpuAccessor;
  private readonly _operand: Operands;

  constructor(register: RegisterSet, memory: Memory) {
    this._accessor = new CpuAccessor(register, memory);

    const jumpPos = this._accessor.readOperandUint16();
    this._operand = new Operands(jumpPos);
  }

  public exec() {
    this._accessor.assignProgramCounter(this._operand.jumpPos);
    return JumpToAddress.CYCLE;
  }
}
