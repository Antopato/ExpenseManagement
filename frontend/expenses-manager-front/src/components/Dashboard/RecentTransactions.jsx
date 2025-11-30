import React from "react";
import {LuArrowRight} from "react-icons/lu";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>

                <button className="card-btn" onclick={onSeeMore}>
                    See More <LuArrowRight className="ml-1"/>
                </button>
            </div>
        </div>
    )
}

export default RecentTransactions;