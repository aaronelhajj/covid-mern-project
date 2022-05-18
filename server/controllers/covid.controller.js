const Entry = require("../models/covid.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
    findAllEntries: (req,res) => {
        Entry.find()
            .populate("createdBy","username email")
            .then((allEntries)=>{
                console.log(allEntries)
                res.json(allEntries)
            })
            .catch((err)=>{
                console.log("FindAllEntries has failed!")
                res.json(err)
            })
    },
    createEntry: (req,res) => {
        const newEntryObject = new Entry(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete:true
        })
        newEntryObject.createdBy = decodedJWT.payload.id;
        newEntryObject.save()
            .then((newEntry) =>{
                console.log(newEntry)
                res.json(newEntry)
            })
            .catch((err) =>{
                console.log("CreateEntry has failed!")
                res.json(err)
            })
    
    },
    findOneEntry: (req,res) =>{
        console.log('hello')
        Entry.findOne({_id: req.params.id})
            .then((oneEntry) =>{
                console.log(oneEntry)
                res.json(oneEntry)
            })
            .catch((err)=> {
                console.log("findOneEntry has failed!")
                res.json(err)
            })
    },
    updateEntry: (req,res) =>{
        Entry.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then((updateEntry) =>{ 
                console.log(updateEntry)
                res.json(updateEntry)
            })
            .catch((err) =>{
                console.log(err)
                res.json(err)
            })
    },
    deleteEntry: (req,res) =>{
        Entry.findOneAndDelete({_id: req.params.id})
            .then((deletedEntry) =>{
                console.log('hello')
                res.json(deletedEntry)
            })
            .catch((err) =>{
                console.log("deleteEntry has failed!")
                res.json(err)
            })
    },
    findAllEntriesByUser: (req, res)=>{
        console.log('helloooo')
        if(req.jwtpayload.username !== req.params.username){
            console.log("Not the user!");

            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Entry.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allEntriesFromUser)=>{
                            console.log(allEntriesFromUser);
                            res.json(allEntriesFromUser);
                        })

                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else{
            console.log("current user")
            Entry.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allEntriesFromLoggedInUser) =>{
                    console.log(allEntriesFromLoggedInUser);
                    res.json(allEntriesFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
                
        }
    }

}