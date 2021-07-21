import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

class Operands {
  public readonly jumpPos: number;

  public constructor(jumpPos: number) {
    this.jumpPos = jumpPos;
  }
}

export class JP extends InstructionBase {
  public static readonly CYCLE = 16;
  private readonly _operand: Operands;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);

    const jumpPos = this.readUint16();
    this._operand = new Operands(jumpPos);
  }

  public exec() {
    this.changeProgramCounter(this._operand.jumpPos);
    return JP.CYCLE;
  }
}
