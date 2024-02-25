const mongoose = require('mongoose')
const express = require('express') 

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sayangeeky:147852369@cluster0.bzhez4l.mongodb.net/users")

const User = mongoose.model("Users", {name: String, email: String, password: String})

app.post('/signup', async function(req,res){
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const userExists = await User.findOne({password:password})
    if(userExists)
       return res.status(400).json({ 
            msg: "user already exists"
        })
   
    const user = new User( {
        name: username,
        email: email,
        password: password
    })
   await user.save()  

   res.send("successfull")
})
app.listen(3000)