import { JMP } from "vm/instructions/jmp";
import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";

describe("jmp test", () => {
  let buffer: ArrayBuffer;
  let register: Registers;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);

    register = new Registers();
    register.PC = 0;
  });

  test("readOperands", () => {
    const prevRegister = register.clone();

    const jmp = new JMP(register, new Memory(new Uint8Array(buffer)));
    expect(register.PC).toBe(prevRegister.PC + 2);
  });

  test("exec", () => {
    const view = new DataView(buffer);
    view.setUint16(0, 0x1234);

    const prevRegister = register.clone();
    const jmp = new JMP(register, new Memory(new Uint8Array(buffer)));
    const cycle = jmp.exec();

    expect(cycle).toBe(16);
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.PC).toBe(0x1234);
  });
});
