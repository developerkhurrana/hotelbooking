import React from 'react'
import './PropertyList.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const { data, loading, error} = useFetch(`${import.meta.env.VITE_BASE_URL}/hotel/get-hotel/countByType`)
    const images = [
        "https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/feature-1-450x300.png",
        "https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Lobby-1-2.png",
        "https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/feature-17-450x300.png",
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o="
    ]
  return (
    <div className='p-list'>
        { loading ? ("Loading...") : (
            <>
                { data &&  
                    images.map((img,i) =>(<div className="p-list-item" key={i}>
                    <img src={img} alt="" className="p-list-image" />
                    <div className="p-list-title">
                        <h1>{data[i]?.type}</h1>
                        <h2>{data[i]?.count} {data[i]?.type}</h2>
                    </div>
                </div> 
                ))}               
            </>
        )}
    </div>
  )
}

export default PropertyList