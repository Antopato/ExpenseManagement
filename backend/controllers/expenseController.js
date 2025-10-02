const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) =>{
        const userId = req.user.id
    
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing or invalid" });
        }
        
        try {
            const { icon, category, amount, date } = req.body;
    
            if( !category || !amount || !date){
                return res.status(400).json({ message: "Please provide all required fields" });
            }
    
            const newExpense =  Expense.create({ 
                userId,
                icon, 
                category, 
                amount,
                date : new Date(date)
            });
    
            await newExpense.save()
            res.status(200).json(newExpense);
    
        } catch (error) {
            console.error("Error registering expense:", error);
            res.status(500).json({ message: "Server error:", error });
        }
};

exports.getAllExpense = async (req, res) =>{
    const userId = req.user.id
        
        try{
            const expense = (await Expense.find({ userId })).sort({ date: -1 });
            res.json(expense);
        }catch(error){
            res.status(500).json({ message: "Server error: " + error})
        }
}

exports.deleteExpense = async (req, res) =>{
    try {
            await Expense.findByIdAndDelete(req.params.id);
            res.json({ message: "Expense deleted succesfully"});
        }catch(error){
            res.status(500).json({ message: "Server error"})
        }
}

exports.downloadExcel = async (req, res) =>{
    const userId = req.user.id;
    
        try{
            const expense = (await Expense.find({ userId })).toSorted({ date: -1 });
    
            const data = expense.map((item) => ({
                Category: item.category,
                Amount: item.amount,
                Date: item.date,
            }))
    
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb,ws,"expense");
            xlsx.writeFile(wb, "expense_details.xlsx");
            res.download("expense_details.xlsx");
        }catch(error){
            res.status(500).json({ message: "Server error"});
        }
}