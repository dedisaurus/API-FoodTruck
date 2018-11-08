import mongoose from 'mongoose';
let Schema = mongoose.Schema;
import Review from './review';

let foodtruckSchema = new Schema({
    name: {
        type:String,
        required : true
    },
    foodtype: {
        type: String,
        required: true
    },
    avgcost: Number,
    geometry :{
        type : {type: String, default : 'Point'},
        coordinates : [Number]
    },
    reviews : [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('FoodTruck', foodtruckSchema);