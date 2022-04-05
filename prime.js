const { parentPort, isMainThread } = require('worker_threads');

if (!isMainThread) {
  console.log('hello');
  parentPort.on('message', (message) => {
    const jsonResponse = isPrime(message.number);
    parentPort.postMessage(jsonResponse);
    process.exit();
  });
}

function isPrime(number) {
  //process starting time
  let startTime = new Date();
  //process ending time
  let endTime = new Date();
  //is prime
  let isPrime = true;
  for (let i = 3; i < number; i++) {
    //it is not a prime break the loop,

    if (number % i === 0) {
      endTime = new Date();
      isPrime = false;
      break;
    }
  }

  if (isPrime) endTime = new Date();

  return {
    number: number,
    isPrime: isPrime,
    time: endTime.getTime() - startTime.getTime(),
  };
}
