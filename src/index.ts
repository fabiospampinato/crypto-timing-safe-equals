
/* HELPERS */

const encoder = new TextEncoder ();

/* MAIN */

//URL: https://blog.ircmaxell.com/2012/12/seven-ways-to-screw-up-bcrypt.html?m=1#8-Bonus-Not-Using-A-Timing-Safe-Comparison

const timingSafeEqual = ( safe: Uint8Array | string, user: Uint8Array | string ): boolean => {

  if ( typeof safe === 'string' ) safe = encoder.encode ( safe );
  if ( typeof user === 'string' ) user = encoder.encode ( user );

  const safeLength = safe.length;
  const userLength = user.length;

  let result = safeLength - userLength;

  for ( let i = 0; i < userLength; i++ ) {

    const safeByte = safe[i % safeLength];
    const userByte = user[i];

    result |= safeByte ^ userByte;

  }

  return result === 0;

};

/* EXPORT */

export default timingSafeEqual;
