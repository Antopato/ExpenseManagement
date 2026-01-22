import react, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Expense = () => {
  
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseData = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

        if (response.data) {
          setExpenseData(response.data);
        }

      }catch (error) {
        console.error("Something went wrong. Please try again", error)

      } finally {
        setLoading(false);

      }
    }

    const handleAddExpense = async (expense) => {
      const { category, amount, date, icon } = expense;

      if(!category.trim()){
       toast.error("Please provide expense source");
        return;
      }

      if(!amount || isNaN(amount) || Number(amount) <= 0){
        toast.error("Please provide a valid expense amount");
        return;
      }

      if(!date){
        toast.error("Please select expense date");
        return;
      }

      try {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category,
          amount,
          date,
          icon,
        });

        setOpenAddExpenseModal(false);
        toast.success("Income added successfully");
        fetchExpenseData();
      }catch (error) {
        console.error(
          "Error adding income:",
          error.response?.data?.message || error.message
        );
      }
    };

    const deleteExpense = async (expenseId) => {
      try {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

        setOpenDeleteAlert({show: false, data: null});
        toast.success("Income deleted successfully");
        fetch();
      } catch (error){
        console.error(
          "Error deleting income:",
          error.response?.data?.message || error.message
        )
      }
    }

    const handleDownloadExpenseDetails = async () => {}

    useEffect(() => {
      fetchExpenseData();

      return () => {};
    }, []);

    return(
        <DashboardLayout activeMenu="Expense">
          <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <ExpenseOverview
                  transactions={expenseData}
                  onExpenseIncome={() => setOpenAddExpenseModal(true)}
                />
              </div>

              <ExpenseList
                transactions={expenseData}
                onDelete={(id) => {
                  setOpenDeleteAlert({ show: true, data: id})
                }}
                onDownload={handleDownloadExpenseDetails}
              />
            </div>

            <Modal
              isOpen={openAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
              tittle="Add Expense"
            >
              <AddExpenseForm onAddExpense={handleAddExpense}/>
            </Modal>

            <Modal
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({show: false, data: null})}
              tittle="Delete Expense"
            >
              <DeleteAlert
                content="Are you sure you want to delete this expense?"
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </DashboardLayout>
    );
  
}

export default Expense;