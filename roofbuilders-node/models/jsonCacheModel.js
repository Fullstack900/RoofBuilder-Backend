
import mongoose,{Schema} from 'mongoose';

var jsonCacheSchema = new Schema({
    name: String,
    data: Schema.Types.Mixed
},{timestamps:true})
 
export default mongoose.model('jsonCache',jsonCacheSchema);