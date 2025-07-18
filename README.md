# COSC4353 - 11931 - Group 7

### Tech Stack

- [Node.js](https://nodejs.org/en)

### How to run

In project directory, execute the following commands.

1. **Install dependencies:**

    ```sh
    npm install
    ```

2. **Copy environment config:**

    ```sh
    cp .env.example .env
    ```

3. **Run the development server:**

    ```sh
    npm run dev
    ```

4. **Access the app:**

    ```sh
    http://localhost:[process.env.PORT]
    ```

### How to test

In project directory, execute the following command.

```sh
npm test
```
This will create a `coverage` folder in project's root directory. HTML report is located at `coverage/lcov-report/index.html`.