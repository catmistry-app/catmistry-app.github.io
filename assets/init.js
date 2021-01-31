window.mdc.autoInit(); // Init all MDC elements

// To whoever that reads this: I know that I can put the JS inline with HTML,
// but if I do that, I cannot defer the loading of the main MDC JS, which is big
// and can cause huge delays as defer loads the script after the DOM has finished loading.
// Hence, I added this script as a defer after the main MDC script, which makes it
// run only after the DOM has loaded, and after the main MDC script.

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDueuTP0lSoh2Sfg1UcmGVgZmxC_2m__qo",
    authDomain: "cryptoalgo-inc.firebaseapp.com",
    databaseURL: "https://cryptoalgo-inc.firebaseio.com",
    projectId: "cryptoalgo-inc",
    storageBucket: "cryptoalgo-inc.appspot.com",
    messagingSenderId: "293181580852",
    appId: "1:293181580852:web:54b88d52fe57db5b908c61",
    measurementId: "G-SSXQNRQ7V8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.performance();