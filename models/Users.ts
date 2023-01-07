import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:false,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    HashedPassword:{
        type:String,
        required:true,
        minlength:5
    },
    image:{
        type:String
    },
    Role:{
        type:String
    },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User