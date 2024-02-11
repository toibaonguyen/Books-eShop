import mongoose, { Schema } from 'mongoose'; // Erase if already required
import { ProductType } from '../constants/Product.constant';

const COLLECTION_NAME = "Products";
const DOCUMENT_NAME = "Product";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    product_name: { type: String, require: true },
    product_thumb: { type: String, require: true },
    product_description: { type: String, require: true },
    product_price: { type: String, require: true },
    product_quantity: { type: String, require: true },
    product_type: {
        type: String,
        require: true,
        enum: Object.values(ProductType)
    },
    product_brand: {
        type: String,
        require: true
    },
    product_attributes: {
        type: Schema.Types.Mixed, require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
export default mongoose.model(DOCUMENT_NAME, productSchema)