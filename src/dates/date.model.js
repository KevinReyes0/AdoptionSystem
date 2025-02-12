import {Schema, model} from "mongoose";

const DateSchema = Schema ({
    hora: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

}, {
    timestamp: true,
    versionKey: false
});

export default model('Date', DateSchema);