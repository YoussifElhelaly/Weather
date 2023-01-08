import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import optionAPI from '../../OptionApi';
import './Weather.css'

function Weather() {





    const [data, setData] = useState({})

    const [location, setLocation] = useState("")

    async function getLocation() {
        if (navigator.geolocation) {
            (navigator.geolocation.getCurrentPosition(showPosition))
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }

      
      function showPosition(position) {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`) ;
    }

    getLocation()

    useEffect( ()=>{
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=fedf431ecbe0494380b145046230701 &q=${location}`)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
        } , [location])
        
       
        console.log(data?.current?.temp_c)
        console.log(data?.current_observation?.condition?.text)


    return(
        <div className="weather w-full lg:w-1/4 rounded-xl overflow-hidden relative bg-gradient-to-tl from-[#3ecde0] via-[#232830]">
            <div className="content backdrop-blur-2xl h-full w-full p-10 ">
                <div className="info ">
                    <div className="img">
                        <img src={data?.current?.condition?.icon} alt="" />
                    </div>
                    <h3 className="text-8xl">{data?.current?.temp_c} <sup>C</sup></h3>
                    <h4>{data?.current?.condition?.text}</h4>
                </div>
                <div className="data">
                    <div className="location"> {data?.location?.name}, {data?.location?.country}</div>
                    <div className="date">{data?.location?.localtime}</div>
                </div>
                
            </div>
        </div>
    )
}

export default Weather