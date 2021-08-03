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
import { LdAC } from "./ld_r1_r2/ld_a_c";
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

const enum OPCODES {
  /** NOP */
  NOP = 0,
  /** LD B, n # n = 8bit immediate value */
  LD_B_N = 0x06,
  /** LD C, n # n = 8bit immediate value */
  LD_C_N = 0x0E,
  /** LD D, n # n = 8bit immediate value */
  LD_D_N = 0x16,
  /** LD E, n # n = 8bit immediate value */
  LD_E_N = 0x1E,
  /** LDI (HL), A */
  LDI_HL_A = 0x22,
  /** LD H, n # n = 8bit immediate value */
  LD_H_N = 0x26,
  /** LDI A, (HL) */
  LDI_A_HL = 0x2A,
  /** LD L, n # n = 8bit immediate value */
  LD_L_N = 0x2E,
  /** LDD (HL), A */
  LDD_HL_A = 0x32,
  /** LDD A, (HL) */
  LDD_A_HL = 0x3A,
  /** LD A, A */
  LD_A_A = 0x7F,
  /** LD A, B */
  LD_A_B = 0x78,
  /** JP nn # nn = 16bit address */
  JP_NN = 0xC3,
  /** LDH A, (n) */
  LDH_A_N = 0xF0,
  /** LDH (n), A */
  LDH_N_A = 0xE0,
  /** LD (C), A */
  LD_C_A = 0xE2,
  /** LD A, (C) */
  LD_A_C = 0xF2,
};

export class InstructionFactory {
  private _operation: CpuOperation;
  private _allInstructions: Instruction[];

  constructor(register: RegisterSet, memory: Memory) {
    this._operation = new CpuOperation(register, memory);

    this._allInstructions = [];
    this._allInstructions[OPCODES.NOP] = new Nop(this._operation);
    this._allInstructions[OPCODES.LD_B_N] = new LdBN(this._operation);
    this._allInstructions[OPCODES.LD_C_N] = new LdCN(this._operation);
    this._allInstructions[OPCODES.LD_D_N] = new LdDN(this._operation);
    this._allInstructions[OPCODES.LD_E_N] = new LdEN(this._operation);
    this._allInstructions[OPCODES.LDI_HL_A] = new LdiHlA(this._operation);
    this._allInstructions[OPCODES.LD_H_N] = new LdHN(this._operation);
    this._allInstructions[OPCODES.LDI_A_HL] = new LdiAHl(this._operation);
    this._allInstructions[OPCODES.LD_L_N] = new LdLN(this._operation);
    this._allInstructions[OPCODES.LDD_HL_A] = new LddHlA(this._operation);
    this._allInstructions[OPCODES.LDD_A_HL] = new LddAHl(this._operation);
    this._allInstructions[OPCODES.LD_A_A] = new LdAA(this._operation);
    this._allInstructions[OPCODES.LD_A_B] = new LdAB(this._operation);
    this._allInstructions[OPCODES.JP_NN] = new JpNn(this._operation);
    this._allInstructions[OPCODES.LDH_A_N] = new LdhAN(this._operation);
    this._allInstructions[OPCODES.LDH_N_A] = new LdhNA(this._operation);
    this._allInstructions[OPCODES.LD_C_A] = new LdCA(this._operation);
    this._allInstructions[OPCODES.LD_A_C] = new LdAC(this._operation);
  }

  public create(opcode: number): Instruction {
    if (!this._allInstructions[opcode]) {
      throw new Error("no implementation");
    }

    return this._allInstructions[opcode].clone();
  }

  public create2(opcode: number): Instruction {
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

      case OPCODES.LD_L_N:
        instruction = new LdLN(this._operation);
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

      case OPCODES.LDI_A_HL:
        instruction = new LdiAHl(this._operation);
        break;

      case OPCODES.LDI_HL_A:
        instruction = new LdiHlA(this._operation);
        break;

      case OPCODES.LDH_N_A:
        instruction = new LdhNA(this._operation);
        break;

      case OPCODES.LDH_A_N:
        instruction = new LdhAN(this._operation);
        break;

      default:
        throw new Error("no implementation");
    }

    return instruction;
  }
}