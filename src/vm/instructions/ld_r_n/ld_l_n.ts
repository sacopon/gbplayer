import { CpuOperation } from "vm/cpu_operation";
import { IMMEDIATE_1BYTE, Instruction, OPCODE_BYTE } from "../instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number) {
    this.value = value;
  }
}

/**
 * LD L, n
 * Lレジスタに 8bit の即値を代入する命令
 */
export class LdLN implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;
  private readonly _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;

    const value = this._operation.readOperandUint8();
    this._operand = new Operands(value);
  }

  public exec() {
    this._operation.assignL(this._operand.value);
    this._operation.addProgramCounter(OPCODE_BYTE + IMMEDIATE_1BYTE);

    return LdLN.CYCLE;
  }
}
