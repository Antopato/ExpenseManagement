const Income = require("../models/Income")

exports.addIncome = async (req, res) =>{
    const userId = req.user.id

    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing or invalid" });
    }
    
    try {
        const { icon, source, amount, date } = req.body;

        if( !source || !amount || !date){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newIncome = await Income.create({ 
            userId,
            icon, 
            source, 
            amount,
            date : new Date(date)
        });

        await newIncome.save()
        res.status(200).json(newIncome);

    } catch (error) {
        console.error("Error registering income:", error);
        res.status(500).json({ message: "Server error:", error });
    }
}

exports.getAllIncome = async (req, res) =>{
    const userId = req.user.id
    
    try{
        const income = (await Income.find({ userId })).sort({ date: -1 });
        res.json(income);
    }catch(error){
        res.status(500).json({ message: "Server error: " + error})
    }

}

exports.deleteIncome = async (req, res) =>{

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted succesfully"});
    }catch(error){
        res.status(500).json({ message: "Server error"})
    }
}

exports.downloadExcel = async (req, res) =>{}