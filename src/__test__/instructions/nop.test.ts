import { NOP } from "vm/instructions/nop";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("nop test", () => {
  let memory: Memory;
  let register: RegisterSet;

  beforeEach(() => {
    memory = new Memory(new Uint8Array(new ArrayBuffer(10)));
    register = new RegisterSet();
  });

  test("exec", () => {
    const prevRegister = register.clone();
    const nop = new NOP(register, memory);
    const cycle = nop.exec();

    expect(cycle).toBe(4);
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.PC).toBe(prevRegister.PC + 1);
  });
});
