import { GameBoy } from "vm/game_boy";
import { Memory } from "vm/memory";
import { Registers } from "vm/registers";
import { Instruction, InstructionBase } from "./instruction";

class Operands {
  public jumpPos: number = 0;
}

export class JMP extends InstructionBase {
  public static readonly CYCLE = 16;
  private _operand: Operands;

  constructor(register: Registers, memory: Memory) {
    super(register, memory);

    this._operand = new Operands();
  }

  public readOperands() {
    this._operand.jumpPos = this.readUint16();
    console.log(`jmp:${this._operand.jumpPos}`);
  }

  public exec() {
    this.changeProgramCounter(this._operand.jumpPos);
    return JMP.CYCLE;
  }
}
