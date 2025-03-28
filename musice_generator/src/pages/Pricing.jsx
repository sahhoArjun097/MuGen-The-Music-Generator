export default function Pricing() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4  sm:px-6 lg:px-8">
            <h2 className="text-4xl mt-10 font-bold text-center mb-8">Choose Your Plan</h2>
            {/* <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-center mb-4">{plan.name}</h3>
              <p className="text-center text-gray-400">{plan.description}</p>
              <div className="text-4xl font-bold text-center my-6">{plan.price}</div>
              <ul className="space-y-3 text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg">
                Get Started
              </button>
            </div>
          ))}
        </div> */}
            <div className="card">
                <span className="title">
                    Pro
                    <p className="pricing">
                        $8 <span className="pricing-time">/ month</span>
                    </p>
                    <span className="sub-title">
                        Everything on Basic plus:
                        <ul className="list">
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                        </ul>
                        <button className="button">
                            <span className="text-button">Get pro now</span>
                        </button>
                    </span>
                </span>
            </div>

        </div>
    );
}

const plans = [
    {
        name: "Basic",
        description: "Perfect for individuals",
        price: "$9/month",
        features: ["1 User", "5GB Storage", "Basic Support"],
    },
    {
        name: "Pro",
        description: "Great for teams",
        price: "$29/month",
        features: ["10 Users", "50GB Storage", "Priority Support"],
    },
    {
        name: "Enterprise",
        description: "For large businesses",
        price: "$99/month",
        features: ["Unlimited Users", "500GB Storage", "24/7 Support"],
    },
];
