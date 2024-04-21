# Money Pig Expenses Tracker

<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- Introduction -->
<br />
<div align="center">
    <h3 align="center">Money Pig</h3>
    <p align="center">
        Splitwise became paid, so I built a free one for myself.
    </p>
</div>

<!-- Table of contents -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About The Project</a>
            <ul>
                <li><a href="#project-features">Project Features</a></li>
                <li><a href="#built-with">Built With</a></li>
                <li><a href="#key-libraries-used">Key Libraries Used</a></li>
            </ul>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#running-the-front-end">Running the Frontend</a></li>
            </ul>
        </li>
    </ol>
</details>

<!-- About The Project -->

## About The Project

<!-- ![App Overview][app-screenshot] -->

This expense tracker was built as an experimental project to learn to basics of Next.js, with allows users to create trips, log expenses, and view their shared expenses with others.

### Project Features

1. User authentication and registration with email and password using Firebase Authentication.
1. Real time data synchronization between users using Firebase Database
1. Trip creation and deletion
1. Expenses creation and deletion
1. Activity logging upon creation and deletion

### Built With

-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Firebase](https://firebase.google.com/)

### Key Libraries Used

1. Firebase
2. headlessui/react
3. Radix-ui

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->

## Getting Started

To get a local copy up and running, follow these simple example steps

### Prerequisites

-   Node.js
-   NPM

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/bryanleezh/money-pig.git
    ```

### Running the Application

1. Install NPM packages
    ```sh
    npm install
    ```
2. Duplicate a copy of `.env.local-example` in the same directory, and rename it to `.env`
3. Run the application
    ```sh
    npm run dev
    ```

<!-- Links -->
<!-- [app-screenshot]:  -->
