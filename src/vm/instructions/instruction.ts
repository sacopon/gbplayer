import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";

export interface Instruction {
  exec(): number;
}

export class InstructionBase {
  public static readonly OPECODE_BYTE = 1;
  private readonly _register: Registers;
  private readonly _memory: Memory;

  constructor(register: Registers, memory: Memory) {
    this._register = register;
    this._memory = memory;
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