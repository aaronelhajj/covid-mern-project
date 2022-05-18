const mongoose = require("mongoose");
const CovidSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [
            true,
            "Name of a country is required!"
        ],
    },
    familyMembers:{
        type: Number,
        min: [0, "Do you have any family members living in this country?"
        ],

    },
    description:{
        type: String,
        required: [
            true, "Small description of reason for keeping track of this country."],
        minlength: [3, "Description must be at least 3 characters long"]
    },
    plans:{
        type: String,
        required: [
            true, "It is of utmost importance you fill this bubble out!"
        ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Covid = mongoose.model("Covid", CovidSchema)
module.exports = Covid