import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

/**
 * CPU/メモリへのアクセスを提供する
 */
export class CpuOperation {
  private readonly _register: RegisterSet;
  private readonly _memory: Memory;

  constructor(register: RegisterSet, memory: Memory) {
    this._register = register;
    this._memory = memory;
  }

  public assignA(value: number) {
    this._register.A = value;
  }

  public assignB(value: number) {
    this._register.B = value;
  }

  public assignC(value: number) {
    this._register.C = value;
  }

  public assignD(value: number) {
    this._register.D = value;
  }

  public assignE(value: number) {
    this._register.E = value;
  }

  public assignH(value: number) {
    this._register.H = value;
  }

  public assignL(value: number) {
    this._register.L = value;
  }

  public getA() {
    return this._register.A;
  }

  public getB() {
    return this._register.B;
  }

  public getC() {
    return this._register.C;
  }

  public getD() {
    return this._register.D;
  }

  public getE() {
    return this._register.E;
  }

  public getH() {
    return this._register.H;
  }

  public getHL() {
    return this._register.HL;
  }

  public incrementHL() {
    ++this._register.HL;
  }

  public decrementHL() {
    --this._register.HL;
  }

  public addProgramCounter(value: number) {
    this._register.PC += value;
  }

  public assignProgramCounter(value: number) {
    this._register.PC = value;
  }

  public readOperandUint8(offset: number = 0) {
    return this.readUint8(this._register.PC + offset);
  }

  public readOperandUint16(offset: number = 0) {
    return this.readUint16(this._register.PC + offset);
  }

  public readUint8(offset: number = 0) {
    return this._memory.getUint8(offset);
  }

  public writeUint8(offset: number, value: number) {
    return this._memory.setUint8(offset, value);
  }

  public readUint16(offset: number = 0) {
    return this._memory.getUint16(offset);
  }
}