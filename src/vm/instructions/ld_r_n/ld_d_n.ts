import { CpuOperation } from "vm/cpu_operation";
import { IMMEDIATE_1BYTE, Instruction, OPCODE_BYTE } from "../instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number = 0) {
    this.value = value;
  }
}

/**
 * LD D, n
 * Dレジスタに 8bit の即値を代入する命令
 */
export class LdDN implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;
  private _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;
    this._operand = new Operands();
  }

  public clone() {
    const result = new LdDN(this._operation);
    result._operand = new Operands(this._operand.value);

    return result;
  }

  public fetch() {
    this._operand = new Operands(this._operation.readOperandUint8());
  }

  public exec() {
    this._operation.assignD(this._operand.value);
    this._operation.addProgramCounter(OPCODE_BYTE + IMMEDIATE_1BYTE);

    return LdDN.CYCLE;
  }
}
