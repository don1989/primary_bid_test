import { Schema, model  } from 'mongoose';

const counterSchema = new Schema({
    seq: {
        type: Number,
        required: true,
    },
});

const Counter = model('counters', counterSchema);
export default Counter;
