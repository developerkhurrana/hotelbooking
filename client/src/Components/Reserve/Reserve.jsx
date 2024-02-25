import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Reserve = ({setOpenModal, hotelID}) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error} =  useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-hotel/room/${hotelID}`)
  const { date } = useSelector(state=>state.hotels)
  // console.log(date)
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime());
    
    let list =[]
    while(date <= end){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }
    return list
  }
  
  const allDates = getDatesInRange(date[0].startDate, date[0].endDate)

  const isAvailable = (roomNumber) =>{
    console.log(roomNumber)
    const isFound = roomNumber.unavailableDates?.some((date)=>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound
  }

  const handleClick = async () =>{
    try {
      await Promise.all(selectedRooms.map((roomID)=>{
        const res = axios.put(`${import.meta.env.VITE_BASE_URL}/room/availability/${roomID}`, {dates:allDates})
        return res.data
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = (e) =>{
    const checked = e.target.checked 
    const value = e.target.value
    setSelectedRooms( checked ? [...selectedRooms, value]
      : selectedRooms.filter((item) => item !== value)
    );
  };

  console.log(selectedRooms)
  return (
    <div className='reserve'>
        <div className="r-container">
            <FontAwesomeIcon icon={faCircleXmark} 
            className='r-close' 
            onClick={()=>{setOpenModal(false)}}/>
            <span>Select Your Rooms</span>
            {data.data?.map(item=>(
              <div className="r-item" key={item._id}>
                <div className="r-itemInfo">
                  <div className="r-title">{item?.title}</div>
                  <div className="r-desc">{item?.description}</div>
                  <div className="r-max">
                    Max people: <b>{item?.maxPeople}</b>
                  </div>
                  <div className="r-price">{item.price}</div>
                </div>
                <div className="r-selectRooms">
                  {item.roomNumbers.map((roomNumber) =>(
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input type="checkbox" 
                      value={roomNumber._id} 
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}/>
                    </div>
                  ))}
                </div>
              </div>  
            ))}
            <button onClick={handleClick} className='rButton'>Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve