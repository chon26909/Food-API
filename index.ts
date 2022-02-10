import express from 'express';
import { AdminRoute, VandorRoute } from './routes';

const app = express();

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

app.listen(5000, () => { 
    console.log('App listening to the port 5000')
}) 