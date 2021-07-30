import { InstructionFactory } from "vm/instructions/instruction_factory";
import { LddAddressIntoRegister } from "vm/instructions/ldd_address_into_register";
import { LddRegisterIntoAddress } from "vm/instructions/ldd_register_into_address";
import { LdhAN } from "vm/instructions/ldh_a_n";
import { LdhNA } from "vm/instructions/ldh_n_a";
import { LdiAHl } from "vm/instructions/ldi_a_hl";
import { LdiHlA } from "vm/instructions/ldi_hl_a";
import { LoadAddressRegisterCIntoRegisterA } from "vm/instructions/load_address_register_c_into_register_a";
import { LoadImmediateIntoRegisterB } from "vm/instructions/load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "vm/instructions/load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "vm/instructions/load_immediate_into_register_d";
import { LoadRegisterAIntoAddressRegisterC } from "vm/instructions/load_register_a_into_address_register_c";
import { LoadRegisterAIntoRegisterA } from "vm/instructions/load_register_a_into_register_a";
import { LoadRegisterBIntoRegisterA } from "vm/instructions/load_register_b_into_register_a";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("instruction factory test", () => {
  let instructionFactory: InstructionFactory;

  beforeEach(() => {
    instructionFactory = new InstructionFactory(new RegisterSet(), new Memory(new Uint8Array(new ArrayBuffer(1))));
  });

  describe("LD nn, n", () => {
    test("LD B, n", () => {
      expect(instructionFactory.create(0x06)).toBeInstanceOf(LoadImmediateIntoRegisterB);
    });

    test("LD C, n", () => {
      expect(instructionFactory.create(0x0E)).toBeInstanceOf(LoadImmediateIntoRegisterC);
    });

    test("LD D, n", () => {
      expect(instructionFactory.create(0x16)).toBeInstanceOf(LoadImmediateIntoRegisterD);
    });
  });

  describe("LD r1, r2", () => {
    test("LD A, A", () => {
      expect(instructionFactory.create(0x7F)).toBeInstanceOf(LoadRegisterAIntoRegisterA);
    });

    test("LD A, B", () => {
      expect(instructionFactory.create(0x78)).toBeInstanceOf(LoadRegisterBIntoRegisterA);
    });
  });

  describe("LD A, (C)", () => {
    test("LD A, (C)", () => {
      expect(instructionFactory.create(0xF2)).toBeInstanceOf(LoadAddressRegisterCIntoRegisterA);
    });
  });

  describe("LD (C), A", () => {
    test("LD (C), A", () => {
      expect(instructionFactory.create(0xE2)).toBeInstanceOf(LoadRegisterAIntoAddressRegisterC);
    });
  });

  describe("LDD A, (HL)", () => {
    test("LDD A, (HL)", () => {
      expect(instructionFactory.create(0x3A)).toBeInstanceOf(LddAddressIntoRegister);
    });
    test("LDD (HL), A", () => {
      expect(instructionFactory.create(0x32)).toBeInstanceOf(LddRegisterIntoAddress);
    });
  });

  describe("LDI", () => {
    test("LDI A, (HL)", () => {
      expect(instructionFactory.create(0x2A)).toBeInstanceOf(LdiAHl);
    });

    test("LDI (HL), A", () => {
      expect(instructionFactory.create(0x22)).toBeInstanceOf(LdiHlA);
    });
  });

  describe("LDH", () => {
    test("LDH (n), A", () => {
      expect(instructionFactory.create(0xE0)).toBeInstanceOf(LdhNA);
    });

    test("LDH A, (n)", () => {
      expect(instructionFactory.create(0xF0)).toBeInstanceOf(LdhAN);
    });
  });
});
