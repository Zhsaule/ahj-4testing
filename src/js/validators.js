export function luhnAlgorithmCheck(value) {
  let sum = 0;
  const numArray = value.toString().split('').reverse();
  const checksum = parseInt(numArray[0], 10);

  numArray.forEach((num, index) => {
    if (index === 0) return;

    const digit = parseInt(num, 10);

    if (index % 2 === 0) {
      sum += digit;
    } else {
      const doubled = digit * 2;
      sum += doubled > 9 ? doubled - 9 : doubled;
    }
  });

  return (10 - (sum % 10)) % 10 === checksum;
}

export function cardSystem(cardNumber) {
  const firstTwoDigits = parseInt(cardNumber.substring(0, 2), 10);
  const firstThreeDigits = parseInt(cardNumber.substring(0, 3), 10);
  const firstFourDigits = parseInt(cardNumber.substring(0, 4), 10);
  const firstSixDigits = parseInt(cardNumber.substring(0, 6), 10);

  if (cardNumber.startsWith('4')) {
    return 'visa';
  }
  if (firstTwoDigits >= 51 && firstTwoDigits <= 55) {
    return 'master';
  }
  if (firstSixDigits >= 222100 && firstSixDigits <= 272099) {
    return 'master';
  }
  if (firstTwoDigits === 34 || firstTwoDigits === 37) {
    return 'amex';
  }
  if (firstFourDigits === 6011) {
    return 'discover';
  }
  if (firstSixDigits >= 622126 && firstSixDigits <= 622925) {
    return 'discover';
  }
  if (firstTwoDigits >= 64 && firstTwoDigits <= 65) {
    return 'discover';
  }
  if (firstTwoDigits === 36 || firstTwoDigits === 38) {
    return 'diners_club';
  }
  if (firstThreeDigits >= 300 && firstThreeDigits <= 305) {
    return 'diners_club';
  }
  if (firstFourDigits >= 3528 && firstFourDigits <= 3589) {
    return 'jcb';
  }
  if (firstFourDigits >= 2200 && firstFourDigits <= 2204) {
    return 'mir';
  }
  return undefined;
}
