
import mongoose,{Schema} from 'mongoose';

var colorSchema = new Schema({
    "name" : String
})

var uomSchema = new Schema({
  "uom" : String,
  "price": String,
  "sku": String
})

var productSchema = new Schema({
    "tenant": {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
    },
    "vendor": {
        type: Schema.Types.ObjectId,
        ref: 'vendor'
    },

    "sku" : String,
    "description" : String,
    "category": String,
    "defaultColor" : String,
    "colors": [colorSchema],
    "uoms": [uomSchema]
},{timestamps:true})
 
export default mongoose.model('product',productSchema);
