import React from 'react'
import "./FeaturedProperties.css"
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
    const { data, loading, error} = useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-all?featured=true&min=50&max=500&limit=4`)
    // console.log(data.data)
  return (
    <div className='fp'>
        { loading ? ("Loading...") : (
            <> 
                {Array.isArray(data.data) && data.data.map((item) =>(
                    <div className="fp-item" key={item._id}>
                        <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/feature-19-600x400.png" alt="" className="fp-image" />
                        <span className="fp-name">{item.name}</span>
                        <span className="fp-city">{item.city}</span>
                        <span className="fp-price">Starting from {item.cheapestPrice}</span>
                        {item.rating && <div className="fp-rating">
                            <button>{item.rating}</button>
                            <span>Excellent</span>
                        </div> }
                    </div>
                ))}
            </> )    
        }
    </div>
  )
}

export default FeaturedProperties 