import React, { useEffect, useState } from 'react'
import './Featured.css'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const Featured = () => {

    const { data, loading, error } = useFetch("http://localhost:3006/hotel/get-hotel/countByCity?cities=NewYork,California,New Jersey,Los Angeles,San Francisco,Nevada")
    const navigate = useNavigate()
    const [count,setCount] = useState()
    const handleCity = (city) =>{
        navigate(`${window.location.toString().slice(25,)}/hotels/`,{state:{
            destination: city 
        }})
    }
    useEffect(() => {
        if (data && data.data) {
            setCount(data.data);
        }
    }, [data]);
  return (
    <div className="featured">
        { loading ? ("Loading... Please wait") : ( <> <div className="featured-item" onClick={()=>handleCity("California")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>California</h1>
                <h2>{count && count[1]} properties</h2>
            </div>
        </div>
        <div className="featured-item" onClick={()=>handleCity("NewYork")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/New-York-City.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>New York</h1>
                <h2>{count && count[0]} properties</h2>
            </div>
        </div>
        <div className="featured-item" onClick={()=>handleCity("New Jersey")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/New-Jersey.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>New Jersey</h1>
                <h2>{count && count[2]} properties</h2>
            </div>
        </div>
        <div className="featured-item" onClick={()=>handleCity("Los Angeles")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Los-Angeles.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>Los Angeles</h1>
                <h2>{count && count[3]} properties</h2>
            </div>
        </div>
        <div className="featured-item" onClick={()=>handleCity("San Francisco")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/San-Francisco.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>San Francisco</h1>
                <h2>{count && count[4]} properties</h2>
            </div>
        </div>
        <div className="featured-item" onClick={()=>handleCity("Nevada")}>
            <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Nevada_.jpg" alt="" className='featured-image' />
            <div className="featured-titles">
                <h1>Nevada</h1>
                <h2>{count && count[5]} properties</h2>
            </div>
        </div>
        </>
        )}
    </div>
        
  )
}

export default Featured