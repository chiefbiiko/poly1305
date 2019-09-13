# poly1305

Poly1305 as defined by [RFC 8439](https://tools.ietf.org/html/rfc8439).

[![Travis](http://img.shields.io/travis/chiefbiiko/poly1305.svg?style=flat)](http://travis-ci.org/chiefbiiko/poly1305) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/poly1305?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/poly1305)

## API

``` ts
export const OUTPUT_BYTES: number = 16;
export const KEY_BYTES: number = 32;

export function poly1305(
  out: Uint8Array,
  key: Uint8Array,
  msg: Uint8Array
): void;
```

`poly1305` does not do any input validation. Make sure the `out` and `key` arguments are of correct size.

## License

[MIT](./LICENSE)