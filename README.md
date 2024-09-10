# Palestinian Medical Directory

A React application for managing a medical directory, allowing users to search for doctors based on city, specialty, and other criteria. The data is stored in Firebase, serving as a backend alternative. The project also utilizes PrimeReact components for UI elements and includes a well-organized file structure for scalability and maintainability.

## Screenshots

![App Screenshot 1](![image](https://github.com/user-attachments/assets/8db0f6ea-00e7-4656-884a-b7f3fa3171e6))
![App Screenshot 2](![image](https://github.com/user-attachments/assets/ebf67490-7a5c-402a-a0b3-240d4509a424))
![App Screenshot 3](![image](https://github.com/user-attachments/assets/289d59f4-f227-477a-bf4e-f8914e1771f8))
![App Screenshot 4](![image](https://github.com/user-attachments/assets/a2918e51-5bb8-4eb6-9aef-c0e032d513c4))

## Features

- Search by city, specialty, and keyword
- View doctor details such as address, phone number, and rating
- Use of PrimeReact for enhanced UI components
- Data management with Firebase

## Tech Stack

- **Frontend**: React, PrimeReact
- **Database**: Firebase (for storing and retrieving data)
- **Styling**: CSS

## File Structure

```bash
├── public
├── src
│   ├── assets       # Images, fonts, icons, and other static assets
│   ├── components   # Reusable React components (e.g., Search, Table, Filters)
│   ├── service      # Services to interact with Firebase
│   ├── store        # State management (if using a state management library)
│   ├── App.css      # Main CSS file for styling the App component
│   ├── App.jsx      # Main application component
│   ├── index.css    # Global CSS file
│   ├── main.jsx     # Entry point for the React app
└── README.md

