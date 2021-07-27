export const OPECODE_BYTE = 1;
export const IMMEDIATE_1BYTE = 1;

export interface Instruction {
  exec(): number;
}
