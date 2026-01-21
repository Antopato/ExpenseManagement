import React from "react";
import {LuArrowRight} from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { FaMonument } from "react-icons/fa";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See More <LuArrowRight className="ml-1"/>
                </button>
            </div>

            <div className="mt-6">
            {transactions?.slice(0,5).map((item) => (
                <TransactionInfoCard
                    key={item.id}
                    title={item.title == "expense" ? item.category : item.source}
                    icon={item.icon}
                    date={FaMonument(item.date)}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                />
            ))}
        </div>
        </div>
    )
}

export default RecentTransactions;