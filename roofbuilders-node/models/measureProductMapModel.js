
import mongoose,{Schema} from 'mongoose';

var measureProductMapSchema = new Schema({
    "tenant": {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
    },
    "productTemplate": {
        type: Schema.Types.ObjectId,
        ref: 'productTemplate'
    },
    isDefault: Boolean,
    items: [
        {
            product:{
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            materialType: String,
            packageQty:Number,
            packageUom: String,
            pitchMin: Number,
            pitchMax: Number,
            uom: String,
            defaultColor: String,            
            wastePercent: Number,
            wasteMinQty: Number,
            notes: String

        }
    ]
},{timestamps:true})
 
export default mongoose.model('measureProductMap',measureProductMapSchema);
