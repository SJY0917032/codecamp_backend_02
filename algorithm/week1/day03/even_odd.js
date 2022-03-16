function evenOdd(num) {
  if (num === 0) {
    console.log("Zero");
    return;
  }

  if (num % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}

evenOdd(12); // "Even"
evenOdd(15); // "Odd"
evenOdd(0); // "Zero"
