import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import './Highlight.css'



function Highlight() {


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

    useEffect( ()=>{
        getLocation()
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=fedf431ecbe0494380b145046230701 &q=${location}`)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
        } , [location])
        
       
        // console.log(Number((data?.forecast?.forecastday[0]?.astro.sunrise)?.split(" ")[0].split(":")[0])*60)
        async function getDeg() {

            let sunsetArr = (data?.forecast?.forecastday[0]?.astro.sunset)?.split(" ")[0].split(":")
            let sunriseArr = (data?.forecast?.forecastday[0]?.astro.sunrise)?.split(" ")[0].split(":")
            let timeArr = data?.location?.localtime.split(" ")[1].split(":")
            let sunRise = (+sunriseArr[0])*60 + +sunriseArr[1]
            let sunSet = (+sunsetArr[0] + 12)*60 + +sunsetArr[1]
            let time = ((+timeArr[0]) * 60) + +timeArr[1]
            console.log(timeArr)
            console.log(time)
            let deg = ((100 - (((time - sunRise) / sunSet)) * 180)) / 100 * 180
            let sun = document?.getElementById("sun")
            if(time > sunSet) {
                sun.style.transform = `translateX(-50%) rotate(-180deg)`
            } else {
                sun.style.transform = `translateX(-50%) rotate(-${deg}deg)`
            }
        }

        getDeg()



    return(
            <div className="highlight w-full lg:w-2/4 p-5 rounded-xl overflow-hidden flex-grow bg-gradient-to-tl from-[#3ecde0] via-[#232830]">
                <div className="container mx-auto h-full backdrop-blur-3xl">
                    <div className="grid grid-rows-6 md:grid-rows-3 lg:grid-rows-2 grid-flow-col gap-2.5 h-full">
                    <div className="bg-[#191b1fb8] p-5 rounded-xl">
                        <h3>Wind Status</h3>
                        <p className="text-5xl"> {data?.current?.wind_kph} <span className="text-lg">km/h</span></p>
                    </div>
                    <div className="bg-[#191b1fb8] p-5 rounded-xl">
                        <h3>Humidity</h3>
                        <p className="text-5xl"> {data?.current?.humidity} <span className="text-lg">%</span></p>
                    </div>
                    <div className="bg-[#191b1fb8] p-5 rounded-xl">
                        <h3>UV Index</h3>
                        <p className="text-5xl"> {data?.current?.uv} <span className="text-lg">UV</span></p>
                    </div>
                    <div className="bg-[#191b1fb8] p-5 rounded-xl">
                        <h3>Visibillity</h3>
                        <p className="text-5xl"> {data?.current?.vis_km} <span className="text-lg">KM</span></p>
                    </div>

                    <div className="bg-[#191b1fb8] p-5 rounded-xl relative">
                        <h3>Sunrise & Sunset</h3>
                            <div class="circle2">
                                <div class="circle">
                                    <div class="inner" id="sun">
                                        <i class="fa-regular fa-sun"></i>
                                    </div>
                                </div>
                        </div>
                        <p className="rise text-5xl"> {data?.forecast?.forecastday[0]?.astro.sunrise}</p>
                        <p className="set text-5xl"> {data?.forecast?.forecastday[0]?.astro.sunset}</p>
                    </div>
                    <div className="bg-[#191b1fb8] p-5 rounded-xl">
                        <h3>Feels Like</h3>
                        <p className="text-5xl"> {data?.current?.feelslike_c} <span className="text-lg">C</span></p>
                    </div>

                    </div>
                </div>
            </div>
    )
}

export default Highlight