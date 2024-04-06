import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Updatetrans(props) {
  const [TransName, setTransName] = useState("");
  const [initiated, setInitiated] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionId, setId] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const Id1 = props.Id;
        const response = await axios.get(
          `http://localhost:3001/api/transaction/getalltransaction?groupId=${Id1}`
        );
        if (response.data.data[0] != null) {
          setId(response.data.data[0].transactionId);
          setTransName(response.data.data[0].transactionName);
          setInitiated(response.data.data[0].initiatedBy);
          setAmount(response.data.data[0].amount);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  async function update() {
    const response = await axios.post(
      "http://localhost:3001/api/transaction/updateTransaction",
      {
        transactionId,
        amount,
      }
    );
  }
  return (
    <>
    <div>
      <div className="p-5">
        <div className="flex justify-center items-center gap-2">
        <p className="text-2xl">Transaction-Name:</p>
        <p className="text-2xl">{TransName}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
        <p className="text-2xl">Created By</p>
        <p className="text-2xl">{initiated}</p>
        </div>
        <div className="flex justify-center items-center">
        <p className="text-2xl">Amount</p>
        <input
          type="Number"
          onChange={(e) => {
            setTimeout(() => {
              setAmount(e.target.value);
            }, 200);
          }} className="text-xl"
        ></input>
        </div>
        <button onClick={() => update()} className="border-2 border-black md:text-2xl bg-black text-white p-2 m-2">Update</button>
      </div>
      </div>
    </>
  );
}
