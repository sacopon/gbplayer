import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";
import { InstructionBase } from "./instruction";

class Operands {
  public readonly jumpPos: number;

  public constructor(jumpPos: number) {
    this.jumpPos = jumpPos;
  }
}

export class JMP extends InstructionBase {
  public static readonly CYCLE = 16;
  private readonly _operand: Operands;

  constructor(register: Registers, memory: Memory) {
    super(register, memory);

    const jumpPos = this.readUint16();
    this._operand = new Operands(jumpPos);
  }

  public exec() {
    this.changeProgramCounter(this._operand.jumpPos);
    return JMP.CYCLE;
  }
}
