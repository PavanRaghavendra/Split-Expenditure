//  import React from 'react's

import { useEffect, useState } from "react";
import axios from "axios";
import { Addexpense } from "./Addexpense";
import { Maintrans } from "./Maintrans";
import { Updatetrans } from "./Updatetrans";
export const Expenses = (props) => {
  const [Group, setGroup] = useState([]);
  const [money, setMoney] = useState();
  const [name, setName] = useState("");
  const [Life,setLife]=useState(null);
  const [LifeofExpense,setLifeExpense]=useState(null);
  const [Trans,setTrans]=useState(null);
  const [edit,setEdit]=useState(false);
  const [signalMoney,setSignal]=useState(null);
  const [Initial,setInitital]=useState(true);
  const Id=props.Id;
 useEffect(()=>
 {
   async function Happy(){
    const response = await axios.post(
      "http://localhost:3001/api/group/getgroup",
      {
        Id,
      }
    );
    if (response != null) {
      const arr = response.data.Group.groupNumbers;
      const Name = response.data.Group.groupName;
      setName(Name)
      setGroup(arr);
      setLife(1);
    }
}
Happy();
 },[Id]);
  useEffect(()=>{
  async function Transactions()
  {
    setMoney(Array(Group.length).fill(0));
    const response=await axios.get(`http://localhost:3001/api/transaction/getalltransaction?groupId=${Id}`);
    if(response!=null)
    {
      for(let i=0;i<response.data.data.length;i++)
      {
      const amount1=response.data.data[i].amount;
      const members=response.data.data[i].membersOfTransaction;
      Group.forEach((value, index) => {
        if (members.includes(value)) {
          setMoney(prevMoney => {
            const updatedMoney = [...prevMoney]; 
            const cash = amount1 / members.length;
            updatedMoney[index] += cash;
            return updatedMoney;
          });
      }
    })
      }
      setSignal(1);
  }
  }
  Transactions();
},[Life])
function HandleDelete(index)
{
  const updatedGroup=[...Group];
  updatedGroup.splice(index,1);
  setGroup(updatedGroup);
}
function ExpenseLife()
{
  setInitital(false);
  Add();
  setLifeExpense(1);
}
function EditLife()
{
  setInitital(!Initial);
  setLifeExpense(null);
  setEdit(true);
  EditExpense();
}
  function Setdetails()
  {
    if(Life!=null&&signalMoney!=null&&Initial)
    {
        return <>
        <div className="w-full flex justify-center items-center">
         <div className="border-2 border-black md:p-10">
            <p className="text-2xl  font-semibold md:text-4xl">Group Name</p>
          <h1 className="text-md font-semibold md:text-2xl text-teal-700 md:m-3">{name}</h1>
          <p className="text-2xl font-semibold md:text-4xl">Group Members</p>
          <div className="m-3">
            <table className="border-2 border-black mx-auto">
              <tr>
              <th className="md:text-2xl border-2 border-solid border-black border-collapse md:p-3">Name</th>
              <th className="md:text-2xl border-2 border-solid border-black border-collapse md:p-3">Amount(To be paid)</th>
              <th className="md:text-2xl border-2 border-solid border-black border-collapse md:p-3">Paid</th>
              </tr>
            {
            Group.map((value, index) => (
              <tr key={index}>
                <td className="font-semibold border-2 border-solid border-black border-collapse md:text-2xl md:p-2">{value}</td>
                <td className="font-semibold border-2 border-solid border-black border-collapse md:text-2xl md:p-2">${money[index].toFixed(2)}</td>
                <td className="font-semibold border-2 border-solid border-black border-collapse md:text-2xl md:p-2">
                  <button className="border-2 border-black p-2 hover:bg-slate-700" onClick={()=>
                  {
                    HandleDelete(index)
                  }}>Paid</button>
                </td>
                </tr>
            ))}
                </table>
          </div>
          <button className="border-2 text-xl font-semibold text-white bg-black md:p-3 hover:bg-slate-600" onClick={()=>
            {
              ExpenseLife();
            }}>Add expense</button>
            <button  className="border-2 w-fit text-xl font-semibold text-white bg-black md:p-3 hover:bg-slate-600" onClick={()=>
            {
              EditLife();
            }}>Edit Expense</button>
             <button onClick={()=>{
          TransLife()
        }
        } className="border-2 w-fit text-xl font-semibold text-white bg-black md:p-3 hover:bg-slate-600"> Transaction</button>
        </div>
        </div>
        </>
    }
  }
  function TransLife()
  {
    setInitital(!Initial)
    setTrans(1);
    Transaction();
  }
  function Add()
  {
    if(LifeofExpense!=null)
    {
    return<>
    <div className="w-full border-2 border-black">
      <div className="m-2">
    <button onClick={()=>
      {
        setLifeExpense(null)
        setInitital(true)
      }} className="border-2 border-black p-2 rounded-sm text-xl m-2">Close</button>
    <Addexpense Id={props.Id} members={Group}/>
    </div>
    </div>
    </>
    }
  }
  function Transaction()
  {
    if(Trans!=null)
    {
      //console.log('Into main')
    return<>
     <button onClick={()=>
      {
        setInitital(!Initial)
        setTrans(null)}} className="border-2 border-black p-2 rounded-sm text-xl m-2 hover:bg-slate-600">Close</button>
     <Maintrans Id={props.Id}/>
    </>
    }
  }
  function EditExpense()
  {
    if(edit==true)
    {
      return<>
       <button onClick={()=>{
        setEdit(false)
        setLifeExpense(null);
        setInitital(!Initial);
        }} className="border-2 border-black bg-black text-white p-2 text-xl rounded-md">close</button>
       <Updatetrans Id={props.Id} edit={edit}/>
      </>
    }
  }
  return (
    <>
      <div>
        {
            Setdetails()
        }
      </div>
      <div>
        {
            Add()
        }
      </div>
      <div>
        {
          Transaction()
        }
      </div>
      <div>
        {
          EditExpense()
        }
      </div>
    </>
  );
};

export default Expenses;
