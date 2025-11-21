 import { describe, expect, it } from "vitest";
 import { toNumber } from "../src/lib/utils/parse";

 describe("parse utils", () => {
   it("coerces invalid numbers to zero", () => {
     expect(toNumber("abc")).toBe(0);
   });

   it("returns numeric value for valid inputs", () => {
     expect(toNumber("42")).toBe(42);
   });
 });



