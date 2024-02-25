import './SearchItem.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchData } from '../../Redux/Reducers/HotelReducer'
import { useEffect } from 'react'

const SearchItem = ({item,date, options, destination}) => {

    const dispatch = useDispatch()

    console.log(date,options,destination)
    const parameters = date!==null || undefined && options!==null || undefined && destination.length!==null || undefined && true
    console.log( parameters,"parameter")
    
    const formattedStartDate =  date!==null || undefined && format(date[0].startDate, "yyyy-MM-dd"); // Convert to a string or timestamp
    const formattedEndDate =  date!==null || undefined && dateformat(date[0].endDate, "yyyy-MM-dd"); 
    useEffect(()=>{
      
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
      };
      handleSearch()
    },[destination,options,date])
  return (
    <div className='search-item'>
        <img src={item.photos[0]} 
        alt="" 
        className="si-image" />
        <div className="si-desc">
            <h1 className='si-title'>{item.name}</h1>
            <span className="si-distance">{item.distance}</span>
            <span className="si-taxiOp">Free Airport Taxi</span>
            <span className="si-subtitle">Studio Apartment with Air Conditioning</span>
            <span className="si-features">{item.description}</span>
            <span className="si-cancelOp">Free Cancellation</span>
            <span className="si-cancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
        </div>
        <div className="si-details">
            { item.rating && <div className="si-rating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="si-detailTexts">
                <span className="si-price">${item.cheapestPrice}</span>
                <span className="si-taxOp">Incudes taxes and fees</span>
                <Link to={ parameters ? `/hotels/${item._id}`: `/`}>
                <button className="si-check-button">See Availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem