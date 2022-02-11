import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AdminRoute, VandorRoute } from './routes';
import { MONGO_URI } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

mongoose.connect(MONGO_URI)

.then(() => console.log('connected database'))
.catch((err) => console.log(err))

app.listen(4000, () => { 
    console.clear()
    console.log('App listening to the port 5000')
}) 