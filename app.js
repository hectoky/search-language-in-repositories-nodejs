const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a user to search in the Github respositories ', (user) => {
    var resCall = require("./resCall");
    resCall.call(resCall.options(user));
  rl.close();
});