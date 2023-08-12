
/* IMPORT */

import {sha256} from 'crypto-sha';
import {describe} from 'fava';
import timingSafeEquals from '../dist/index.js';

/* HELPERS */

const encoder = new TextEncoder ();

/* MAIN */

describe ( 'Crypto Timing-Safe Equals', it => {

  it ( 'can compare strings', t => {

    t.is ( timingSafeEquals ( 'foo', 'foo' ), true );
    t.is ( timingSafeEquals ( 'foo', 'bar' ), false );

  });

  it ( 'can compare Uint8Arrays', t => {

    t.is ( timingSafeEquals ( new Uint8Array ([ 102, 111, 111 ]), new Uint8Array ([ 102, 111, 111 ]) ), true );
    t.is ( timingSafeEquals ( new Uint8Array ([ 102, 111, 111 ]), new Uint8Array ([ 98, 97, 114 ]) ), false );

  });

  it ( 'can compare strings in a constant amount of time', async t => {

    const secret = encoder.encode ( ( await sha256 ( 'secret' ) ).repeat ( 1000 ) );
    const other = encoder.encode ( ( await sha256 ( 'nope' ) ).repeat ( 1000 ) );

    const start1 = Date.now ();
    for ( let i = 0; i < 20_000; i++ ) {
      timingSafeEquals ( secret, secret );
    }
    const end1 = Date.now ();
    const elapsed1 = end1 - start1;

    const start2 = Date.now ();
    for ( let i = 0; i < 20_000; i++ ) {
      timingSafeEquals ( secret, other );
    }
    const end2 = Date.now ();
    const elapsed2 = end2 - start2;

    t.true ( ( elapsed1 / elapsed2 ) > 0.99 && ( elapsed1 / elapsed2 ) < 1.01 );

  });

});
