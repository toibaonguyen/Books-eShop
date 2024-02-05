import mongoose from 'mongoose'; // Erase if already required
import { CustomerType, Gender } from '../constants/Customer.constant';

const COLLECTION_NAME = "Users"
const DOCUMENT_NAME = "Customer"

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
        unique: true,
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
    type:
    {
        type: CustomerType,
        require: true,
        default: CustomerType.COMMON
    },
    gender:
    {
        type: Gender,
        require: true
    },
    birthday:
    {
        type: Date,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, customerSchema);