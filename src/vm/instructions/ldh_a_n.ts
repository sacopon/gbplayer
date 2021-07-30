import { CpuOperation } from "vm/cpu_operation";
import { IMMEDIATE_1BYTE, Instruction, OPCODE_BYTE } from "./instruction";

class Operands {
  public readonly value: number;

  public constructor(value: number) {
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
  private readonly _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;

    const value = this._operation.readOperandUint8();
    this._operand = new Operands(value);
  }

  public exec() {
    this._operation.assignA(this._operation.readUint8(LdhAN._LOAD_OFFSET + this._operand.value));
    this._operation.addProgramCounter(OPCODE_BYTE + IMMEDIATE_1BYTE);

    return LdhAN.CYCLE;
  }
}
