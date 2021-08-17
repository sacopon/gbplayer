import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD D, (HL)
 * [HLレジスタに設定された値]が指すメモリ上の番地に設定されている値(1バイト)を
 * Dレジスタに代入する命令
 */
export class LdDAddrHl implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdDAddrHl(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignD(this._operation.readUint8(this._operation.getHL()));
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdDAddrHl.CYCLE;
  }
}
