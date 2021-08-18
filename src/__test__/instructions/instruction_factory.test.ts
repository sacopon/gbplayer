import { InstructionFactory } from "vm/instructions/instruction_factory";
import { LddAHl } from "vm/instructions/ldd/ldd_a_hl";
import { LddHlA } from "vm/instructions/ldd/ldd_hl_a";
import { LdhAN } from "vm/instructions/ldh/ldh_a_n";
import { LdhNA } from "vm/instructions/ldh/ldh_n_a";
import { LdiAHl } from "vm/instructions/ldi/ldi_a_hl";
import { LdiHlA } from "vm/instructions/ldi/ldi_hl_a";
import { LdAAddrC } from "vm/instructions/ld_r1_r2/ld_a_addr_c";
import { LdBN } from "vm/instructions/ld_r_n/ld_b_n";
import { LdCN } from "vm/instructions/ld_r_n/ld_c_n";
import { LdDN } from "vm/instructions/ld_r_n/ld_d_n";
import { LdCA } from "vm/instructions//ld_r1_r2/ld_c_a";
import { LdAA } from "vm/instructions/ld_r1_r2/ld_a_a";
import { LdAB } from "vm/instructions//ld_r1_r2/ld_a_b";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";
import { LdEN } from "vm/instructions/ld_r_n/ld_e_n";
import { LdHN } from "vm/instructions/ld_r_n/ld_h_n";
import { LdLN } from "vm/instructions/ld_r_n/ld_l_n";
import { LdAC } from "vm/instructions/ld_r1_r2/ld_a_c";
import { LdAD } from "vm/instructions/ld_r1_r2/ld_a_d";
import { LdAE } from "vm/instructions/ld_r1_r2/ld_a_e";
import { LdAH } from "vm/instructions/ld_r1_r2/ld_a_h";
import { LdAL } from "vm/instructions/ld_r1_r2/ld_a_l";
import { LdBB } from "vm/instructions/ld_r1_r2/ld_b_b";
import { LdBC } from "vm/instructions/ld_r1_r2/ld_b_c";
import { LdBD } from "vm/instructions/ld_r1_r2/ld_b_d";
import { LdBE } from "vm/instructions/ld_r1_r2/ld_b_e";
import { LdBH } from "vm/instructions/ld_r1_r2/ld_b_h";
import { LdBL } from "vm/instructions/ld_r1_r2/ld_b_l";
import { LdAAddrHl } from "vm/instructions/ld_r1_r2/ld_a_addr_hl";
import { LdBAddrHl } from "vm/instructions/ld_r1_r2/ld_b_addr_hl";
import { LdCB } from "vm/instructions/ld_r1_r2/ld_c_b";
import { LdCC } from "vm/instructions/ld_r1_r2/ld_c_c";
import { LdCD } from "vm/instructions/ld_r1_r2/ld_c_d";
import { LdCE } from "vm/instructions/ld_r1_r2/ld_c_e";
import { LdCH } from "vm/instructions/ld_r1_r2/ld_c_h";
import { LdCL } from "vm/instructions/ld_r1_r2/ld_c_l";
import { LdCAddrHl } from "vm/instructions/ld_r1_r2/ld_c_addr_hl";
import { LdDB } from "vm/instructions/ld_r1_r2/ld_d_b";
import { LdDC } from "vm/instructions/ld_r1_r2/ld_d_c";
import { LdDD } from "vm/instructions/ld_r1_r2/ld_d_d";
import { LdDE } from "vm/instructions/ld_r1_r2/ld_d_e";
import { LdEB } from "vm/instructions/ld_r1_r2/ld_e_b";
import { LdDAddrHl } from "vm/instructions/ld_r1_r2/ld_d_addr_hl";
import { LdDH } from "vm/instructions/ld_r1_r2/ld_d_h";
import { LdDL } from "vm/instructions/ld_r1_r2/ld_d_l";
import { LdEC } from "vm/instructions/ld_r1_r2/ld_e_c";
import { LdED } from "vm/instructions/ld_r1_r2/ld_e_d";
import { LdEE } from "vm/instructions/ld_r1_r2/ld_e_e";
import { LdEH } from "vm/instructions/ld_r1_r2/ld_e_h";
import { LdEL } from "vm/instructions/ld_r1_r2/ld_e_l";
import { LdEAddrHl } from "vm/instructions/ld_r1_r2/ld_e_addr_hl";

describe("instruction factory test", () => {
  let instructionFactory: InstructionFactory;

  beforeEach(() => {
    instructionFactory = new InstructionFactory(new RegisterSet(), new Memory(new Uint8Array(new ArrayBuffer(1))));
  });

  describe("LD nn, n", () => {
    test("LD B, n", () => {
      expect(instructionFactory.create(0x06)).toBeInstanceOf(LdBN);
    });

    test("LD C, n", () => {
      expect(instructionFactory.create(0x0E)).toBeInstanceOf(LdCN);
    });

    test("LD D, n", () => {
      expect(instructionFactory.create(0x16)).toBeInstanceOf(LdDN);
    });

    test("LD E, n", () => {
      expect(instructionFactory.create(0x1E)).toBeInstanceOf(LdEN);
    });

    test("LD H, n", () => {
      expect(instructionFactory.create(0x26)).toBeInstanceOf(LdHN);
    });

    test("LD L, n", () => {
      expect(instructionFactory.create(0x2E)).toBeInstanceOf(LdLN);
    });
  });

  describe("LD r1, r2", () => {
    describe("LD A, r2", () => {
      test("LD A, A", () => {
        expect(instructionFactory.create(0x7F)).toBeInstanceOf(LdAA);
      });

      test("LD A, B", () => {
        expect(instructionFactory.create(0x78)).toBeInstanceOf(LdAB);
      });

      test("LD A, C", () => {
        expect(instructionFactory.create(0x79)).toBeInstanceOf(LdAC);
      });

      test("LD A, D", () => {
        expect(instructionFactory.create(0x7A)).toBeInstanceOf(LdAD);
      });

      test("LD A, E", () => {
        expect(instructionFactory.create(0x7B)).toBeInstanceOf(LdAE);
      });

      test("LD A, H", () => {
        expect(instructionFactory.create(0x7C)).toBeInstanceOf(LdAH);
      });

      test("LD A, L", () => {
        expect(instructionFactory.create(0x7D)).toBeInstanceOf(LdAL);
      });
      test("LD A, (HL)", () => {
        expect(instructionFactory.create(0x7E)).toBeInstanceOf(LdAAddrHl);
      });
    });
    describe("LD B, r2", () => {
      test("LD B, B", () => {
        expect(instructionFactory.create(0x40)).toBeInstanceOf(LdBB);
      });
      test("LD B, C", () => {
        expect(instructionFactory.create(0x41)).toBeInstanceOf(LdBC);
      });
      test("LD B, D", () => {
        expect(instructionFactory.create(0x42)).toBeInstanceOf(LdBD);
      });
      test("LD B, E", () => {
        expect(instructionFactory.create(0x43)).toBeInstanceOf(LdBE);
      });
      test("LD B, H", () => {
        expect(instructionFactory.create(0x44)).toBeInstanceOf(LdBH);
      });
      test("LD B, L", () => {
        expect(instructionFactory.create(0x45)).toBeInstanceOf(LdBL);
      });
      test("LD B, (HL)", () => {
        expect(instructionFactory.create(0x46)).toBeInstanceOf(LdBAddrHl);
      });
    });
  });

  describe("LD C, r2", () => {
    test("LD C, B", () => {
      expect(instructionFactory.create(0x48)).toBeInstanceOf(LdCB);
    });

    test("LD C, C", () => {
      expect(instructionFactory.create(0x49)).toBeInstanceOf(LdCC);
    });

    test("LD C, D", () => {
      expect(instructionFactory.create(0x4A)).toBeInstanceOf(LdCD);
    });

    test("LD C, E", () => {
      expect(instructionFactory.create(0x4B)).toBeInstanceOf(LdCE);
    });

    test("LD C, H", () => {
      expect(instructionFactory.create(0x4C)).toBeInstanceOf(LdCH);
    });

    test("LD C, L", () => {
      expect(instructionFactory.create(0x4D)).toBeInstanceOf(LdCL);
    });

    test("LD C, (HL)", () => {
      expect(instructionFactory.create(0x4E)).toBeInstanceOf(LdCAddrHl);
    });
  });

  describe("LD D, r2", () => {
    test("LD D, B", () => {
      expect(instructionFactory.create(0x50)).toBeInstanceOf(LdDB);
    });
    test("LD D, C", () => {
      expect(instructionFactory.create(0x51)).toBeInstanceOf(LdDC);
    });
    test("LD D, D", () => {
      expect(instructionFactory.create(0x52)).toBeInstanceOf(LdDD);
    });
    test("LD D, E", () => {
      expect(instructionFactory.create(0x53)).toBeInstanceOf(LdDE);
    });
    test("LD D, H", () => {
      expect(instructionFactory.create(0x54)).toBeInstanceOf(LdDH);
    });
    test("LD D, L", () => {
      expect(instructionFactory.create(0x55)).toBeInstanceOf(LdDL);
    });
    test("LD D, (HL)", () => {
      expect(instructionFactory.create(0x56)).toBeInstanceOf(LdDAddrHl);
    });
  });

  describe("LD E, r2", () => {
    test("LD E, B", () => {
      expect(instructionFactory.create(0x58)).toBeInstanceOf(LdEB);
    });
    test("LD E, C", () => {
      expect(instructionFactory.create(0x59)).toBeInstanceOf(LdEC);
    });
    test("LD E, D", () => {
      expect(instructionFactory.create(0x5A)).toBeInstanceOf(LdED);
    });
    test("LD E, E", () => {
      expect(instructionFactory.create(0x5B)).toBeInstanceOf(LdEE);
    });
    test("LD E, H", () => {
      expect(instructionFactory.create(0x5C)).toBeInstanceOf(LdEH);
    });
    test("LD E, L", () => {
      expect(instructionFactory.create(0x5D)).toBeInstanceOf(LdEL);
    });
    test("LD E, (HL)", () => {
      expect(instructionFactory.create(0x5E)).toBeInstanceOf(LdEAddrHl);
    });
  });

  describe("LD A, (C)", () => {
    test("LD A, (C)", () => {
      expect(instructionFactory.create(0xF2)).toBeInstanceOf(LdAAddrC);
    });
  });

  describe("LD (C), A", () => {
    test("LD (C), A", () => {
      expect(instructionFactory.create(0xE2)).toBeInstanceOf(LdCA);
    });
  });

  describe("LDD A, (HL)", () => {
    test("LDD A, (HL)", () => {
      expect(instructionFactory.create(0x3A)).toBeInstanceOf(LddAHl);
    });
    test("LDD (HL), A", () => {
      expect(instructionFactory.create(0x32)).toBeInstanceOf(LddHlA);
    });
  });

  describe("LDI", () => {
    test("LDI A, (HL)", () => {
      expect(instructionFactory.create(0x2A)).toBeInstanceOf(LdiAHl);
    });

    test("LDI (HL), A", () => {
      expect(instructionFactory.create(0x22)).toBeInstanceOf(LdiHlA);
    });
  });

  describe("LDH", () => {
    test("LDH (n), A", () => {
      expect(instructionFactory.create(0xE0)).toBeInstanceOf(LdhNA);
    });

    test("LDH A, (n)", () => {
      expect(instructionFactory.create(0xF0)).toBeInstanceOf(LdhAN);
    });
  });
});
