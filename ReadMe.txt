# User Details Viewer App
This is a React Native application built using Expo CLI that fetches and displays random user data from a public API.
The app provides a sleek design with smooth animations while navigating between user details.

## Features
- Fetches user data dynamically from the API when the app starts.
- Displays detailed user information, including name, email, and avatar.
- Provides smooth sliding animations when navigating between next and previous users.
- Ensures a pleasant user experience with engaging UI elements like glassmorphic backgrounds and loaders.

## Installation and Setup
To run the application locally, follow these steps:

1.Install Node.js and Expo CLI:
bash:
    -npm install -g expo-cli

2.Clone the Repository:
bash:
   -git clone https://github.com/venkat20051/User_Information_App

3.Install Dependencies:
bash:
   -npm install

4.Start the Development Server:
bash:
   -npx expo start

5.Run the App on Your Device:
   -Scan the QR code using the Expo Go app on your mobile device (available on Android and iOS).

## API Used
- The application fetches random user data from the following API:
https://random-data-api.com/api/users/random_user?size=80

## Key Code Highlights
- Data Fetching: Data is fetched inside "useEffect()" to load automatically on app startup.
- Smooth Animations: The app uses "Animated" from "react-native" to implement seamless transitions.
- Loader Implementation: An "ActivityIndicator" ensures a smooth experience while waiting for data.

## Additional Notes
- Ensure your system has Expo Go installed on your mobile device for testing.
- For improved performance, consider adding pagination or lazy loading if dealing with large datasets.


