const { Worker } = require('worker_threads');
const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
let worker;

app.get('/prime/:number', (req, res) => {
  //print params
  console.log(req.params.number);
  //create new working thread
  worker = new Worker('./prime.js');
  //send number to process
  worker.postMessage({ number: parseInt(req.params.number) });
  //receive msg from process
  worker.on('message', (message) => res.status(200).json(message));
});

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
