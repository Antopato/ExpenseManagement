import react, { useEffect, useState } from "react";
import { prepareExpenseBarChartData, prepareExpenseLineChartData } from "../../utils/helper";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import CustomLineChart from "../../components/Charts/CustomLineChart";

const Last30DaysExpenses = ({data}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(data);
        setChartData(result);
        return () => {}
    }, [data]);

    return( 
        <div className="card col-sapn-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <CustomLineChart data={chartData}/>
        </div>
    )
}

export default Last30DaysExpenses;