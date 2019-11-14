/*jshint esversion: 6 */ 


const express = require('express'); //dependancy
const app = express();  //this represents my application

app.use(express.json()); // This is what using middleware looks like

const players = [           
    {id: 1, name: 'Messi', level: 'Legend'},
    {id: 2 , name: 'Ronaldo', level: 'Okay'},
    {id: 3 , name: 'James', level: 'Who is this guy?'},
    {id: 4 , name: 'An Earl', level: 'Majestic, a beauty to watch. Will bring you to tears'},
    {id: 5 , name: 'Lee', level: 'If you liked Earl, you\'ll love Lee. The greatest of his time'}
];


app.get('/', (req, res) => {
    res.send('3 Soccer players and an Earl...');
});

app.get('/api/players', (req, res) => { //(req, res) are referred to as the route handler function/s
    res.send(players);
});

// /api/players/1   ---This should return a single result
app.get('/api/players/:id', (req, res) => {  //in a real world scenario we would possibly query a DB at this point. This is called a route/controller
const player = players.find(c => c.id === parseInt(req.params.id));   //res.send = resource.send   . . c => c.id === parseInt... this checks for c as a boolean value. If c is true, blah blah blah
//find is a method available on every js Array.
if (!player) res.status(404).send(`The course with ID "${req.params.id}" was not found`);
res.send(player);

});

app.post('/api/players', (req, res) => {
    if(req.body.name.length < 3) {
        res.status(400).send('Name is required and should be greater than 3 characters');
        return;
    }
    
    const player = {
        level: req.body.level,
        id: players.length + 1,
        name: req.body.name
    };
    players.push(player);
    res.send(player);

});

//PORT : Environment variable
const port = process.env.PORT || 3000;    //process is the object, env is the property of the object. PORT is the name of your environment variable
app.listen(3000, () => console.log(`Listening on port ${port}...`)); //iso constantly restarting, installing nodemon will auto-detect changes and update web.

