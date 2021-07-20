import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";

export interface Instruction {
  exec(): number;
}

export class InstructionBase {
  private _register: Registers;
  private _memory: Memory;

  constructor(register: Registers, memory: Memory) {
    this._register = register;
    this._memory = memory;
  }

  protected changeProgramCounter(value: number) {
    this._register.PC = value;
  }

  protected readUint8() {
    const value = this._memory.getUint8(this._register.PC);
    this._register.PC += 1;

    return value;
  }

  protected readUint16() {
    const value = this._memory.getUint16(this._register.PC);
    this._register.PC += 2;

    return value;
  }
}