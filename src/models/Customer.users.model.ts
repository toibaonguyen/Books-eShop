import mongoose from 'mongoose'; // Erase if already required
import { Gender } from '../constants/User.constant';
import { UserType } from '../constants/User.constant';

const COLLECTION_NAME = "Users";
const DOCUMENT_NAME = "Customer";

// Declare the Schema of the Mongo model
const customerSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        index: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    addresses:
    {
        type: [String],
        require: true,
        default: []
    },
    gender:
    {
        type: String,
        require: true,
        enum: Object.values(Gender),
    },
    birthday:
    {
        type: Date,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.CUSTOMER
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, customerSchema);