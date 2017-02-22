
// Set the configuration for your app
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuR38wcC8qhOljIn6Tdt4fRBplwwEPkfk",
    authDomain: "ratings-app.firebaseapp.com",
    databaseURL: "https://ratings-app.firebaseio.com",
    storageBucket: "ratings-app.appspot.com",
    messagingSenderId: "1063671578599"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

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

var submitButton = document.getElementById('submitButton');   

function getData() {
  var form = document.getElementById("rateForm");
  var formData = new FormData(form);
  var pairsArray = [];
  for (var pair of formData.entries()) {
    pairsArray.push([pair[0], pair[1]]);
  }
  console.log(pairsArray);
  console.log(pairsArray[0]);
}

 submitButton.addEventListener('click', function(){
  event.preventDefault();
  getData();
 });

//form.addEventListener("submit", function(event) {
//  event.preventDefault();
//  getData();
//});


// Write data to the Database
// userid, timestamp, compid, question1, question2
//function writeFormData(question1, question2, question3) {
  //firebase.database().ref('data/' + rateId).set({
//    question1: answer1,
//    question2: answer2,
//    question3: answer3
//  });
//}

// get elements with id rateForm, remove class inactive and replace it with active
function displayForm() {
    document.getElementById("rateForm").classList.remove('inactive');
    document.getElementById("rateForm").classList.add('active');
}