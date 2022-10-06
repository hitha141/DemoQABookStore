# DemoQABookStore
# k6 DemoQA book site Scripts

## Introduction

This repo contains scripts written using the programming language JS which can be run
using K6 tool which in turn can interact and test the load of a website hosted at https://demoqa.com/books.


The scripts have been modularized so that each distinct "user action" manifests as its own source file, intended to be used from the entry script, in this case `main.js`. Doing so promotes code reusability and maintainability, as well as catering for some degree of flexibility over the order in which the scripts should run. 

## Usage

The tests are written in such a way that it can be modified to generate load as required but this example is set with 1 VU per min.


1. Install [k6](https://k6.io) (instructions [here](https://k6.io/docs/getting-started/installation/))
2. Clone the repo
3. Navigate to the directory and `k6 run main.js` (make sure k6 is on your PATH)

## Contents

The scripts, and their suggested order, are as follows:

`main.js`

The entry script, where k6 `options` would be set, and the script called as part of `k6 run` . Its `export default function` determines the functions which the VUs will be executing.

`utils.js`

This script consists of a single exported function `checkStatus` that can be used to verify HTTP status codes. Once the received status code be different from the expected one , the script will fail

`navigateHomePage.js`
It is the first script which will get executed.Here it will verifies whether the user is been navigated to the login page.

`login.js`
User should login in order to add books into the cart.This page ensures that the user is able to login to the site.

`addToCart.js`
This script allows to add a book into the cart.

`deleteAllBooks.js`
Using this script , all the books added to the cart will be deleted.

##  End Points which needs to be tested for performance testing
1. Speed   - It determines how the software responds rapidly to the users.
2.  Scalability - It should be tested inorder to find out the load the software product can handle at a time.

In this case, where using the web application would involve the user to progress through
a pipeline of procedure, I believe that an end-to-end performance test is necessary
to gain sufficient insights from the test.
Here, I have selected the starting point as logging in to the application and ending point as deleting the books added to cart  to make sure that the test step through the common workflow by making sequential API requests for a realistic measure.

The E2E test is created to address the actual user/s with realistic think times and the most 
popular workflow in the browser and API .

## Implementation of CI/CD pipeline
There are three steps to configure Jenkins pipelines to fetch changes from your repository:

1. Create a repository that contains a Jenkinsfile, your k6 load test script and related files.
2. Create a new pipeline job on Jenkins to fetch changes from your repository.
3. Add a webhook to GitHub to push changes to your Jenkins pipeline and trigger the performance test pipeline.
In the root of DemoQABookStore project folder, create a file named 'Jenkinsfile'. This configuration file will trigger the CI to build whenever a push to the remote repository is detected.Execute the script in the Jenkinsfile.Create a pipeline in Jenkins.Create a token for the user in Jenkins.In Jenkins dashboard, head over to the pipeline you created and press 'Build Now' to see the pipeline fetch the latest changes from your repository and run the tests.
