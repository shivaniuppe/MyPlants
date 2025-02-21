# 🌱 Plant Tracker App

A simple plant tracking application built with **React Native** and **Firebase** using **Expo**. This app allows users to add, view, and delete plants with additional information like location, type, notes, and date added.

## 📋 Features

- Add new plants with name, type, location, notes, and date added.
- View a list of all plants fetched from Firestore.
- Delete plants from the Firestore database.
- Navigate between Home and Plant List screens.

## 📦 Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- Expo CLI
- Firebase account and Firestore database

## 🚀 Installation

1. **Clone the repository:**

```bash
  git clone https://github.com/yourusername/MyPlants.git
  cd MyPlants
```

2. **Install dependencies:**

```bash
  npm install
```

3. **Set up Firebase:**

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Set up Firestore database.
- Download your `google-services.json` and `firebaseConfig.js`.
- Place the `firebaseConfig.js` file in the `/src` directory with the following content:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## ▶️ Run the App

1. Start the Expo development server:

```bash
npx expo start
```

2. Scan the QR code with the Expo Go app (iOS/Android) or open it on a simulator.

## 📁 Project Structure

```
.
├── src/
│   ├── firebaseConfig.js  # Firebase setup
│   ├── screens/
│   │   ├── HomeScreen.js  # Home page
│   │   └── PlantListScreen.js  # Plant list with delete functionality
├── App.js                 # Main entry point
└── package.json           # Project metadata
```

## 🛠️ Usage

- **Add a Plant:** Enter plant details and save.
- **View All Plants:** Navigate to the Plant List to see all plants.
- **Delete a Plant:** Use the "Delete" button to remove a plant from Firestore.

