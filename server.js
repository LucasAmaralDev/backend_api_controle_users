const { UserModel } = require('./model/User-Model');
const { FacebookModel } = require('./model/Facebook-Model');


const express = require('express');
const cors = require('cors');

const { routes } = require('./routes');


//configuranado o express
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor conectador na porta ${PORT}`);
});