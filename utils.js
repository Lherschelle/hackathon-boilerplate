function generateReferenceNumber() {
  function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 10); // 0 to 9
  }

  let referenceNumber = "";

  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    referenceNumber += getRandomLetter();
  }

  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    referenceNumber += getRandomNumber();
  }

  // Generate 1 random letter
  referenceNumber += getRandomLetter();

  return referenceNumber;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = { generateReferenceNumber, validateEmail };
