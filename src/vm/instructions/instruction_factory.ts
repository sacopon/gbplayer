import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";
import { Instruction } from "./instruction";
import { JP } from "./jp";
import { NOP } from "./nop";

const OPECODES = {
  NOP: 0,
  JMP: 0xC3,
};

export class InstructionFactory {
  private _register: Registers;
  private _memory: Memory;

  constructor(register: Registers, memory: Memory) {
    this._register = register;
    this._memory = memory;
  }

  public create(opecode: number) {
    let instruction: Instruction | null = null;

    switch (opecode) {
      case OPECODES.NOP:
        instruction = new NOP(this._register, this._memory);
        break;

      case OPECODES.JMP:
        instruction = new JP(this._register, this._memory);
        break;

      default:
        throw new Error("no implementation");
    }

    return instruction;
  }
}