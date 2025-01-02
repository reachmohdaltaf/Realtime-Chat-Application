# Real-Time Chat Application

This is a real-time chat application built using React, Node.js, Express.js, Socket.io, Zustand, and Tailwind CSS. The app provides a seamless chatting experience, allowing users to send and receive messages in real-time, with features like message input, image attachment, user status (online/offline), and more.

## Features

- **Real-Time Messaging**: Powered by Socket.io, messages are delivered instantly without the need for page refreshes.
- **Image Attachment**: Users can send and preview images directly within the chat.
- **User Status**: Displays the online/offline status of users based on their presence.
- **Message Input**: Users can type and send text messages with a clean and responsive UI.
- **State Management**: Utilizes Zustand for global state management, ensuring smooth data flow across the app.
- **Responsive Design**: The app is fully responsive, built using Tailwind CSS, and optimized for both mobile and desktop devices.

## Tech Stack

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zustand**: A simple state management library for React.
- **Socket.io**: Real-time bidirectional event-based communication.

### Backend:
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated web framework for Node.js.

## Installation

### 1. Clone the Repository
git clone https://github.com/reachmohdaltaf/Realtime-Chat-Application.git

### 2. Navigate to the Project Directory
cd Realtime-Chat-Application

### 3. Install Dependencies

### For the Frontend
cd frontend
npm install

### For the Backend
cd ../backend
npm install

### 4. Configure Environment Variables
### Create a .env file in the backend directory and add your environment variables
### Example .env file:
### PORT=5000
### DB_CONNECTION_STRING=your_database_connection_string

### 5. Start the Application

### For the Frontend
cd ../frontend
npm start

### For the Backend
cd ../backend
npm start

### 6. Open Your Browser
### Open your web browser and navigate to http://localhost:5173 to see the chat application in action.
