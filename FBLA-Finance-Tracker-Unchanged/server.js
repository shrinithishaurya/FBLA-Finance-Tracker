/*
The server.js file is typically the entry point for a Node.js backend application. 
It sets up the server, connects to databases, and configures routes and middleware. 
Here is a general outline of what the server.js file might look like for an application handling user registration, login, transactions, and analytics:
*/

const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const path = require('path')
const userRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users/' , userRoute)
app.use('/api/transactions/' , transactionsRoute)

const port =process.env.PORT || 5000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}



app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))
