import "./UpdateRoom.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateRoom = () => {

  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [singleRoom, setSingleRoom] = useState({});

  const roomInfo = singleRoom.roomNumbers?.map(val => val.number)
  const [rooms, setRooms] = useState(roomInfo);
  console.log(rooms,"jj")
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-all`);
  const roomData = data.data;

  console.log(singleRoom,"singleRoom")
  useEffect( () =>{
    setRooms(roomInfo)
    const getSingle = async () =>{
      const singleRoomData = await axios.get(`${import.meta.env.VITE_BASE_URL}/room/get-single-room/${id}`)
      setSingleRoom(singleRoomData.data.data)
    }
    getSingle()
  },[])

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    setRooms(roomInfo)
    const roomNumbers = rooms?.map((room) => ({ number: room }));
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/room/update-room/${id}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Update Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
                <div className="formInput">
                  <label>Title</label>
                  <input
                    id='title'
                    type='text'
                    placeholder='title'
                    onChange={handleChange}
                    defaultValue={singleRoom.title}
                  />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input
                    id='description'
                    type='text'
                    placeholder='description'
                    onChange={handleChange}
                    defaultValue={singleRoom.description}
                  />
                </div>
                <div className="formInput">
                  <label>Price</label>
                  <input
                    id='price'
                    type='number'
                    placeholder='price'
                    onChange={handleChange}
                    defaultValue={singleRoom.price}
                  />
                </div>
              
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  defaultValue={roomInfo}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give , between room-numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : roomData &&
                      roomData.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;