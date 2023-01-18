
import mongoose,{Schema} from 'mongoose';
 

var tenantSchema = new Schema({
    "name" : String,
    "website" : String,
    "logo" : String,
});
 
export default mongoose.model('tenant', tenantSchema);