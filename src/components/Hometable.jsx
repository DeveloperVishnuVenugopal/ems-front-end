import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';

function Hometable({displayData,removeUser}) {
  console.log(displayData);
  return (
    <>
        <Table striped bordered hover className='align-items-center'>
        <thead className='align-items-center'>
        <tr className='align-items-center ms-3'>
          <th >No</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          displayData.length>0?displayData.map((item,index)=>(
            <tr className='align-items-center'>
            <td>{index+1}</td>
            <td>{item.fname} {item.lname}</td>
            <td>{item.email}</td>
            <td>{item.mobile}</td>
            <td><button className={item.status==='Active'?"btn btn-success":"btn btn-danger"}>{item.status}</button></td>
            <td><img style={{width:'100px',height:'100px',borderRadius:'50%'}}
             src={`${BASE_URL}/uploads/${item.profile}`}
             alt="" /></td>
            <td>
              {/* View */}
              <Link to={`/view/${item._id}`} ><i className="fa-solid fa-eye text-warning fs-4 me-2 "></i></Link>
              {/* Edit */}
              <Link to={`/edit/${item._id}`} > <i className="fa-solid fa-pen text-info fs-4  "></i> </Link>
              {/* Delete */}
              <span className='btn '> <i onClick={()=>removeUser(item._id)} className="fa-solid fa-trash text-danger fs-4 me-2  "></i> </span>
  
            </td>
          </tr>
            )):
            <tr className='mt-5 w-100 text-danger fs-3'>
          Nothing to display
        </tr>
        }
        
       
     
      </tbody>
        </Table>
    </>
  )
}

export default Hometable