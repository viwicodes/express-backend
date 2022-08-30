const mongoose = require("mongoose")

const OderSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        product: [
            {
                productID:{
                    type: String
                },
                quantity:{
                    type: Number,
                    default: 1
                }
            }
        ],
        amount:{
            type: Number,
            required: true
        },
        address: {
            type:Object,
            required: true
        },
        statu: {
            type: String,
            default: "pending"
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Oder", OderSchema)