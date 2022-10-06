import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
const url = 'https://demoqa.com/BookStore/v1/Books';

export function deleteAllBooks() {

  group("Delete all books", function () {
    let response = http.del('https://demoqa.com/BookStore/v1/Books?UserId=64aa594f-96f3-4ae6-9075-00e2de49aea8',null,
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic YXJqdW46QXJqdW5AMTIz'
        },
      });

    checkStatus({
      response: response,
      expectedStatus: 204,
      failOnError: true,
      printOnError: true
    });

  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}