
import mongoose,{Schema} from 'mongoose';
 

var measurementSchema = new Schema({
    area: Number,
    areas: Schema.Types.Mixed,
    eave: Number,
    hip: Number,
    latitude: Number,
    lines: Schema.Types.Mixed,
    longitude: Number,
    markers: Schema.Types.Mixed,
    onlydrawings:Boolean,
    pitch: Number,
    rake: Number,
    ridge: Number,
    toolJSON: Schema.Types.Mixed,
    valley: Number,
    waste: Number,
    measurements: Schema.Types.Mixed,
    calculated_values:  Schema.Types.Mixed,
    roof_data: Schema.Types.Mixed,
    roof_data_numeric: Schema.Types.Mixed,
    pitch_change: Number,
    step_flashing: Number,
    base_flashing: Number,
    number_of_areas: Number,
    area: Number,
    low_pitch: Number,
    two_stories: Number,
    pitch_3: Number,
    steep_89: Number,
    steep_10: Number,
    report_created: Date,
    pdf_file: String,
    pdf_version: String,
    pipeboot3: Number,
    pipeboot4: Number,
    ridgevent: Number,
    boxvent: Number,
    edited: Boolean,
    edited_materials: Boolean,
})


const materialList = {
    measureProductMap: {
        type: Schema.Types.ObjectId,
        ref: 'measureProductMap'
    },
    items: [
        {
            product:{
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            uom: String,
            calcQuantity: Number,
            quantity: Number,
            color: String,            
            wastePercent: Number,
            wasteMinQty: Number,
            subComponents: Schema.Types.Mixed
        }
    ]
}

var projectSchema = new Schema({
    "tenant": {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
    },
    job_name: String,
    client_name: String,

    priority: {type:String, required: true},
    salesperson: {type:String, required: true},
    sale_state: {type:String, required: true},
    type: {type:String, required: true},
    paidby: {type:String, required: true}
,
    address_line_1: String,
    address_line_2: String,
    city: String,
    state: String,
    zip: String,

    description: String,

    "measurement": measurementSchema,

    materialList:materialList

},{timestamps:true})

export default mongoose.model('project', projectSchema);