import { MapPin } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoMegaphone } from "react-icons/go";
import Container from "../../Shared/Container/Container";
import { TiArrowRight } from "react-icons/ti";

const routes = [
  {
    from: "Sylhet",
    to: "Chittagong",
    trips: "1,250",
    image: "https://i.ibb.co.com/DPTSZpyf/ee1fd1a9c7c140dedb3a323092e4d33a.jpg",
  },
  {
    from: "Sylhet",
    to: "Dhaka",
    trips: "980",
    image: "https://i.ibb.co.com/S41RgpZ3/e5a3ca73c9fc34cde3106b5426a36b43.jpg",
  },
  {
    from: "Sylhet",
    to: "Cox Bazar",
    trips: "850",
    image: "https://i.ibb.co.com/Z6q9RxYn/83380932ff197900cce130c7cf0e64d0.jpg",
  },
  {
    from: "Sylhet",
    to: "Rajshahi",
    trips: "720",
    image: "https://i.ibb.co.com/0VGmWfWR/68fc06f583c9654dccae2ea88a4157e1.jpg",
  },
];

const PopularRoutes = () => {
  return (
    <div className="py-16 bg-info-content">
      <Container>
        <div>
          {/* Header */}

          <div className="flex items-center gap-3 mb-10">
            <div className="bg-accent/10 p-3 rounded-xl">
              <FaArrowTrendUp className="text-accent" size={24} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-content">
                Popular Routes
              </h2>
              <p className="text-secondary-content font-medium">
                Most traveled destinations this month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden group rounded-2xl border border-base-200"
              >
                {/* Image */}
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.from} to ${item.to}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Glass Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md  border border-secondary-content rounded-xl px-4 py-2 flex items-center gap-2 text-white">
                    <MapPin size={18} />
                    <span className="flex items-center gap-2 font-semibold text-sm md:text-base">
                      {item.from} <TiArrowRight /> {item.to}
                    </span>
                  </div>
                </figure>

                {/* Content */}
                <div className="card-body p-5">
                  <p className="text-secondary-content text-sm">
                    <span className="font-semibold text-primary">
                      {item.trips}+ &nbsp;
                    </span>
                     Trips this month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PopularRoutes;
