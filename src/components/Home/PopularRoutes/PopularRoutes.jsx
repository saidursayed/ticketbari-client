import { MapPin } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoMegaphone } from "react-icons/go";
import Container from "../../Shared/Container/Container";
const routes = [
  {
    from: "Dhaka",
    to: "Chittagong",
    trips: "1,250",
    image: "https://i.ibb.co/8bJ9YkF/chittagong.jpg",
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    trips: "980",
    image: "https://i.ibb.co/0Jmshvb/sylhet.jpg",
  },
  {
    from: "Dhaka",
    to: "Cox Bazar",
    trips: "850",
    image: "https://i.ibb.co/Jk6JwS9/cox.jpg",
  },
  {
    from: "Dhaka",
    to: "Khulna",
    trips: "720",
    image: "https://i.ibb.co/8bJ9YkF/chittagong.jpg",
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

          {/* Grid */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Glass Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2 text-white">
                    <MapPin size={18} />
                    <span className="font-semibold text-sm md:text-base">
                      {item.from} → {item.to}
                    </span>
                  </div>
                </figure>

                {/* Content */}
                <div className="card-body p-5">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-primary">
                      {item.trips}+
                    </span>{" "}
                    trips this month
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
