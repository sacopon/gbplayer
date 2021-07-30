import { CpuOperation } from "vm/cpu_operation";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("CpuAccessor test", () => {
  test("constructor", () => {
    const memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
    const register = new RegisterSet();
    const accessor = new CpuOperation(register, memory);
    expect(accessor).toBeInstanceOf(CpuOperation)
  });

  describe("register", () => {
    let memory: Memory;
    let register: RegisterSet;
    let operation: CpuOperation;

    beforeEach(() => {
      memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
      register = new RegisterSet();
      operation = new CpuOperation(register, memory);
    });

    test("A register", () => {
      operation.assignA(0xAB);
      expect(operation.getA()).toBe(0xAB)
    })

    test("B register", () => {
      operation.assignB(0xAB);
      expect(operation.getB()).toBe(0xAB)
    })

    test("C register", () => {
      operation.assignC(0xAB);
      expect(operation.getC()).toBe(0xAB)
    })

    test("D register", () => {
      operation.assignD(0xAB);
      expect(operation.getD()).toBe(0xAB)
    })
  });

  describe("Program Counter", () => {
    let memory: Memory;
    let register: RegisterSet;
    let operation: CpuOperation;

    beforeEach(() => {
      memory = new Memory(new Uint8Array(new ArrayBuffer(1)));
      register = new RegisterSet();
      operation = new CpuOperation(register, memory);
    });

    test("set program counter", () => {
      operation.assignProgramCounter(0xAB);
      expect(register.PC).toBe(0xAB);
    });

    test("add program counter", () => {
      operation.assignProgramCounter(0xAB);
      operation.addProgramCounter(1);
      expect(register.PC).toBe(0xAC);
    });
  });

  describe("memory", () => {
    let memory: Memory;
    let register: RegisterSet;
    let operation: CpuOperation;

    beforeEach(() => {
      const buffer = new ArrayBuffer(100 + 256);
      const view = new DataView(buffer);

      for (let i = 0; i < 256; ++i) {
        view.setUint8(100 + i, i);
      }

      memory = new Memory(new Uint8Array(buffer));
      register = new RegisterSet();
      operation = new CpuOperation(register, memory);
    });

    test("readOperandUint8", () => {
      operation.assignProgramCounter(100);
      expect(operation.readOperandUint8(1)).toBe(1);
      expect(operation.readOperandUint8(2)).toBe(2);
    });

    test("readOperandUint16", () => {
      operation.assignProgramCounter(100);
      expect(operation.readOperandUint16(1)).toBe(0x0201);
    });

    test("readUint8", () => {
      expect(operation.readUint8(100 + 1)).toBe(1);
      expect(operation.readUint8(100 + 2)).toBe(2);
    });

    test("writeUint8", () => {
      operation.writeUint8(100 + 1, 0xAB);
      expect(operation.readUint8(100 + 1)).toBe(0xAB);
    });

    test("readUint16", () => {
      expect(operation.readUint16(100 + 1)).toBe(0x0201);
    });
  });
});
