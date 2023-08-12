# Crypto Timing-Safe Equals

An isomorphic timing-safe equality function for strings and Uint8Arrays.

This is a port of @ircmaxell's function for PHP, published [here](https://blog.ircmaxell.com/2012/12/seven-ways-to-screw-up-bcrypt.html?m=1#8-Bonus-Not-Using-A-Timing-Safe-Comparison).

If you want to avoid leaking the length of your secret, you should always pass that as the _first_ argument to the function.

## Install

```sh
npm install --save crypto-timing-safe-equals
```

## Usage

```ts
import timingSafeEquals from 'crypto-timing-safe-equals';

// Check if two strings are equal, in a timing-safe manner

timingSafeEquals ( 'secret', 'attempt' ); // => false

// Check if two Uint8Arrays are equal, in a timing-safe manner

timingSafeEquals ( new Uint8Array ([ 102, 111, 111 ]), new Uint8Array ([ 98, 97, 114 ]) ); // => false
```

## License

MIT © Fabio Spampinato
