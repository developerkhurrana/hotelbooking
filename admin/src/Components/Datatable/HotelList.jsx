import "./Datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from 'react'
import axios from "axios"

const HotelList = () => {
  const { data, loading, error } =  useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-all`);
  const rowData = data?.data || [];
  const [list, setList] = useState(rowData);
  
const hotelColumn = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "title", headerName: "Title", width: 230 },
    { field: "city", headerName: "City", width: 200 },
    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={`/hotel/updatehotel/${params.row._id}`} >
                <button className="viewButton">View</button>
              </Link>
                <button onClick={()=>handleDelete(params.row._id)} className="deleteButton">Delete</button>
            </div>
          );
        }
        }
  ]


  useEffect(()=>{
    setList(rowData)
  },[])

  if(loading){
    return <div>Loading</div>
  }

  if(error){
    return <div>Error: {error.message}</div>
  }

  // console.log(data.data)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/hotel/delete/${id}`)
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      
    }
  };


  return (
    <div className="datatable">
      <div className="datatableTitle">
        Hotel List
        <Link to={`/hotel/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rowData}
        columns={hotelColumn}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row)=>row._id}
        initialState={{
          pagination:{
            paginationModel: { page: 0, pageSize: 8},
          },
        }}
        pageSizeOptions={[8, 10]}
      />
    </div>
  );
};

export default HotelList;


