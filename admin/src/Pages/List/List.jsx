import "./List.scss"
import Sidebar from "../../Components/Sidebar/Sidebar"
import UserList from "../../Components/Datatable/UserList"
import HotelList from "../../Components/Datatable/HotelList"
import RoomList from "../../Components/Datatable/RoomList"

const List = ({listname}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        {
          listname == "user" ? <UserList/> : listname == "hotel" ? <HotelList/> : <RoomList/>
        }
      </div>
    </div>
  )
}

export default List
