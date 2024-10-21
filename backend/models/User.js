import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {   
        email:{
            type: String,
        },
        username:{
            type: String,
        }
        ,
        password:{
            type: String,
        },
        image:{  
            type: String,
        },
}
)
const User = mongoose.model("User1",UserSchema);
export default User;
