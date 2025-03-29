export default function Pricing() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4  sm:px-6 lg:px-8">
            <h2 className="text-4xl mt-10 font-bold text-center mb-8">Choose Your Plan</h2>
          <div className="flex gap-2 w-full h-full justify-center items-center ">
            <div className="card w-[24vw] h-[50vh] flex flex-col justify-between">
                <span className="title">
                    Free
                    <p className="pricing">
                        $0<span className="pricing-time">/ month</span>
                    </p>
                    <span className="sub-title">
                        Everything on Basic plan:
                        <ul className="list">
                        <li className="list-item"><span className="check">✓</span> Single User</li>
                            <li className="list-item"><span className="check">✓</span> Basic Transactions</li>
                            <li className="list-item"><span className="check">✓</span> Limited Support</li>
                        </ul>
                        <button className="button">
                            <span className="text-button">Get pro now</span>
                        </button>
                    </span>
                </span>
            </div>
            <div className="card w-[27vw] h-[55vh] border border-l-zinc-50">
                <span className="title">
                    Pro
                    <p className="pricing">
                        $8 <span className="pricing-time">/ month</span>
                    </p>
                    <span className="sub-title">
                        Everything on Basic plus:
                        <ul className="list">
                            <li className="list-item"><span className="check">✓</span> Single User</li>
                            <li className="list-item"><span className="check">✓</span> Basic Transactions</li>
                            <li className="list-item"><span className="check">✓</span> Limited Support</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                            <li className="list-item"><span className="check">✓</span> Feature</li>
                        </ul>
                        <button className="button">
                            <span className="text-button">Get pro now</span>
                        </button>
                    </span>
                </span>
            </div>
            <div className="card w-[24vw] h-[50vh]">
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

        </div>
    );
}


const plans = [
  {
      name: "Basic",
      description: "Perfect for individuals",
      price: "10 Tokens",
      features: ["Single User", "Basic Transactions", "Limited Support"],
  },
  {
      name: "Pro",
      description: "Best for small businesses",
      price: "50 Tokens",
      features: ["Multiple Users", "Priority Transactions", "24/7 Support"],
  },
  {
      name: "Enterprise",
      description: "For large-scale usage",
      price: "100 Tokens",
      features: ["Unlimited Users", "High-Speed Transactions", "Dedicated Support"],
  },
];