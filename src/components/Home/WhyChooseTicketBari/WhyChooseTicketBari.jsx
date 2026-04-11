import {
  ShieldCheck,
  Clock,
  CreditCard,
  Headphones,
  Star,
  Zap,
} from "lucide-react";
import Container from "../../Shared/Container/Container";

const features = [
  {
    icon: <ShieldCheck className="text-blue-500 w-6 h-6" />,
    title: "Secure Booking",
    desc: "Your transactions are protected with industry-standard encryption",
  },
  {
    icon: <Clock className="text-blue-500 w-6 h-6" />,
    title: "24/7 Availability",
    desc: "Book your tickets anytime, anywhere with our always-on platform",
  },
  {
    icon: <CreditCard className="text-blue-500 w-6 h-6" />,
    title: "Easy Payments",
    desc: "Multiple payment options including cards, mobile banking & more",
  },
  {
    icon: <Headphones className="text-blue-500 w-6 h-6" />,
    title: "Customer Support",
    desc: "Dedicated support team ready to help with your travel needs",
  },
  {
    icon: <Star className="text-blue-500 w-6 h-6" />,
    title: "Best Prices",
    desc: "Compare prices across vendors and get the best deals guaranteed",
  },
  {
    icon: <Zap className="text-blue-500 w-6 h-6" />,
    title: "Instant Confirmation",
    desc: "Get your e-ticket instantly after successful booking",
  },
];

const WhyChooseTicketBari = () => {
  return (
    <div className="bg-base-100 py-16">
      <Container>
        <div >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-content">
              Why Choose TicketBari?
            </h2>
            <p className="text-secondary-content mt-3 text-sm md:text-base">
              We make travel booking simple, secure, and affordable for everyone
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-info-content rounded-2xl shadow-sm hover:shadow-md transition duration-300 px-6 py-10 flex gap-4 items-start lg:card"
              >
                {/* Icon */}
                <div className="bg-primary/10 p-3 rounded-xl">{item.icon}</div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-primary-content text-lg">
                    {item.title}
                  </h3>
                  <p className="text-secondary-content text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseTicketBari;
