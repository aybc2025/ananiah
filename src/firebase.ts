// ============================================================
// Firebase Configuration
// Replace with your own Firebase project credentials.
// Get these from: Firebase Console → Project Settings → Your apps
// ============================================================

export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// ============================================================
// HOW TO SET UP:
//
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Add a Web App
// 4. Copy the config object and paste above
// 5. Enable Authentication → Sign-in method → Anonymous
// 6. Enable Firestore Database → Create database → Start in test mode
// 7. Enable Storage (for audio files in the future)
//
// The app works without Firebase — it falls back to IndexedDB only.
// ============================================================
