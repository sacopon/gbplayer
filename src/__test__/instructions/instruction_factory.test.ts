import { InstructionFactory } from "vm/instructions/instruction_factory";
import { LoadImmediateIntoRegisterB } from "vm/instructions/load_immediate_into_register_b";
import { LoadImmediateIntoRegisterC } from "vm/instructions/load_immediate_into_register_c";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("instruction factory test", () => {
  let instructionFactory: InstructionFactory;
  let buffer: ArrayBuffer;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);
    instructionFactory = new InstructionFactory(new RegisterSet(), new Memory(new Uint8Array(buffer)));
  });

  test("create [LD B, n]", () => {
    const view = new DataView(buffer);
    view.setUint8(0, 0x06);

    expect(instructionFactory.create(0x06)).toBeInstanceOf(LoadImmediateIntoRegisterB);
  });

  test("create [LD C, n]", () => {
    const view = new DataView(buffer);
    view.setUint8(0, 0x0E);

    expect(instructionFactory.create(0x0E)).toBeInstanceOf(LoadImmediateIntoRegisterC);
  });
});
