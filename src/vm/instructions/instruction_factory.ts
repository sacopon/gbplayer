import { CpuOperation } from "vm/cpu_operation";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";
import { JpNn } from "./jump/jp_nn";
import { LddAHl } from "./ldd/ldd_a_hl";
import { LddHlA } from "./ldd/ldd_hl_a";
import { LdhAN } from "./ldh/ldh_a_n";
import { LdhNA } from "./ldh/ldh_n_a";
import { LdiAHl } from "./ldi/ldi_a_hl";
import { LdiHlA } from "./ldi/ldi_hl_a";
import { LdAAddrC } from "./ld_r1_r2/ld_a_addr_c";
import { LdBN } from "./ld_r_n/ld_b_n";
import { LdCN } from "./ld_r_n/ld_c_n";
import { LdDN } from "./ld_r_n/ld_d_n";
import { LdCA } from "./ld_r1_r2/ld_c_a";
import { LdAA } from "./ld_r1_r2/ld_a_a";
import { LdAB } from "./ld_r1_r2/ld_a_b";
import { Nop } from "./nop";
import { LdEN } from "./ld_r_n/ld_e_n";
import { LdHN } from "./ld_r_n/ld_h_n";
import { LdLN } from "./ld_r_n/ld_l_n";
import { LdAC } from "./ld_r1_r2/ld_a_c";
import { LdAD } from "./ld_r1_r2/ld_a_d";
import { LdAE } from "./ld_r1_r2/ld_a_e";
import { LdAH } from "./ld_r1_r2/ld_a_h";
import { LdAL } from "./ld_r1_r2/ld_a_l";

export class InstructionFactory {
  private _operation: CpuOperation;
  private _allInstructions: Instruction[];

  constructor(register: RegisterSet, memory: Memory) {
    this._operation = new CpuOperation(register, memory);

    this._allInstructions = [];
    this._allInstructions[0x00] = new Nop(this._operation);
    this._allInstructions[0x06] = new LdBN(this._operation);
    this._allInstructions[0x0E] = new LdCN(this._operation);
    this._allInstructions[0x16] = new LdDN(this._operation);
    this._allInstructions[0x1E] = new LdEN(this._operation);
    this._allInstructions[0x22] = new LdiHlA(this._operation);
    this._allInstructions[0x26] = new LdHN(this._operation);
    this._allInstructions[0x2A] = new LdiAHl(this._operation);
    this._allInstructions[0x2E] = new LdLN(this._operation);
    this._allInstructions[0x32] = new LddHlA(this._operation);
    this._allInstructions[0x3A] = new LddAHl(this._operation);
    this._allInstructions[0x7F] = new LdAA(this._operation);
    this._allInstructions[0x78] = new LdAB(this._operation);
    this._allInstructions[0x79] = new LdAC(this._operation);
    this._allInstructions[0x7A] = new LdAD(this._operation);
    this._allInstructions[0x7B] = new LdAE(this._operation);
    this._allInstructions[0x7C] = new LdAH(this._operation);
    this._allInstructions[0x7D] = new LdAL(this._operation);
    this._allInstructions[0xC3] = new JpNn(this._operation);
    this._allInstructions[0xF0] = new LdhAN(this._operation);
    this._allInstructions[0xE0] = new LdhNA(this._operation);
    this._allInstructions[0xE2] = new LdCA(this._operation);
    this._allInstructions[0xF2] = new LdAAddrC(this._operation);
  }

  public create(opcode: number): Instruction {
    if (!this._allInstructions[opcode]) {
      throw new Error("no implementation");
    }

    return this._allInstructions[opcode].clone();
  }
}
