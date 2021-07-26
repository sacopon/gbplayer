import { InstructionFactory } from "vm/instructions/instruction_factory";
import { LoadImmediateIntoRegisterB } from "vm/instructions/load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "vm/instructions/load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "vm/instructions/load_immediate_into_register_d";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("instruction factory test", () => {
  let instructionFactory: InstructionFactory;

  beforeEach(() => {
    instructionFactory = new InstructionFactory(new RegisterSet(), new Memory(new Uint8Array(new ArrayBuffer(1))));
  });

  test("create [LD B, n]", () => {
    expect(instructionFactory.create(0x06)).toBeInstanceOf(LoadImmediateIntoRegisterB);
  });

  test("create [LD C, n]", () => {
    expect(instructionFactory.create(0x0E)).toBeInstanceOf(LoadImmediateIntoRegisterC);
  });

  test("create [LD D, n]", () => {
    expect(instructionFactory.create(0x16)).toBeInstanceOf(LoadImmediateIntoRegisterD);
  });
});
