import React, { useContext, useEffect, useState } from 'react'
import { Await, Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Loadingspinner from '../components/Loadingspinner'
import { Alert } from 'react-bootstrap'
import { deleteContext, registerContext, updateContext } from '../components/ContextShare'
import { allUsers, deleteUser } from '../services/allApis'
import { ToastContainer, toast } from "react-toastify";



function Home() {
  const {updateData,setUpdateData}= useContext(updateContext)
  const {deleteData,setDeleteData} =useContext(deleteContext)
  const{registerData,setRegisterData} = useContext(registerContext)

  const [showSpin,setShowSpin] = useState(true)
  const [allUsersData,setAllUsersData]= useState([])
  const [search,setSearch]=useState("")

  const getallEmployees = async ()=>{
    const response = await allUsers(search)
    if(response.status===200){
      setAllUsersData(response.data);
    }else{
      toast.error("cannot fech data!!!");
    }
  }

   const removeUser = async (id)=>{
    const response = await deleteUser(id)
    if(response.status===200){
      getallEmployees()
      setDeleteData(response.data)
    }else{
      toast.error("Operation Failed!!! Please try after sometime...")
    }
   }
  useEffect(()=>{
    getallEmployees()
    setTimeout(() => {
      setShowSpin(false)
    }, 2000);
  },[search])
  return (
    <>
    {
      updateData&&<Alert variant='primary' onClose={()=>setUpdateData("")} dismissible>
        {updateData.fname.toUpperCase()} Updated successfully...
      </Alert>
    }
    {
      deleteData&&<Alert variant='danger' onClose={()=>setDeleteData("")} dismissible>
        {deleteData.fname.toUpperCase()} Removed successfully...
      </Alert>
    }
    {
      registerData&&<Alert variant='success' onClose={()=>setRegisterData("")} dismissible>
        {registerData.fname.toUpperCase()} registered successfully...
      </Alert>
    }
    {showSpin ? (
    <Loadingspinner></Loadingspinner>
    ) : (
        <div className="container mt-5 ">
           <div className='search-all d-flex align-items-center'>
                <div className="search d-flex align-items-center">
                    <span className='fw-bolder'>Search:</span>
                    <input type="text" style={{width:'400px'}} 
                    placeholder='Search Employee By Name' className='form-control ms-3'
                    onChange={e=>setSearch(e.target.value)} />
                </div>
                <Link to={'/add'} className='btn btn-warning ms-auto'>
                    <i className='fa-solid fa-user-plus'></i>Add</Link>
           </div>

            <div className="table">
                <h1>List Of Employees</h1>
                <Hometable displayData={allUsersData} removeUser={removeUser}/>
            </div>
        </div>
        )}
              <ToastContainer position="top-center" />
    </>
  )
}

export default Home