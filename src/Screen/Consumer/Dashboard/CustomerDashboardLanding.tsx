import { Link } from "react-router-dom";

export default function CustomerDashboardLanding() {
  return (
    <>
      <section className="xl:w-full h-full p-4 py-6 text-center flex flex-col justify-center items-center">
        <div className="h-[100vh] overflow-auto">
          <h2 className="heading heading-lg-bold">Welcome To pvNXT - Solar Simplified</h2>
          <p className="para para-md text-gray-500 text-center sm:w-3/4 md:w-3/4 lg:w-3/6 mx-auto">
            Our software makes solar energy easy. Solar power is reliable and consistent. Say goodbye to energy bills. There’s an initial investment, but it offers long-term benefits like savings and tax breaks. Solar is becoming more affordable. It can also increase property value. Solar energy is a sustainable and profitable investment. Harness the sun’s power today!
          </p>
          <Link to="/Consumer/RoofAnalysis"><button className="btn btn-md-primary py-2"> Analyze My Roof</button></Link>
          <div className="flex justify-center mt-4">
            <iframe loading="lazy" className="sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-2/3 max-xl:w-2/3  h-[60vh] border border-gray-900" src="https://www.canva.com/design/DAGR7l5pgms/MfA45ZD6StD2bEtjOpV-4w/watch?embed" allowFullScreen allow="fullscreen"></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
