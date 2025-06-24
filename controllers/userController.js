const User = require('../models/userModel')

exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find();
        return res.status(200).send({users:users})
    }catch(error){
        console.error('Error fetching all users',error.message);
        return res.status(500).send({error:'Error fetching all users'});
    }
}

exports.modifyInitialBalance = async(req,res) => {
    try{
        const userId = req.user.id;
        const {balance} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {balance},
            {new : true}
        );

        return res.status(200).send({message:"Your modified Initial balance", balance: updatedUser.balance});
    }catch(error){
        return res.status(400).send({error: "Error initialising balance"});
    }
}

exports.getBalance = async(req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send({error:'User not found'})
        }
        return res.status(200).send({balance:user.balance});
    }catch(error){
        console.error('Error fetching balance',error.message);
        return res.status(500).send({error: 'Failed to fetch balance'})
    }
};

exports.updateBalance = async(req,res) => {
    try{
        const userId = req.user.id;
        const {balance} = req.body;

        if(!balance || balance <= 0){
            return res.status(400).send({error:'Invalid balance amount'});
        }

        const updatedUser = await User.findByIdAndUpdate(
         userId,
        { balance },
        { new: true }
        );
        if(!updatedUser){
            return res.status(404).send({error:'User not found'});
        }
        res.status(200).send({message:'Balance updated',balance:updatedUser.balance});
    }catch(err){
        console.error('Error updating balance:',err.message);
        res.status(500).send({error:'Error setting balance'});
    }
}