import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    seq: {
        type: Number,
        required: true,
    },
});

const Counter = mongoose.model('counters', counterSchema);
export default Counter;
