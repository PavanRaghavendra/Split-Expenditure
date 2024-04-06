import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Groups() {
  const [groupNumbers, setMembers] = useState([]);
  const [groupName, setName] = useState('');
  const navigate=useNavigate();
  const addGroup = () => {
    setMembers([...groupNumbers, '']);
  };

  const handleInputChange = (e, i) => {
    const updatedMembers = [...groupNumbers];
    updatedMembers[i] = e.target.value;
    setMembers(updatedMembers);
  };

  const handleDelete = (i) => {
    const updatedMembers = [...groupNumbers];
    updatedMembers.splice(i, 1);
    setMembers(updatedMembers);
  };

  const createGroup = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/group/creategroup", {
        groupNumbers,
        groupName
      });
      //console.log(response.data);
      if(response!==null)
      {
        const GroupId=response.data.groupId;
          const response2=await axios.post("http://localhost:3001/api/user/addgroup",
          {
            GroupId,
            groupName
          },
          {
            headers:
            {
              authentication:localStorage.getItem("token")
            }
          })
          console.log(response2.data);
          if(response2.data.msg==="updated successfully")
          {
            console.log("user Updated successfully");
            //navigate("/dashboard");
          }
          else
          {
            console.log("unsuccessfull");
          }
      }
      else
      {
        alert("group was not created Try Again!...");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
function handlefunction(index)
{
  if(confirm('Are you sure...')==true)
  {
    handleDelete(index);
  }
}
  return (
    <div className="p-3 h-screen">
      <div className="flex flex-row gap-2 m-4">
      <label className="text-xl font-semibold md:text-3xl">Group Name</label>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setName(e.target.value)}
        className="border border-stone-400 w-2/4"
      />
      </div>
      <button onClick={addGroup} className="border-2 bg-orange-400 rounded-md p-2 hover:bg-orange-300 text-white md:p-4 md:text-2xl md:m-2">Add Person</button>
      {groupNumbers.map((member, index) => (
        <div key={index} className="flex justify-center items-center">
          <input
            type="text"
            value={member}
            onChange={(e) => handleInputChange(e, index)}
            className="border-2 w-1/2 m-2 h-10 border-black md:text-xl"
          />
          <button onClick={() => handlefunction(index)} className="border bg-orange-500 text-md w-6 h-7 rounded-full ml-2 text-white text-2xl md:w-10 md:h-10">
            X
          </button>
        </div>
      ))}
      <button onClick={createGroup} className="border-2 bg-orange-400 rounded-md p-2 hover:bg-orange-300 text-white md:p-4 md:text-2xl md:m-2">Create Group</button>
    </div>
  );
}
