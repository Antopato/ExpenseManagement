import react, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';

const Income = () => {
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

  const handleAddIncome = async (income) => {};

  const deleteIncome = async (id) => {};

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
          </div>
        </div>
        <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          tittle="Add Income"
        >
        <div>
          
        </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;