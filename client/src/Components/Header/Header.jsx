import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faPlane, faCar, faTowerObservation, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchData } from '../../Redux/Reducers/HotelReducer'

const Header = ({type}) => {

    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false) 
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [openOptions, setOpenOptions] = useState(false);
      const [options, setOptions] = useState({
        adult:1,
        children:0,
        room:1
      })

      const navigate = useNavigate()

      const handleOption = (name, operation) =>{
          console.log(name)
          console.log(options[name])
        setOptions((prev)=>{
            return{
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
       };
        });
      };
      
    //   const payload = { destination, date, options }
    const formattedStartDate = format(date[0].startDate, "yyyy-MM-dd"); // Convert to a string or timestamp
    const formattedEndDate = format(date[0].endDate, "yyyy-MM-dd"); 
      const dispatch = useDispatch()
      
      const handleSearch = () =>{
        dispatch(searchData({
            destination,
            date: [
            {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                key: 'selection'
            }
        ],
            options
        }));
        localStorage.setItem("searchData",JSON.stringify({
            destination,
            date: [
            {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                key: 'selection'
            }
        ],
            options
        }))
        navigate("/hotels", { state: {destination, date, options}})
      };
       
  return (                                               
    <div className='header'>
        <div className={type === "list" ? "header-container list-mode": "header-container"} >
            {/* <div className="headerList">
                <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faTowerObservation} />
                <span>Attractions</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport Taxis</span>
                </div>
            </div> */}
            {  type !== "list" &&
                <>
            <h1 className='header-title'>A Lifetime Of Discounts? It's Genius</h1>
            <p className='header-desc'>Get Rewarded for your Travels - unlock Instant Savings of 10% or more with a free RiverSun Booking Account</p>
            <div className="header-search">
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faBed} className='header-icon'/>
                    <input type="text" onChange={e=>setDestination(e.target.value)} placeholder='Where are you going?' className='header-search-input'/>
                </div>
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faCalendarDays} className='header-icon' />
                    <span onClick={ ()=>setOpenDate(!openDate)} className='header-search-text'>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")} `}</span>
                    {openDate && <DateRange
                    editableDateInputs={true} 
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className='date'
                    minDate={new Date()}
                    />}
                </div>
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faPerson} className='header-icon' />
                    <span onClick={()=>setOpenOptions(!openOptions)} className='header-search-text'>{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
                    { openOptions && <div className="options">
                        <div className="option-item">
                            <span className="option-text">Adult</span>
                            <div className="option-counter">
                                <button className="option-counter-button" onClick={()=>handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                                <span className="option-counter-number">{options.adult}</span>
                                <button className="option-counter-button" onClick={()=>handleOption("adult", "i")}>+</button>
                            </div>
                        </div>
                        <div className="option-item">
                            <span className="option-text">Children</span>
                            <div className="option-counter">
                                <button className="option-counter-button" onClick={()=>handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                                <span className="option-counter-number">{options.children}</span>
                                <button className="option-counter-button" onClick={()=>handleOption("children", "i")}>+</button>
                            </div>
                        </div>
                        <div className="option-item">
                            <span className="option-text">Rooms</span>
                            <div className="option-counter">
                                <button className="option-counter-button" onClick={()=>handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                                <span className="option-counter-number">{options.room}</span>
                                <button className="option-counter-button" onClick={()=>handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="header-search-item">
                    <button className='header-button' onClick={handleSearch}>Seacrh</button>
                </div>
            </div></> }
        </div>
    </div>
  )
}

export default Header


