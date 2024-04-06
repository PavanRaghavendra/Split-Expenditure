import axios from "axios";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Expenses } from "./Expenses";
import Companylogo from './images/Designer.png'
import { Groups } from "./Groups";
export function Dashboard() {
  const [GroupNames, setNames] = useState([]);
  const [userName,setUsername]=useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Creategroup,setGroup]=useState(false);
  const [GroupDetails,setDetail]=useState(false);
  const [SelectedId, setSelectedId] = useState(null);
  const [GroupDisplay,setDisplay]=useState(false);
  useEffect(()=>
  {
    async function name()
    {
      const response=await axios.get("http://localhost:3001/api/user/data",
      {
        headers:
        {
          authentication: localStorage.getItem("token")
        }
      });
      if(response!=null)
      {
        setUsername(response.data.msg);
      }
    }
    name();
},[])
  async function groupName() {
    const response = await axios.get(
      "http://localhost:3001/api/user/getgroup",
      {
        headers: {
          authentication: localStorage.getItem("token"),
        },
      }
    );
    if (response.data.msg.length > 0) {
      //console.log(response.data.msg);
      setNames(response.data.msg);
      return;
    } else {
      alert("no groups found in our database");
    }
  }
  const handleDelete = async (i) => {
    const updatedMembers = [...GroupNames];
    const user = updatedMembers.splice(i, 1);
    console.log(user);
    const index = user[0].GroupId;
    //console.log(index);
    await axios.post(
      "http://localhost:3001/api/transaction/deleteTrans",
      {
        groupId:index
      }
    );
    await axios.post(
      "http://localhost:3001/api/user/deleteGroup",
      {
        index,
      },
      {
        headers: {
          authentication: localStorage.getItem("token"),
        },
      }
    );
    deleteGroup(index);
    setNames(updatedMembers);
  };
  async function deleteGroup(index) {
    await axios.post("http://localhost:3001/api/group/delete", {
      index,
    });
  }
  function groupDetail() {
    if (SelectedId != null&&GroupDetails) {
      return <Expenses Id={SelectedId}/>;
    } else {
      return null;
    }
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function handlefunction(index)
{
  if(confirm('Are you sure...')==true)
  {
    handleDelete(index);
  }
}
  function CreateGroup()
  {
    if(Creategroup)
    return <>
    <div className="flex justify-center items-center">
    <Groups></Groups>
    </div>
    </>
  }
  function whenBoth()
  {
    if(Creategroup==false&&GroupDetails==false)
    {
    return <>
     <div className="p-3">
      <div className="flex justify-center items-center gap-3">
      <img src="https://assets.splitwise.com/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png" className="w-fit"></img>
          <ul>
          <li className="text-xl">
            To create a new group click on create group
          </li>
          <li className="text-xl">To display your groups click on groups</li>
          </ul>
        </div>
     </div>
    </>
    }
  }
  return (
    <>
    <div className="bg-gray-500 h-screen">
    <div className="bg-white rounded-sm">
    <nav className="flex justify-between p-3">
      <div className="flex align-center justify-center gap-1">
      <img src={Companylogo} className="w-10 rounded-full"></img>
      <p className="text-xl md:text-3xl">Splitequal</p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <p className="text-white border text-2xl rounded-full w-10 h-10 flex justify-center items-center bg-orange-500">{userName[0]}</p>
        <button className="font-semibold text-xl md:text-3xl" onClick={()=>
        {toggleDropdown}}>{userName}</button>
         {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl">
          {/* Dropdown menu items */}
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">Option 3</li>
          </ul>
        </div>
      )}
      </div>
    </nav>
    </div>
    <div className="flex">
      <div id="left aprt" className="w-1/3 md:w-2/3 bg-slate-300 h-screen">
        <div className="text-center">
        <button onClick={()=>
      {
        setGroup(!Creategroup)
          CreateGroup()
          }} className="font-semibold text-xl bg-gray-200 w-2/4 hover:bg-gray-600 p-3 md:text-3xl md:m-3 rounded-md m-3">Create Group</button>
            <div>
        <button onClick={()=>
        {
          groupName()
        }} className="font-semibold text-xl bg-gray-200 w-2/4 hover:bg-gray-600 p-3 md:text-3xl md:m-3 rounded-md m-3 text-center">Groups</button>
        <div className="m-auto text-center bg-gray-500 md:w-1/4 p-2">
          {GroupNames.map(({ GroupId, groupName }, index) => (
            <div key={index} className="flex justify-center items-center ">
              <button
                onClick={() => {
                  setDetail(!GroupDetails),
                  setSelectedId(GroupId)}}
                  className="text-white font-semibold md:text-2xl"
              >
                {groupName}
              </button>
              <button onClick={() => {
                handlefunction(index)
                }} className="text-white md:text-2xl border-2 md:w-10 md:h-10 rounded-full"> X</button>
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>
      <div id='middle' className="bg-gray-200 w-full text-center">
        <h1 className="text-2xl md:text-4xl md:font-semibold md:m-4">DashBoard</h1>
        {
          CreateGroup()
        }
        {groupDetail()}
        {
          whenBoth()
        }
      </div>
      </div>
      </div>
    </>
  );
}
