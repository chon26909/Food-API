import express from 'express';

const app = express();

app.use('/', (req,res) => {
    return res.json('Hello World')
})

app.listen(8080, () => { 
    console.log('App listening to the port 8080')
}) 