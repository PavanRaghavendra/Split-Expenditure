import axios from "axios";
import { useState } from "react"

export function Addexpense(props)
{
    const [transName,setTrans]=useState('');
    const [InitiatedBy,setInitiated]=useState('');
    const [money,setMoney]=useState();
    const [Upi,setUpi]=useState('');
    const [membersOfTransaction,setMembersof]=useState([]);
    const Members=props.members;
    async function Trans()
    {
        console.log(membersOfTransaction);
       const response= await axios.post("http://localhost:3001/api/transaction/createTrans",
        {
            transactionName:transName,
            initiatedBy:InitiatedBy,
            amount:money,
            upiId:Upi,
            groupId:props.Id,
            membersOfTransaction:membersOfTransaction
        })
    }
    const handleCheckboxChange = (event) => {
        const memberName = event.target.value; // Convert string to integer
        const isChecked = event.target.checked;
        if (isChecked) {
          // Add member to selectedMembers if checked
          setMembersof([...membersOfTransaction, memberName]);
        } else {
          // Remove member from selectedMembers if unchecked
          setMembersof(membersOfTransaction.filter( member=> member !== memberName));
        }
      };
    return(
        <>
        <div className="">
        <div className="w-fit mx-auto border-2 border-black md:p-10">
            <p className="md:text-2xl md:m-2">InitiatedBy</p>
            <input type="text" onChange={(e)=>
            {
                setTimeout(()=>
                {
                    setInitiated(e.target.value);
                },500)
            }} className="border-2 border-black text-xl"></input>
            <p className="md:text-2xl md:m-2">Transaction About</p>
            <input type="text" onChange={(e)=>
            {
                setTimeout(()=>
                {
                    setTrans(e.target.value);
                },500)
            }}className="border-2 border-black text-xl"></input>
            <p className="md:text-2xl md:m-2">Amount</p>
            <input type="Number" onChange={(e)=>
            {
                setTimeout(()=>
                {
                    setMoney(e.target.value);
                },500)
            }}className="border-2 border-black text-xl"></input>
            <p className="md:text-2xl md:m-2">UPI Id</p>
            <input type="text" onChange={(e)=>
            {
                setTimeout(()=>
                {
                    setUpi(e.target.value);
                },500)
            }}className="border-2 border-black text-xl"></input><br></br>
             <h2 className="md:text-2xl md:m-2">Member List</h2>
      {Members.map((member,index) => (
        <div key={index}>
            <div className="flex justify-center items-center">
          <label className="m-2 text-2xl">
            <input
              type="checkbox"
              value={member}
              checked={membersOfTransaction.includes(member)}
              onChange={handleCheckboxChange}
              className="w-5 h-5 mr-2"
            />
            {member}
          </label>
          </div>
        </div>
      ))}
            <button onClick={()=>{
                Trans()
                }} className="border-2 border-black text-2xl p-1 hover:bg-slate-500">Initiate</button>
        </div>
        </div>
        </>
    )
}