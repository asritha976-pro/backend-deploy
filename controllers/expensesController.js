const Expenses = require('../models/expensesModels');
const User = require('../models/userModel')
exports.getAllExpenses = async(req,res) => {
    const userId = req.user.id;
    try{
        const expenses = await Expenses.find({user:userId}).sort({date : -1});
        return res.status(200).send({expenses:expenses})
    }catch(error){
        console.error(`Error retrieving expenses:`,error.message)
        return res.status(500).send({error:`An error occured while fetching expense. Please try again later`})
    }
}

exports.getExpenseById = async(req,res) => {
    const id = req.params.id;
    try{
        const expense = await Expenses.findById(id);
        if(!expense){
            return res.status(404).send({error:'No Expense found'})
        }
        return res.status(200).send({expense:expense})
    }catch(error){
         console.error('Error fetching expenses:',error.message)
        return res.status(500).send({error:'Error fetching expense'})

    }
}

exports.createExpense = async(req,res) => {
     const {title,amount,category,date} = req.body;
     const userId = req.user.id;
     console.log("Creating expense for user:", userId);
     const user = await User.findById(userId);
     if(!user){
        return res.status(404).send({error:'User not found!'});
     }
     if(user.balance < amount){
        return res.status(400).send({error:"Not sufficient balance"});
     }

     user.balance -= amount;
     await user.save();
    try{
        const newExpense = new Expenses({title, amount, category, date,user:userId})
        const savedExpense = await newExpense.save()
        return res.status(201).send({newExpense:savedExpense, message : "Expense added and balance updated",expense : savedExpense, remainingBalance: user.balance})
    }catch(error){
        console.log('Error creating expense:',error.message)
        return res.status(400).send({error:'Error creating expense'})
    }
}

exports.updateExpense = async(req,res) => {
    const id = req.params.id
    try{
        const updatedExpenses = await Expenses.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedExpenses){
            return res.status(404).send({error:'Expense not found. Update failed'})
        }
        return res.status(200).send({updatedExpenses:updatedExpenses})
    }catch(error){
        console.error('Error updating expense',error.message)
        return res.status(400).send({error:'Unable to update your expense. please check your inpit '})

    }
}

exports.deleteExpense = async(req,res) => {
     const id = req.params.id
    try{
        const deleteExpense = await Expenses.findByIdAndDelete(id)
        if(!deleteExpense){
            return res.status(404).send({error:'Expense not found. Delete failed'})
        }
        return res.status(200).send({deleteExpense:deleteExpense})
    }catch(error){
        console.error('Error deleting Expense',error.message);
        return res.status(500).send({error:"Error deleting Expense"})
    }
}