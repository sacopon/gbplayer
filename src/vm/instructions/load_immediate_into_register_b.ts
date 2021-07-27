import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number) {
    this.value = value;
  }
}

/**
 * Bレジスタに 8bit の即値を代入する命令
 */
export class LoadImmediateIntoRegisterB extends InstructionBase {
  public static readonly CYCLE = 8;
  private readonly _operand: Operands;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);

    const value = this.readOperandUint8();
    this._operand = new Operands(value);
  }

  public exec() {
    this.assignB(this._operand.value);
    this.addProgramCounter(InstructionBase.OPECODE_BYTE + InstructionBase.IMMEDIATE_1BYTE);

    return LoadImmediateIntoRegisterB.CYCLE;
  }
}
