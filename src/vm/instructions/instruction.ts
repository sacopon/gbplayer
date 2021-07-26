import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

export interface Instruction {
  exec(): number;
}

export class InstructionBase {
  public static readonly OPECODE_BYTE = 1;
  public static readonly IMMEDIATE_1BYTE = 1;

  private readonly _register: RegisterSet;
  private readonly _memory: Memory;

  constructor(register: RegisterSet, memory: Memory) {
    this._register = register;
    this._memory = memory;
  }

  protected assignB(value: number) {
    this._register.B = value;
  }

  protected addProgramCounter(value: number) {
    this._register.PC += value;
  }

  protected changeProgramCounter(value: number) {
    this._register.PC = value;
  }

  protected readUint8(offset: number = 0) {
    return this._memory.getUint8(this._register.PC + offset);
  }

  protected readUint16(offset: number = 0) {
    return this._memory.getUint16(this._register.PC + offset);
  }
}