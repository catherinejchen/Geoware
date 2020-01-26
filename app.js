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
let d = new Date();
let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

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

    // firebase.database().ref('/1/name').set("hello");
    // title,catgory, description,images
    firebase.database().ref('/').on('value', snapshot => {
        console.log(snapshot.val());
    }, error => {
        console.log(error);
    })

    res.render('index');
});

app.get('/nearby', function (req, res) {

    // firebase.database().ref('/1/name').set("hello");
    // title,catgory, description,images
    firebase.database().ref('/').on('value', snapshot => {
        console.log(snapshot.val());
    }, error => {
        console.log(error);
    })

    res.render('nearby');
});

app.post('/', function (req, res) {
    firebase.database().ref('/' + makeid(16) + '/').set({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.body.image,
        date: monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
        time: (d.getHours() > 12 ?
            d.getHours() - 12 :
            d.getHours()).toString() + ":" + (d.getMinutes() < 10 ?
            "0" + d.getMinutes() :
            d.getMinutes()).toString() + (d.getHours() >= 12 ?
            " PM" :
            " AM"),
    });
    res.render('nearby');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});