import react from "react";

const COLORS = [{totalBalance, totalIncome, totalExpense}]

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense},
    ]
    
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="test-lg">Finance Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`€${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;