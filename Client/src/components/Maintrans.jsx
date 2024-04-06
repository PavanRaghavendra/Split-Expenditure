import React, { useState, useEffect } from "react";
import axios from "axios";

export function Maintrans(props) {
  const [TransName, setTransName] = useState('');
  const [initiated, setInitiated] = useState('');
  const [amount, setAmount] = useState('');

    async function fetchData() {
      try {
        const Id1 = props.Id;
        const response = await axios.get(`http://localhost:3001/api/transaction/getalltransaction?groupId=${Id1}`);
        if (response.data.data[0]!=null) {
          setTransName(response.data.data[0].transactionName);
          setInitiated(response.data.data[0].initiatedBy);
          setAmount(response.data.data[0].amount);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();

  return (
    <div className="">
      <div className="md:text-2xl font-semibold flex justify-center items-center gap-2">
      <p>Transaction-Name :</p>
      <p>{TransName}</p>
      </div>
      <p>Created By</p>
      <p>{initiated}</p>
      <p>Amount</p>
      <p>{amount}</p>
    </div>
  );
}
