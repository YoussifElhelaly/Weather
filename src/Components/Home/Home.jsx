import { Bar, Line } from "react-chartjs-2"
import Future from "../Future/Future"
import Highlight from "../Highlight/Highlight"
import Weather from "../Weather/Weather"

function Home() {
    return(
        <section className="home bg-[#191b1f] text-white p-10">
            <div className="container mx-auto flex gap-6 flex-wrap">
                <Weather/>
                <Highlight/>
                <Future/>
            </div>
        </section>
    )
}

export default Home
