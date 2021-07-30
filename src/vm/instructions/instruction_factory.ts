import { CpuOperation } from "vm/cpu_operation";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";
import { JpNn } from "./jp_nn";
import { LddAHl } from "./ldd_a_hl";
import { LddRegisterIntoAddress } from "./ldd_register_into_address";
import { LdhAN } from "./ldh_a_n";
import { LdhNA } from "./ldh_n_a";
import { LdiAHl } from "./ldi_a_hl";
import { LdiHlA } from "./ldi_hl_a";
import { LoadAddressRegisterCIntoRegisterA } from "./load_address_register_c_into_register_a";
import { LoadImmediateIntoRegisterB } from "./load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "./load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "./load_immediate_into_register_d";
import { LoadRegisterAIntoAddressRegisterC } from "./load_register_a_into_address_register_c";
import { LoadRegisterAIntoRegisterA } from "./load_register_a_into_register_a";
import { LoadRegisterBIntoRegisterA } from "./load_register_b_into_register_a";
import { NOP } from "./nop";

const enum OPCODES {
  /** NOP */
  NOP = 0,
  /** JP nn # nn = 16bit address */
  JP_NN = 0xC3,
  /** LD B, n # n = 8bit immediate value */
  LOAD_IMMIDIATE_INTO_REGISTER_B = 0x06,
  /** LD C, n # n = 8bit immediate value */
  LOAD_IMMIDIATE_INTO_REGISTER_C = 0x0E,
  /** LD D, n # n = 8bit immediate value */
  LOAD_IMMIDIATE_INTO_REGISTER_D = 0x16,
  /** LD A, A */
  LOAD_REGISTER_A_INTO_REGISTER_A = 0x7F,
  /** LD A, B */
  LOAD_REGISTER_B_INTO_REGISTER_A = 0x78,
  /** LD A, (C) */
  LOAD_ADDRESS_REGISTER_C_INTO_REGISTER_A = 0xF2,
  /** LD (C), A */
  LOAD_REGISTER_A_INTO_ADDRESS_REGISTER_C = 0xE2,
  /** LDD A, (HL) */
  LDD_A_HL = 0x3A,
  /** LDD (HL), A */
  LDD_REGISTER_INTO_ADDRESS = 0x32,
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
        instruction = new NOP(this._operation);
        break;

      case OPCODES.JP_NN:
        instruction = new JpNn(this._operation);
        break;

      case OPCODES.LOAD_IMMIDIATE_INTO_REGISTER_B:
        instruction = new LoadImmediateIntoRegisterB(this._operation);
        break;

      case OPCODES.LOAD_IMMIDIATE_INTO_REGISTER_C:
        instruction = new LoadImmediateIntoRegisterC(this._operation);
        break;

      case OPCODES.LOAD_IMMIDIATE_INTO_REGISTER_D:
        instruction = new LoadImmediateIntoRegisterD(this._operation);
        break;

      case OPCODES.LOAD_REGISTER_A_INTO_REGISTER_A:
        instruction = new LoadRegisterAIntoRegisterA(this._operation);
        break;

      case OPCODES.LOAD_REGISTER_B_INTO_REGISTER_A:
        instruction = new LoadRegisterBIntoRegisterA(this._operation);
        break;

      case OPCODES.LOAD_ADDRESS_REGISTER_C_INTO_REGISTER_A:
        instruction = new LoadAddressRegisterCIntoRegisterA(this._operation);
        break;

      case OPCODES.LOAD_REGISTER_A_INTO_ADDRESS_REGISTER_C:
        instruction = new LoadRegisterAIntoAddressRegisterC(this._operation);
        break;

      case OPCODES.LDD_A_HL:
        instruction = new LddAHl(this._operation);
        break;

      case OPCODES.LDD_REGISTER_INTO_ADDRESS:
        instruction = new LddRegisterIntoAddress(this._operation);
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