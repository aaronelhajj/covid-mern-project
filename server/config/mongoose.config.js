const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`You are connected to the database called ${process.env.DB_NAME}`)
    })
    .catch((err) => {
        console.log(`You had a problem connecting to the ${process.env.DB_NAME}. Here is your error:`,err)
    })