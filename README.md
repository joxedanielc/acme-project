# ACME Project

This project is a small responsive web application that allows a `.txt` file to be upload and it will generate a report table with the name of the employees and total earned.

The purpose of this project is to show the developer's skills to not use any dependecies or libraries to mormalize and/or render the data. Only using the functiones provided by the code lenguage.

## Features

- Upload file
- E2E Tests

# Table of contents

1. [Tech Stack](https://github.com/joxedanielc/acme-project#tech-stack)
2. Code Explanation
   1. [Functions](https://github.com/joxedanielc/acme-project#functions)
   2. [Utils](https://github.com/joxedanielc/acme-project#utils)
3. [Run Locally](https://github.com/joxedanielc/acme-project#run-locally)
4. [Feedback](https://github.com/joxedanielc/acme-project#feedback)
5. [License](https://github.com/joxedanielc/acme-project#license)

## Tech Stack

**Client:** React, Nextjs, Typescript, HTML5, CSS3, Playwright

## Code Explanation

### Functions

The file `functions.ts` contains the logic to normalize the data to an interface in order to use the response to render it.

### Utils

The file `utils.ts` contains the interfaces to create the expected objects with its properties, and the functions that handle the data set.

## Run Locally

### Important:

Clone the project

```bash
  git clone https://github.com/joxedanielc/acme-project.git
```

Go to the project directory

```bash
cd acme-project
```

Install dependencies (This step is necessary in order to install Playwright, and no any other depencies.)

```bash
npm install
```

Start the server

```bash
npm run dev
```

To run e2e test

```bash
npx playwright test
```

or if you'd like to see the test on the browser:

```bash
npx playwright test --debug
```

## Feedback

If you have any feedback, please leave a comment.

## License

[MIT](https://choosealicense.com/licenses/mit/)
