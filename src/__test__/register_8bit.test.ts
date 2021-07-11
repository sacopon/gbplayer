import { Register8bit } from "vm/register_8bit";

test("constructor", () => {
  const reg = new Register8bit();
  expect(reg.value).toBe(0);
});

test("change valid value(under signed 8bit)", () => {
  const reg = new Register8bit();
  reg.value = 100;
  expect(reg.value).toBe(100);
});

test("change valid value(under unsigned 8bit)", () => {
  const reg = new Register8bit();
  reg.value = 200;
  expect(reg.value).toBe(200);
});

test("change value(over unsigned 8bit value)", () => {
  const reg = new Register8bit();
  expect(() => { reg.value = 65535; }).toThrow();
});

test("change value(minous value)", () => {
  const reg = new Register8bit();
  expect(() => { reg.value = -100; }).toThrow();
});
