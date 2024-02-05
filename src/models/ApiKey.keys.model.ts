import mongoose from 'mongoose'; // Erase if already required
import { ApiKeyPermissions } from '../constants/ApiKey.constant';

const COLLECTION_NAME = "Keys";
const DOCUMENT_NAME = "ApiKey";

// Declare the Schema of the Mongo model
const apiKeySchema = new mongoose.Schema({
    key:
    {
        type: String,
        required: true,
        unique: true
    },
    isActive:
    {
        type: Boolean,
        require: true,
        default: false
    },
    permissions:
    {
        type: [ApiKeyPermissions],
        require: true,
        default: []
    }

}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, apiKeySchema);