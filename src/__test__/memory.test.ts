import { GameBoy } from "vm/game_boy";
import { Memory } from "vm/memory";

describe("Memory test", () => {
  const size = 100;
  let buffer: ArrayBuffer;
  let typedArray: Uint8Array;
  let memory: Memory;

  beforeEach(() => {
    buffer = new ArrayBuffer(size);
    typedArray = new Uint8Array(buffer);
    for (let i = 0; i < size; ++i) {
      typedArray[i] = 0x11;
    }

    memory = new Memory(typedArray);
  });

  test("getUint8", () => {
    for (let i = 0; i < size; ++i) {
      expect(memory.getUint8(i)).toBe(0x11);
    }
  });

  test("getUint16", () => {
    for (let i = 0; i < size; i += 2) {
      expect(memory.getUint16(i)).toBe(0x1111);
    }
  });
});
