import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { InstructionBase } from "./instruction";

/**
 * メモリ上の[0xFF00 + Cレジスタに設定された値]の番地に設定されている値を
 * Aレジスタに代入する命令
 */
export class LoadAddressRegisterCIntoRegisterA extends InstructionBase {
  public static readonly CYCLE = 8;
  private static readonly _LOAD_OFFSET = 0xFF00;

  constructor(register: RegisterSet, memory: Memory) {
    super(register, memory);
  }

  public exec() {
    this.assignA(this.readUint8(LoadAddressRegisterCIntoRegisterA._LOAD_OFFSET + this.getC()));
    this.addProgramCounter(InstructionBase.OPECODE_BYTE);

    return LoadAddressRegisterCIntoRegisterA.CYCLE;
  }
}
