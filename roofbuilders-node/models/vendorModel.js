
import mongoose,{Schema} from 'mongoose';
 

var vendorSchema = new Schema({
    "tenant": {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
    },
    "name" : String,
    "website" : String,
    "logo" : String,
});
 
export default mongoose.model('vendor', vendorSchema);