import { CpuAccessor } from "vm/cpu_accessor";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * Aレジスタに格納されている値をHLレジスタが指すメモリ上の番地に代入する命令
 */
export class LdiHlA implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _accessor: CpuAccessor;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;
  }

  public exec() {
    this._accessor.writeUint8(this._accessor.getHL(), this._accessor.getA());
    this._accessor.incrementHL();
    this._accessor.addProgramCounter(OPECODE_BYTE);

    return LdiHlA.CYCLE;
  }
}
