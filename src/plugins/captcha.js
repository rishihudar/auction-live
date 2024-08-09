const LENGTH_OF_CAPTCHA = 6;
const MIN_NUMERIC_CHARS = 2; // Minimum number of numeric characters required in the CAPTCHA
const ALPHABETS = '23456789QWERTYUPASDFGHJKZXCVBNMqwertyupasdfghjkzxcvbnmi';
const NUMERIC_CHARS = '23456789';

const Captcha = {
  // generateCaptcha generates a random CAPTCHA with at least MIN_NUMERIC_CHARS numeric characters
  generateCaptcha() {
    let captchaCode = '';
    let numericCount = 0;
    
    // Generate CAPTCHA ensuring the required number of numeric characters
    for (let i = 0; i < LENGTH_OF_CAPTCHA; i++) {
      if (numericCount < MIN_NUMERIC_CHARS) {
        // Randomly decide if a numeric character should be added
        if (Math.random() < (MIN_NUMERIC_CHARS - numericCount) / (LENGTH_OF_CAPTCHA - i)) {
          captchaCode += NUMERIC_CHARS[Math.floor(Math.random() * NUMERIC_CHARS.length)]+" ";
          numericCount++;
        } else {
          captchaCode += ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)]+" ";
        }
      } else {
        captchaCode += ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)]+" ";
      }
    }

    return captchaCode;
  },

  // validateCaptcha validates the CAPTCHA code entered
  validateCaptcha(generatedCaptcha, enteredCaptcha) {
    console.log('generatedCaptcha', generatedCaptcha);
    console.log('enteredCaptcha', enteredCaptcha);
    return generatedCaptcha === enteredCaptcha;
  }
};

export default Captcha;
