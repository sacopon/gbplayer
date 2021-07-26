import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";
import { JP } from "./jp";
import { LoadImmediateIntoRegisterB } from "./load_immediate_into_register_b";
import { NOP } from "./nop";

const OPECODES = {
  /** NOP */
  NOP: 0,
  JMP: 0xC3,
  /** LD B, n # n = 8bit immediate value */
  LOAD_IMMIDIATE_INTO_REGISTER_B: 0x06,
};

export class InstructionFactory {
  private _register: RegisterSet;
  private _memory: Memory;

  constructor(register: RegisterSet, memory: Memory) {
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

      case OPECODES.LOAD_IMMIDIATE_INTO_REGISTER_B:
        instruction = new LoadImmediateIntoRegisterB(this._register, this._memory);
        break;

      default:
        throw new Error("no implementation");
    }

    return instruction;
  }
}