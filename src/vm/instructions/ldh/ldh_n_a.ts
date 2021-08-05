import { CpuOperation } from "vm/cpu_operation";
import { IMMEDIATE_1BYTE, Instruction, OPCODE_BYTE } from "../instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number = 0) {
    this.value = value;
  }
}

/**
 * LDH (n), A
 * メモリ上の[0xFF00 + n]の番地にレジスタAの値を代入する命令
 */
export class LdhNA implements Instruction {
  public static readonly CYCLE = 12;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _operation: CpuOperation;
  private _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;
    this._operand = new Operands();
  }

  public clone() {
    const result = new LdhNA(this._operation);
    result._operand = new Operands(this._operand.value);

    return result;
  }

  public fetch() {
    this._operand = new Operands(this._operation.readOperandUint8());
  }

  public exec() {
    this._operation.writeUint8(LdhNA._LOAD_OFFSET + this._operand.value, this._operation.getA());
    this._operation.addProgramCounter(OPCODE_BYTE + IMMEDIATE_1BYTE);

    return LdhNA.CYCLE;
  }
}
