import react, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

      if (response.data) {
        setIncomeData(response.data);
      }

    }catch (error) {
      console.error("Something went wrong. Please try again", error)
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if(!source.trim()){
      toast.error("Please provide income source");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Please provide a valid income amount");
      return;
    }

    if(!date){
      toast.error("Please select income date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    }catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      )
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error){
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      )
    }
  };

  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeData();

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />

            <IncomeList
              transactions={incomeData}
              onDelete={(id) => {
                setOpenDeleteAlert({show: true, data: id});
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>
        <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          tittle="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          tittle="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;