import { Register16bit } from "vm/register_16bit";

test("constructor", () => {
  const reg = new Register16bit();
  expect(reg.value).toBe(0);
});

test("change valid value(under signed 16bit)", () => {
  const reg = new Register16bit();
  reg.value = 40000;
  expect(reg.value).toBe(40000);
});

test("change valid value(under unsigned 16bit)", () => {
  const reg = new Register16bit();
  reg.value = 65000;
  expect(reg.value).toBe(65000);
});

test("change value(over unsigned 16bit value)", () => {
  const reg = new Register16bit();
  expect(() => { reg.value = 100000; }).toThrow();
});

test("change value(minous value)", () => {
  const reg = new Register16bit();
  expect(() => { reg.value = -100; }).toThrow();
});

test("get 8bit(hi) value", () => {
  const reg = new Register16bit();
  reg.value = 10000;

  expect(reg.hi).toBe(39);
});

test("set 8bit(hi) value", () => {
  const reg = new Register16bit();
  reg.hi = 100;

  expect(reg.hi).toBe(100);
});

test("get 8bit(lo) value", () => {
  const reg = new Register16bit();
  reg.value = 10000;

  expect(reg.lo).toBe(16);
});

test("set 8bit(lo) value", () => {
  const reg = new Register16bit();
  reg.lo = 100;

  expect(reg.lo).toBe(100);
});
