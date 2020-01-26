let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let firebase = require('firebase');
let config = {
    apiKey: "AIzaSyCPxPvFIftu4GBrhMcG9aElHVyRQFwTr1g",
    authDomain: "deltahacks-vi.firebaseapp.com",
    databaseURL: "https://deltahacks-vi.firebaseio.com",
    projectId: "deltahacks-vi",
    storageBucket: "deltahacks-vi.appspot.com",
    messagingSenderId: "505235319471",
    appId: "1:505235319471:web:93b179da4b404a7869025a",
    measurementId: "G-1PVWRLRJJT"
};

firebase.initializeApp(config);

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    firebase.database().ref('/' + makeid(16) + '/').set({name: 'hello', description: 'good bye'});
    // firebase.database().ref('/1/name').set("hello");
    console.log(makeid(16));
    // title,catgory, description,images
        firebase.database().ref('/').on('value', snapshot => {
            console.log(snapshot.val());
        }, error => {
            console.log(error);
        })

    res.render('index');
});

app.post('/', function (req, res) {
    firebase.
    res.render('index');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});