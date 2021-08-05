import { CpuOperation } from "vm/cpu_operation";
import { IMMEDIATE_1BYTE, Instruction, OPCODE_BYTE } from "../instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number = 0) {
    this.value = value;
  }
}

/**
 * LDH A, (n)
 * Aレジスタにメモリ上の[0xFF00 + n]の番地に格納されている値を代入する命令
 */
export class LdhAN implements Instruction {
  public static readonly CYCLE = 12;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _operation: CpuOperation;
  private _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;
    this._operand = new Operands();
  }

  public clone() {
    const result = new LdhAN(this._operation);
    result._operand = new Operands(this._operand.value);

    return result;
  }

  public fetch() {
    this._operand = new Operands(this._operation.readOperandUint8());
  }

  public exec() {
    this._operation.assignA(this._operation.readUint8(LdhAN._LOAD_OFFSET + this._operand.value));
    this._operation.addProgramCounter(OPCODE_BYTE + IMMEDIATE_1BYTE);

    return LdhAN.CYCLE;
  }
}
