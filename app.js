const express = require('express');
const hospRouter = require('./routes/hospRoute')



const app = express();

app.use(express.json())

app.use('/hosp',hospRouter)

app.get('/',(req,res)=>{
    res.send('From Hospital API')
})

app.listen(4000);