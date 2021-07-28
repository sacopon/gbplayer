import { CpuAccessor } from "vm/cpu_accessor";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("CpuAccessor test", () => {
  test("constructor", () => {
    const memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
    const register = new RegisterSet();
    const accessor = new CpuAccessor(register, memory);
    expect(accessor).toBeInstanceOf(CpuAccessor)
  });

  describe("register", () => {
    let memory: Memory;
    let register: RegisterSet;
    let accessor: CpuAccessor;

    beforeEach(() => {
      memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
      register = new RegisterSet();
      accessor = new CpuAccessor(register, memory);
    });

    test("A register", () => {
      accessor.assignA(0xAB);
      expect(accessor.getA()).toBe(0xAB)
    })

    test("B register", () => {
      accessor.assignB(0xAB);
      expect(accessor.getB()).toBe(0xAB)
    })

    test("C register", () => {
      accessor.assignC(0xAB);
      expect(accessor.getC()).toBe(0xAB)
    })

    test("D register", () => {
      accessor.assignD(0xAB);
      expect(accessor.getD()).toBe(0xAB)
    })
  });

  describe("Program Counter", () => {
    let memory: Memory;
    let register: RegisterSet;
    let accessor: CpuAccessor;

    beforeEach(() => {
      memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
      register = new RegisterSet();
      accessor = new CpuAccessor(register, memory);
    });

    test("set program counter", () => {
      accessor.assignProgramCounter(0xAB);
      expect(register.PC).toBe(0xAB);
    });

    test("add program counter", () => {
      accessor.assignProgramCounter(0xAB);
      accessor.addProgramCounter(1);
      expect(register.PC).toBe(0xAC);
    });
  });

  describe("memory", () => {
    let memory: Memory;
    let register: RegisterSet;
    let accessor: CpuAccessor;

    beforeEach(() => {
      const buffer = new ArrayBuffer(100 + 256);
      const view = new DataView(buffer);

      for (let i = 0; i < 256; ++i) {
        view.setUint8(100 + i, i);
      }

      memory = new Memory(new Uint8Array(buffer));
      register = new RegisterSet();
      accessor = new CpuAccessor(register, memory);
    });

    test("readOperandUint8", () => {
      accessor.assignProgramCounter(100);
      expect(accessor.readOperandUint8(1)).toBe(1);
      expect(accessor.readOperandUint8(2)).toBe(2);
    });

    test("readOperandUint16", () => {
      accessor.assignProgramCounter(100);
      expect(accessor.readOperandUint16(1)).toBe(0x0201);
    });

    test("readUint8", () => {
      expect(accessor.readOperandUint8(100 + 1)).toBe(1);
      expect(accessor.readOperandUint8(100 + 2)).toBe(2);
    });

    test("readUint16", () => {
      expect(accessor.readOperandUint16(100 + 1)).toBe(0x0201);
    });
  });
});
