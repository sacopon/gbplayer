import { ProgramCounter } from "vm/register/program_counter";

describe("ProgramCounter test", () => {
  test("initial value", () => {
    const pc = new ProgramCounter();
    expect(pc.value).toBe(0x0100);
  });
});
