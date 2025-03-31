/*
Purpose: Displays the main page of the application after the user logs in.
Features:
Likely contains an overview of user data (e.g., transactions, financial information, etc.).
Provides navigation options to different sections of the app (e.g., adding transactions, viewing analytics).
User is redirected to this page after login, assuming they are authenticated.
*/
import { DatePicker, message, Select, Table } from "antd"; 
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Analatics from "../components/Analatics";

const { RangePicker } = DatePicker;

function Home() {
   // State management for modal visibility, selected transaction for edit, loading indicator, etc.
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");

  // Wrapped getTransactions in useCallback to memoize the function
  const getTransactions = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("finance-tracker-user"));

      setLoading(true);
      // API call to fetch all transactions based on filters
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }), // Include selectedRange only for custom frequency
          type,
        }
      );
      setTransactionsData(response.data); // Update state with fetched data
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  }, [frequency, selectedRange, type]);

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      // API call to delete a specific transaction
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted successfully");
      getTransactions();// Refresh transaction data after deletion
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
// Automatically fetch transactions when component mounts or dependencies change
  useEffect(() => {
    getTransactions();
  }, [getTransactions]); // Added getTransactions as a dependency

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      
      render: (text) => <span>{moment(text).utc().format("YYYY-MM-DD")}</span>,

    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3"
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />} {/* Show loading spinner during API calls */}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
             {/* Show date range picker for custom frequency */}
            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expence">Expence</Select.Option>
            </Select>
          </div>
        </div>
        {/* Add new transaction and view type switch */}

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("analytics")}
                size={30}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
       {/* Render table or analytics view based on viewType */}

      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analatics transactions={transactionsData} />
        )}
      </div>
      {/* Modal for adding/editing transactions */}

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
