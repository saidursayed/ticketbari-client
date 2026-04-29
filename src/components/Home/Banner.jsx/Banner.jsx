import { LuPlane } from "react-icons/lu";
import { IoBoatOutline } from "react-icons/io5";
import { PiTrain } from "react-icons/pi";
import Container from "../../Shared/Container/Container";
import { LuBus } from "react-icons/lu";

const Banner = () => {
  return (
    <div className="bg-linear-to-br from-primary/5 via-background to-accent/5 pb-10 md:pb-20 md:pt-40 pt-26">
      <Container>
        <div className=" text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <h1 className=" text-primary-content">Book Your Journey,</h1>
            <h1 className="text-primary mt-2">Travel With Ease</h1>
          </div>

          {/* Description */}
          <p className="mt-6 tex  md:text-lg text-secondary-content  mx-auto">
            Discover and book travel tickets for Bus, Train, Launch, and Flight
            across Bangladesh. Safe, reliable, and <br /> convenient travel at
            your fingertips.
          </p>

          {/* Transport Icons */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-secondary-content">
            <div className="flex justify-center items-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <LuBus size={20} className="text-primary" />
              </div>
              <span className="mt-2 font-medium">Bus</span>
            </div>

            <div className="flex gap-1 items-center">
              <div className="bg-[#00bb87]/10 p-3 rounded-full">
                <PiTrain size={20} className="text-[#00bb87]" />
              </div>
              <span className="mt-2 font-medium">Train</span>
            </div>

            <div className="flex gap-1 items-center">
              <div className="bg-[#ec5a00]/10 p-3 rounded-full">
                <IoBoatOutline size={20} className="text-[#ec5a00]" />
              </div>
              <span className="mt-2 font-medium">Launch</span>
            </div>

            <div className="flex gap-1 items-center">
              <div className="bg-[#9260da]/10 p-3 rounded-full">
                <LuPlane size={20} className="text-[#9260da]" />
              </div>
              <span className="mt-2 font-medium">Plane</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
