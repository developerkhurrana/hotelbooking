import "./UpdateHotel.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom"

const UpdateHotel = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const [singleHotel, setSingleHotel] = useState({})

  const { id } = useParams()

  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BASE_URL}/room/get-all`);
  const roomData = data.data

  useEffect(() => {
    const getData = async () => {
      const hotelData = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/get-single-hotel/${id}`)
      setSingleHotel(hotelData.data.data)
      setFiles(hotelData.data.data.photos)
    }
    getData()

  }, [])

  const [files, setFiles] = useState(singleHotel.photos);

  // console to check singleHotel before passing it as value to input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };


  //---------------------------------------------------------------------------------------------


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/shreyasdange/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const updatehotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`${import.meta.env.VITE_BASE_URL}/hotel/update-hotel/${id}`, updatehotel);
    } catch (err) { console.log(err) }
  };

  console.log(singleHotel ,"singleHotel.rooms ")
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={files?files[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="no image"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) =>{
                    console.log( e.target.files,"e.t.f")
                  setFiles(e.target.files)

                  } }
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input
                  id='name'
                  onChange={handleChange}
                  type='text'
                  placeholder='name'
                  defaultValue={singleHotel.name}
                />
              </div>

              <div className="formInput">

                <label>Type</label>
                <input
                  id='type'
                  onChange={handleChange}
                  type='text'
                  placeholder='hotel'
                  defaultValue={singleHotel.type}

                />
              </div>

              <div className="formInput">

                <label>City</label>
                <input
                  id='city'
                  onChange={handleChange}
                  type='text'
                  placeholder='NewYork'
                  defaultValue={singleHotel.city}

                />
              </div>
              <div className="formInput">

                <label>Address</label>
                <input
                  id='address'
                  onChange={handleChange}
                  type='text'
                  placeholder='elton st, 216'
                  defaultValue={singleHotel.address}

                />
              </div>
              <div className="formInput">

                <label>Distance from City Center</label>
                <input
                  id='distance'
                  onChange={handleChange}
                  type='text'
                  placeholder='500'
                  defaultValue={singleHotel.distance}

                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  id='title'
                  onChange={handleChange}
                  type='text'
                  placeholder='title'
                  defaultValue={singleHotel.title}

                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id='description'
                  onChange={handleChange}
                  type='text'
                  placeholder='description'
                  defaultValue={singleHotel.description}

                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  id='cheapestPrice'
                  onChange={handleChange}
                  type='number'
                  placeholder='100'
                  defaultValue={singleHotel.cheapestPrice}

                />
              </div>
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}  
                defaultValue={singleHotel?.featured}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect} defaultValue={
              singleHotel?.rooms   
                }>
                  {loading
                    ? "Loading..."
                    : roomData &&
                    roomData.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
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

export default UpdateHotel;
