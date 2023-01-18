
import mongoose,{Schema} from 'mongoose';

var productTemplateSchema = new Schema({
    "tenant": {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
    },
    "vendor": {
        type: Schema.Types.ObjectId,
        ref: 'vendor'
    },
    "vendorIdentifier": String,
    "name": String,
    "logo": String,
    "products": [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
},{timestamps:true})
 
export default mongoose.model('productTemplate',productTemplateSchema);
