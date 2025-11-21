 import { describe, expect, it } from "vitest";
 import { formatCurrency, formatOdds } from "../src/lib/utils/format";

 describe("format helpers", () => {
   it("formats currency in USD", () => {
     expect(formatCurrency(1234)).toContain("$");
   });

   it("formats odds as percentage", () => {
     expect(formatOdds(0.42)).toBe("42.0%");
   });
 });



