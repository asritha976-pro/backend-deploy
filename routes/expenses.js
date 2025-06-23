const expenseRouter = require('express').Router();
const expenseController = require('../controllers/expensesController')

expenseRouter.get('/',expenseController.getAllExpenses);

expenseRouter.get('/:id',expenseController.getExpenseById);

expenseRouter.post('/',expenseController.createExpense);

expenseRouter.patch('/:id',expenseController.updateExpense);

expenseRouter.delete('/:id',expenseController.deleteExpense);

module.exports = expenseRouter;