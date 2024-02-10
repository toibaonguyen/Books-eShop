import mongoose, { Schema } from 'mongoose'; // Erase if already required
import { UserType } from '../constants/User.constant';

const COLLECTION_NAME = "Keys";
const DOCUMENT_NAME = "AuthTokenStore";

const COLLECTION_NAME_USER_REF = "Users";

// Declare the Schema of the Mongo model
const authTokenStoreSchema = new mongoose.Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: COLLECTION_NAME_USER_REF,
        unique: true
    },
    publicKey:
    {
        type: String,
        require: true
    },
    privateKey:
    {
        type: String,
        require: true
    },
    usedRefreshTokens:
    {
        type: [String],
        require: true,
        default: []
    },
    refreshToken: {
        type: String,
        require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, authTokenStoreSchema);