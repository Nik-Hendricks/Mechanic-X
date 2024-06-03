import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import nedb from 'nedb';

var users_db = new nedb({ filename: 'users.db', autoload: true });
var vehicles_db = new nedb({ filename: 'vehicles.db', autoload: true });
var messages_db = new nedb({ filename: 'messages.db', autoload: true });


const dirname = new URL(import.meta.url).pathname.split(':').pop().split('index.js').shift();
console.log(dirname)
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(dirname + '/public/index.html');
});

app.get('/js/:file', (req, res) => {
    res.sendFile(dirname + '/public/js/' + req.params.file);
})

app.get('/js/views/:file', (req, res) => {
    res.sendFile(dirname + '/public/js/views/' + req.params.file);
})

app.get('/js/components/:file', (req, res) => {
    res.sendFile(dirname + '/public/js/components/' + req.params.file);
})

app.get('/car_brand_css', (req, res) => {
    res.sendFile(dirname + '/public/car_brand_css/style.css');
})

app.get('/fonts/:file', (req, res) => {
    res.sendFile(dirname + '/public/car_brand_css/fonts/' + req.params.file);
})

app.post('/api/login', (req, res) => {
    users_db.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (user) {
            res.json({ success: true, user: user });
        } else {
            res.json({ success: false, message: "Invalid username or password" });
        }
    })
})

app.post('/api/register', (req, res) => {
    users_db.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            res.json({ success: false, message: "Username already exists" });
        } else {
            users_db.insert(req.body, (err, user) => {
                res.json({ success: true, user: user });
            })
        }
    })
})

app.post('/api/add_vehicle', (req, res) => {
    console.log(req.body)
    vehicles_db.insert(req.body, (err, vehicle) => {
        users_db.update({ _id: req.body.owner }, { $push: { vehicles: vehicle._id } }, {}, (err, numReplaced) => {
            if(!err){
                res.json({ success: true, vehicle: vehicle });
            }
        })
    })

})

app.get('/api/get_vehicles', (req, res) => {
    var user_id = req.cookies.user;
    users_db.findOne({ _id: user_id }, (err, user) => {
        var vehicles = [];
        user.vehicles.forEach((vehicle_id) => {
            vehicles_db.findOne({ _id: vehicle_id }, (err, vehicle) => {
                vehicles.push(vehicle);
                if(vehicles.length == user.vehicles.length){
                    res.json({ vehicles: vehicles });
                }
            })
        })
    })
})
    
app.post('/api/generate', async (req, res) => {
    console.log(req.body)
    var props = req.body;
    var url = props.url || `http://localhost:8080/api/generate`;
    var temperature = props.temperature || 0;
    var format_json = props.format_json || false;
    var model = props.model || 'llama3:latest';
    var messages = props.messages || [];
    var last_message = messages[messages.length - 1];
    delete last_message.id;
    delete last_message.message_el;
    var context_id = props.context_id;

    console.log('------last message------')
    console.log(last_message)
    console.log('------last message------')
    var prompt = last_message.message;

    var data = {
        model: model,
        temperature: temperature,
        prompt: prompt,
        stream: false
    }        
    if(format_json == true){
        data.format = 'json';
    }
    
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    var _r = await response.json() 
    console.log(_r)

    messages_db.insert({ message: last_message, context_id: context_id}, (err, message) => {
        messages_db.insert({ message: {role:"bot", message:_r.response,  time: new Date().toLocaleTimeString()}, context_id: context_id}, (err, message) => {
            res.json({ response: _r.response})
        })
    })


    //store last message and response
    


}) 



app.listen(81, () => {
    console.log('Server is running on http://localhost:81');
});