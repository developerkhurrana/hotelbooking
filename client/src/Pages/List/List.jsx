import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import './List.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import format from 'date-fns/format'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchItem from '../../Components/SearchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {

  const location = useLocation()
  // console.log(location.state.destination,"location") 
  const [destination, setDestination] = useState(location.state.destination ? location.state.destination : '')
  const [date, setDate] = useState(location.state.date ? location.state.date : [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options ? location.state.options : {
    adult: 1,
    children: 0,
    room: 1
  })
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  console.log(date)

  const { data, loading, error, reFetch } = useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-all?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleClick = () => {
    reFetch();
  }
  const handleChange = (e) => {
    setOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search-parent">
          <div className="list-search">
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label htmlFor="">Destination</label>
              <input type="text" defaultValue={destination} />
            </div>
            <div className="list-item">
              <label>Check-in date</label>
              <span className='range-date' onClick={() => setOpenDate(!openDate)}>{date.length > 0 ? `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}` : 'Start Date to End Date'}</span>

            </div>

            <div className="list-item">
              <label htmlFor="">Options</label>
              <div className="list-options">
                {/* <div className="list-option-item">
                  <span className="list-option-text">Min Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className='list-option-input' />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Max Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className='list-option-input' />
                </div> */}
                <div className="list-option-item">
                  <span className="list-option-text">Adult</span>
                  <input type="number" min={1} className='list-option-input' defaultValue={options?.adult}  name="adult" onChange={handleChange} />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Children</span>
                  <input type="number" min={0} className='list-option-input' defaultValue={options?.children} name="children" onChange={handleChange} />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Room</span>
                  <input type="number" min={1} className='list-option-input' defaultValue={options?.room} name="room" onChange={handleChange} />
                </div>
              </div>

            </div>

            <button onClick={handleClick}>Search</button>

          </div>

          </div>
          {openDate && <div className='date' style={{position:'fixed', left:'300px'}}>
            <DateRange
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
              
            />
          </div>}
          <div className="list-result">
            {loading ? "Loading..." : <>
              {Array.isArray(data.data) && data.data.map(item => (
                <SearchItem item={item} key={item._id} date={date} options={options} destination={destination} />
              ))}
            </>}

          </div>
        </div>
      </div>

    </div>
  )
}

export default List