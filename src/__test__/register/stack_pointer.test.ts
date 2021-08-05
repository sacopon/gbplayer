import { StackPointer } from "vm/register/stack_pointer";

describe("StackPointer test", () => {
  let reg: StackPointer;

  beforeEach(() => {
    reg = new StackPointer();
  })

  test("constructor", () => {
    expect(reg.value).toBe(0);
  });

  test("change valid value(under signed 16bit)", () => {
    reg = new StackPointer(32000);
    expect(reg.value).toBe(32000);
  });

  test("change valid value(under unsigned 16bit)", () => {
    reg = new StackPointer(65000);
    expect(reg.value).toBe(65000);
  });

  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg = new StackPointer(100000); }).toThrow();
  });

  test("change value(minous value)", () => {
    expect(() => { reg = new StackPointer(-100); }).toThrow();
  });
});
