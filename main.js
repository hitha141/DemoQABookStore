import { navigateHomepage } from "./navigateHomepage.js";
import { authentication } from "./authentication.js";
import { addToCart } from "./addToCart.js";
import { deleteAllBooks } from "./deleteAllBooks.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
export const options = 
{
  // 1 virtual users per minute,we can increase the load by increasing the number of VUs/m
  vus : 1,
 duration: '1m',
//Below code allows to use the script to run 10 requests/m up to 100/m.               
// stages: [
//   { duration: '5s', target: 10 },
//   { duration: '15s', target: 50 },
//   { duration: '15s', target: 100 },
//   { duration: '10s', target: 100 },
//   { duration: '15s', target: 0},
// ],
thresholds: {
  http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  http_req_duration: ['p(95)<400'], // 95% of requests should be below 400ms
},
};
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
// used to store global variables
globalThis.vars = [];

// global min/max sleep durations (in seconds):
globalThis.pauseMin = 5;
globalThis.pauseMax = 15;

export default function main() {
  navigateHomepage();
  authentication();
  addToCart();
  deleteAllBooks();
}