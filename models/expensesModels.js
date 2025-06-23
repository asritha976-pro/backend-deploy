const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    // balance:{
    //     type: Number,
    //     required: true,
    // },
    title:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    paymentType:{
        type: String,
        default: "UPI",
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});

// Expense Model

const Expenses = mongoose.model('expenses',expenseSchema)


module.exports = Expenses;