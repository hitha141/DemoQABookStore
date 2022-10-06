import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

const url = 'https://demoqa.com/Account/v1/Login';

export function authentication() {
  group("User athentication", function () {
    let data = { userName: 'arjun' , password: 'Arjun@123'};

  let response = http.post(url, JSON.stringify(data), 
  {
    headers: { 'Content-Type': 'application/json' },
});

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });

  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}