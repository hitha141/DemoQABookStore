import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
const url = 'https://demoqa.com/BookStore/v1/Books';

export function addToCart() {
let res =http.get(url);
const isbns =res.html()
.find('isbn').toArray();
console.log(isbns);
  group("Add to Cart", function () {
    let data = { userId: '64aa594f-96f3-4ae6-9075-00e2de49aea8', collectionOfIsbns: [{ isbn: "9781449325862" },{isbn: "9781449337711"}] };
    let response = http.post(url, JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic YXJqdW46QXJqdW5AMTIz'
        },
      });

    checkStatus({
      response: response,
      expectedStatus: 201,
      failOnError: true,
      printOnError: true
    });

  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}