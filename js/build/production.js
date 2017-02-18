// Initialize Firebase
var config = {
	apiKey: "AIzaSyCuR38wcC8qhOljIn6Tdt4fRBplwwEPkfk",
	authDomain: "ratings-app.firebaseapp.com",
	databaseURL: "https://ratings-app.firebaseio.com",
	storageBucket: "ratings-app.appspot.com",
	messagingSenderId: "1063671578599"
};
firebase.initializeApp(config);

var header = document.getElementById('header');
var dbRef = firebase.database().ref().child('header');

var formContainer = document.getElementById('formContainer');
var formContainerRef = firebase.database().ref().child('formContainer');

var signInButton = document.getElementById('signInButton');
var signOutButton = document.getElementById('signOutButton');
var provider = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener('click', function () {
    firebase.auth().signInWithPopup(provider).then(function (user) {
        if (user) {
            dbRef.on('value', function () {
                header.innerText = 'Hello ' + user.user.displayName + '!';
            }),
            formContainerRef.on('value', function () {
            	formContainer.innerHTML = '<a id="form" onclick="displayForm()">rate this company ></a>';
            });
        }
    });
});

signOutButton.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
        header.innerText = 'Sign in with google to see the magic!!';
    });
});

function displayForm() {
	document.getElementById("rateForm").classList.remove('inactive');
	document.getElementById("rateForm").classList.add('active');
}