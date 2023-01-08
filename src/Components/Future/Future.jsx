import { useEffect, useState } from "react";

function Future() {

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
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=fedf431ecbe0494380b145046230701&q=${location}&days=10&aqi=no&alerts=no`)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
        } , [location])
        
        // console.log(data)
        
        // let myDate = new Date(1673126100 * 1000)

        // console.log((new Date(1673126100 * 1000).toGMTString()).split(" "))
    return(
        <div className="future w-full lg:w-1/4 rounded-xl overflow-hidden">
            <div className="conatiner mx-auto bg-gradient-to-br from-[#3ecde0] via-[#232830]">
                <div className="content p-5 backdrop-blur-2xl overflow-y-auto h-[40vh]">
                        {
                            data?.forecast?.forecastday?.map((day)=>{
                                // console.log(day)
                                let myDay = new Date(day.date_epoch*1000).toGMTString()
                                return (
                                    <div className="box flex items-center justify-between">
                                        <div className="img">
                                            <img src={day.day.condition.icon} alt="" />
                                        </div>
                                        <h3 className="text-xl">{day.day.maxtemp_c}/ <span className="text-sm">{day.day.mintemp_c}</span></h3>
                                        <h4 className="text-xl">{`${myDay.split(" ")[1]} ${myDay.split(" ")[2]}`  }</h4>
                                        <h4 className="text-xl">{myDay.split(",")[0]}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}

export default Future