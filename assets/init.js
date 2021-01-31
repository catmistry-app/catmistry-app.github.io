window.mdc.autoInit(); // Init all MDC elements

// To whoever that reads this: I know that I can put the JS inline with HTML,
// but if I do that, I cannot defer the loading of the main MDC JS, which is big
// and can cause huge delays as defer loads the script after the DOM has finished loading.
// Hence, I added this script as a defer after the main MDC script, which makes it
// run only after the DOM has loaded, and after the main MDC script.

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxsHr0vz6BWG6ywSQid_0irIIAZu2tZ4s",
    authDomain: "catmistry-android.firebaseapp.com",
    databaseURL: "https://catmistry-android-default-rtdb.firebaseio.com",
    projectId: "catmistry-android",
    storageBucket: "catmistry-android.appspot.com",
    messagingSenderId: "517918508656",
    appId: "1:517918508656:web:c9edd254f1b5a2aa40d6b5",
    measurementId: "G-TEWEFLKHS7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.performance();
