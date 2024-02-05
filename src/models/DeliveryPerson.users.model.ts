import mongoose from 'mongoose'; // Erase if already required

const COLLECTION_NAME = "Users"
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
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    salary:
    {
        type: Number,
        require: true
    },
    addresses:
    {
        type: Array,
        require: true,
        default: []
    },
    currentLocation:
    {
        type: String
    },
    isActive: {
        type: Boolean,
        require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, deliveryPersonSchema);