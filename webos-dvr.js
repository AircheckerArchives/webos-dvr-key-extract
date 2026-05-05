var base = Module.findBaseAddress("libhal_crypto.so.2.0.1");
var target = base.add(0x3a21);

console.log("[+] HAL_CRYPTO_ReadDVRDeviceSecret @ " + target);

// int func(uint8_t *out, uint32_t *bits)
var fn = new NativeFunction(target, "int", ["pointer", "pointer"]);

var out = Memory.alloc(16);
var bits = Memory.alloc(4);

// zero output buffer
Memory.writeByteArray(out, new Uint8Array(16));

// set length in bits = 128
Memory.writeU32(bits, 128);

console.log("[*] before call: bits = " + Memory.readU32(bits));
console.log("[*] calling HAL_CRYPTO_ReadDVRDeviceSecret(out, bits)");

var rc = fn(out, bits);

console.log("[+] rc = " + rc);
console.log("[+] bits after = " + Memory.readU32(bits));

console.log("[*] out:");
console.log(hexdump(out, {
    offset: 0,
    length: 16,
    header: true,
    ansi: false
}));
