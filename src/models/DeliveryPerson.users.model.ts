import mongoose from 'mongoose'; // Erase if already required
import { Gender } from '../constants/User.constant';

const COLLECTION_NAME = "DeliveryPerson"
const DOCUMENT_NAME = "DeliveryPerson"

// Declare the Schema of the Mongo model
const deliveryPersonSchema = new mongoose.Schema({
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
    gender:
    {
        type: String,
        require: true,
        enum: Object.values(Gender),
    },
    salary:
    {
        type: Number,
        require: true
    },
    addresses:
    {
        type: [String],
        require: true,
        default: []
    },
    currentLocation:
    {
        type: String,
    },
    isActive: {
        type: Boolean,
        require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, deliveryPersonSchema);