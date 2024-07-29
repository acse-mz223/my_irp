
# Full-Stack Application

This is a full-stack application with a React frontend and a Node.js backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your computer. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installing

To install the necessary packages, follow these steps:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```

2. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   npm install
   ```

### Building the Frontend

Build the frontend application by running:

```bash
cd ../frontend
npm run build
```

This command creates a `build` directory inside the `frontend` folder, which contains the production build of your application.

### Running the Backend Server

To serve the frontend static files and start the backend server, use the following command:

```bash
cd ../backend
node backEndServer.js
```

### Accessing the Application

After starting the server, open your web browser and visit [http://localhost:253](http://localhost:253) to view the application.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
