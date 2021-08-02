import { CpuOperation } from "vm/cpu_operation";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";
import { JpNn } from "./jp_nn";
import { LddAHl } from "./ldd_a_hl";
import { LddHlA } from "./ldd_hl_a";
import { LdhAN } from "./ldh_a_n";
import { LdhNA } from "./ldh_n_a";
import { LdiAHl } from "./ldi_a_hl";
import { LdiHlA } from "./ldi_hl_a";
import { LdAC } from "./ld_a_c";
import { LdBN } from "./ld_b_n";
import { LdCN } from "./ld_c_n";
import { LdDN } from "./ld_d_n";
import { LdCA } from "./ld_c_a";
import { LdAA } from "./ld_a_a";
import { LdAB } from "./ld_a_b";
import { Nop } from "./nop";
import { LdEN } from "./ld_e_n";
import { LdHN } from "./ld_h_n";

const enum OPCODES {
  /** NOP */
  NOP = 0,
  /** JP nn # nn = 16bit address */
  JP_NN = 0xC3,
  /** LD B, n # n = 8bit immediate value */
  LD_B_N = 0x06,
  /** LD C, n # n = 8bit immediate value */
  LD_C_N = 0x0E,
  /** LD D, n # n = 8bit immediate value */
  LD_D_N = 0x16,
  /** LD E, n # n = 8bit immediate value */
  LD_E_N = 0x1E,
  /** LD H, n # n = 8bit immediate value */
  LD_H_N = 0x26,
  /** LD A, A */
  LD_A_A = 0x7F,
  /** LD A, B */
  LD_A_B = 0x78,
  /** LD A, (C) */
  LD_A_C = 0xF2,
  /** LD (C), A */
  LD_C_A = 0xE2,
  /** LDD A, (HL) */
  LDD_A_HL = 0x3A,
  /** LDD (HL), A */
  LDD_HL_A = 0x32,
  /** LDI A, (HL) */
  LDI_ADDRESS_INTO_REGISTER = 0x2A,
  /** LDI (HL), A */
  LDI_REGISTER_INTO_ADDRESS = 0x22,
  /** LDH (n), A */
  LDH_ADDRESS_INTO_REGISTER = 0xE0,
  /** LDH A, (n) */
  LDH_REGISTER_INTO_ADDRESS = 0xF0,
};

export class InstructionFactory {
  private _operation: CpuOperation;

  constructor(register: RegisterSet, memory: Memory) {
    this._operation = new CpuOperation(register, memory);
  }

  public create(opcode: number): Instruction {
    let instruction: Instruction | null = null;

    switch (opcode) {
      case OPCODES.NOP:
        instruction = new Nop(this._operation);
        break;

      case OPCODES.JP_NN:
        instruction = new JpNn(this._operation);
        break;

      case OPCODES.LD_B_N:
        instruction = new LdBN(this._operation);
        break;

      case OPCODES.LD_C_N:
        instruction = new LdCN(this._operation);
        break;

      case OPCODES.LD_D_N:
        instruction = new LdDN(this._operation);
        break;

      case OPCODES.LD_E_N:
        instruction = new LdEN(this._operation);
        break;
  
      case OPCODES.LD_H_N:
        instruction = new LdHN(this._operation);
        break;

      case OPCODES.LD_A_A:
        instruction = new LdAA(this._operation);
        break;

      case OPCODES.LD_A_B:
        instruction = new LdAB(this._operation);
        break;

      case OPCODES.LD_A_C:
        instruction = new LdAC(this._operation);
        break;

      case OPCODES.LD_C_A:
        instruction = new LdCA(this._operation);
        break;

      case OPCODES.LDD_A_HL:
        instruction = new LddAHl(this._operation);
        break;

      case OPCODES.LDD_HL_A:
        instruction = new LddHlA(this._operation);
        break;

      case OPCODES.LDI_ADDRESS_INTO_REGISTER:
        instruction = new LdiAHl(this._operation);
        break;

      case OPCODES.LDI_REGISTER_INTO_ADDRESS:
        instruction = new LdiHlA(this._operation);
        break;

      case OPCODES.LDH_ADDRESS_INTO_REGISTER:
        instruction = new LdhNA(this._operation);
        break;

      case OPCODES.LDH_REGISTER_INTO_ADDRESS:
        instruction = new LdhAN(this._operation);
        break;

      default:
        throw new Error("no implementation");
    }

    return instruction;
  }
}