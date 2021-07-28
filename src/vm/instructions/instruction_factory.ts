import { CpuAccessor } from "vm/cpu_accessor";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { Instruction } from "./instruction";
import { JumpToAddress } from "./jump_to_address";
import { LoadAddressRegisterCIntoRegisterA } from "./load_address_register_c_into_register_a";
import { LoadImmediateIntoRegisterB } from "./load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "./load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "./load_immediate_into_register_d";
import { LoadRegisterAIntoAddressRegisterC } from "./load_register_a_into_address_register_c";
import { LoadRegisterAIntoRegisterA } from "./load_register_a_into_register_a";
import { LoadRegisterBIntoRegisterA } from "./load_register_b_into_register_a";
import { NOP } from "./nop";

const enum OPECODES {
  /** NOP */
  NOP = 0,
  /** JP nn # nn = 16bit address */
  JUMP_TO_ADDRESS = 0xC3,
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
};

export class InstructionFactory {
  private _accessor: CpuAccessor;

  constructor(register: RegisterSet, memory: Memory) {
    this._accessor = new CpuAccessor(register, memory);
  }

  public create(opecode: number): Instruction {
    let instruction: Instruction | null = null;

    switch (opecode) {
      case OPECODES.NOP:
        instruction = new NOP(this._accessor);
        break;

      case OPECODES.JUMP_TO_ADDRESS:
        instruction = new JumpToAddress(this._accessor);
        break;

      case OPECODES.LOAD_IMMIDIATE_INTO_REGISTER_B:
        instruction = new LoadImmediateIntoRegisterB(this._accessor);
        break;

      case OPECODES.LOAD_IMMIDIATE_INTO_REGISTER_C:
        instruction = new LoadImmediateIntoRegisterC(this._accessor);
        break;

      case OPECODES.LOAD_IMMIDIATE_INTO_REGISTER_D:
        instruction = new LoadImmediateIntoRegisterD(this._accessor);
        break;

      case OPECODES.LOAD_REGISTER_A_INTO_REGISTER_A:
        instruction = new LoadRegisterAIntoRegisterA(this._accessor);
        break;

      case OPECODES.LOAD_REGISTER_B_INTO_REGISTER_A:
        instruction = new LoadRegisterBIntoRegisterA(this._accessor);
        break;

      case OPECODES.LOAD_ADDRESS_REGISTER_C_INTO_REGISTER_A:
          instruction = new LoadAddressRegisterCIntoRegisterA(this._accessor);
          break;

      case OPECODES.LOAD_REGISTER_A_INTO_ADDRESS_REGISTER_C:
        instruction = new LoadRegisterAIntoAddressRegisterC(this._accessor);
        break;

      default:
        throw new Error("no implementation");
    }

    return instruction;
  }
}