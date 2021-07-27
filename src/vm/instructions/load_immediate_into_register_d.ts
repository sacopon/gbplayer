import { CpuAccessor } from "vm/cpu_accessor";
import { IMMEDIATE_1BYTE, Instruction, OPECODE_BYTE } from "./instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number) {
    this.value = value;
  }
}

/**
 * Dレジスタに 8bit の即値を代入する命令
 */
export class LoadImmediateIntoRegisterD implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _accessor: CpuAccessor;
  private readonly _operand: Operands;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;

    const value = this._accessor.readOperandUint8();
    this._operand = new Operands(value);
  }

  public exec() {
    this._accessor.assignD(this._operand.value);
    this._accessor.addProgramCounter(OPECODE_BYTE + IMMEDIATE_1BYTE);

    return LoadImmediateIntoRegisterD.CYCLE;
  }
}
