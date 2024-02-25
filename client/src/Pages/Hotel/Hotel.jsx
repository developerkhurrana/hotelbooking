import './Hotel.css';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../Components/MailList/MailList';
import Footer from '../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reserve from '../../Components/Reserve/Reserve';

const Hotel = () => {
  
  const searchData= useSelector(state=>state.hotels);
  const user = useSelector(state=>state.user.currentUser)
  console.log(searchData,"dates")

  const miliSecondsPerDay = 1000 * 60 * 60 * 24 
  function dayDifference(date1, date2){
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    const timeDiff = Math.abs(dateObj2.getTime() - dateObj1.getTime());
    const diffDays = Math.ceil(timeDiff / miliSecondsPerDay);
    return diffDays
  }

  const days = dayDifference(searchData?.date[0].endDate, searchData?.date[0].startDate)

  let { id } = useParams();
  
  console.log(id) 

  const { data, loading, error} = useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-single-hotel/${id}`)
  const newData = data.data;
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [hotelData, setHotelData ] = useState({})

  useEffect(() => {
    if (data && data.data) {
      setHotelData(data.data);
    }
}, [data]);
  const navigate = useNavigate()

  const handleOpen = (i)=>{
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
      let newSlideNumber;
      if(direction === "l"){
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
      }
      else{
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
      }

      setSlideNumber(newSlideNumber)
  }
  
  const handleClick = () =>{
    if(user){
      setOpenModal(true)
    }else{
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      { loading ? ("Loading...") : ( <div className="hotel-container">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={handleMove('l')} />
          <div className="slider-wrapper">
            <img src={hotelData?.photos[slideNumber]} alt="" className="slider-img" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={handleMove('l')} />
        </div>}
        <div className="hotel-wrapper">
          {/* <button className="book-now" >Reserve or Book Now!</button> */}
          <h1 className="hotel-title">{hotelData?.name}</h1>
          <div className="hotel-address">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{hotelData?.address}</span>
          </div>
          <span className="hotel-distance">Excellent Location - {hotelData?.distance}m from center</span>
          <span className="hotel-price-highlight">Book a stay over ${hotelData?.cheapestPrice} at this property and get a free airport taxi</span>
          <div className="hotel-images">
            {hotelData?.photos?.map((photo,i)=>(
              <div className="hotelImg-wrapper">
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotel-img" />
              </div>
            ))}
          </div>
          <div className="hotel-details">
            <div className="hotel-details-text">
                <h1 className="hotel-title">{hotelData?.title}</h1>
                <p className="hotel-desc">
                  {hotelData?.description}
                </p>
            </div>
            <div className="hotel-details-price">
              <h1>Perfect for a {days}-night stay</h1>
              <span>Located in the real heart of California, this property has an excellent location score of 9.8</span>
              <h2>
                <b>${days * hotelData?.cheapestPrice * searchData.options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
      )}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelID={id}/>}
    </div>
  )
}

export default Hotel