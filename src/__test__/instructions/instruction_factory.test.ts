import { InstructionFactory } from "vm/instructions/instruction_factory";
import { LoadImmediateIntoRegisterB } from "vm/instructions/load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "vm/instructions/load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "vm/instructions/load_immediate_into_register_d";
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
});
