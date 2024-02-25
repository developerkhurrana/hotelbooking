import mongoose from 'mongoose';

const schema = mongoose.Schema
const roomSchema = new schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    roomNumbers:[{number:Number, unavailableDates:{type:[Date]}}],
},
{timestamps:true}
);

export default mongoose.model('room', roomSchema);