import { test, runIfMain } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { encode } from "https://denopkg.com/chiefbiiko/std-encoding/mod.ts";
import { OUTPUT_BYTES, poly1305 } from "./mod.ts";

import "./poly1305_clamp/poly1305_clamp_test.ts";
import "./poly1305_msg_block_to_big_int/poly1305_msg_block_to_big_int_test.ts";

interface TestVector {
  key: Uint8Array;
  msg: Uint8Array;
  tag: Uint8Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(Deno.readFileSync(`./test_vectors.json`))
  ).map(
    (testVector: { [key: string]: string }): TestVector => ({
      key: encode(testVector.key, "hex"),
      msg: encode(testVector.msg, "hex"),
      tag: encode(testVector.tag, "hex")
    })
  );
}

// See https://tools.ietf.org/html/rfc8439
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ key, msg, tag: expected }: TestVector, i: number): void => {
    test({
      name: `poly1305 [${i}]`,
      fn(): void {
        const tag: Uint8Array = new Uint8Array(OUTPUT_BYTES);
        
        poly1305(tag, key, msg);
        
        assertEquals(tag, expected);
      }
    });
  }
);

runIfMain(import.meta, { parallel: true });
