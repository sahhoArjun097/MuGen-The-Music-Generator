import { useDispatch } from "react-redux";
import api from "../api";
import { addToken } from "../utils/authslice";

export default function Pricing() {

    const dispatch = useDispatch()



    const createOrder = async (amount) => {
        try {
          const res = await api.post("/create-order", {
            amount,
          });
      
          const orderData = res.data;
          const { id: order_id } = orderData;
          console.log(orderData);
      
          const options = {
            key: "rzp_test_MGWPWiEReMuL5p", // Replace with your Razorpay key
            amount: amount * 100,
            currency: "INR",
            name: "MuGen",
            description: "Music Plan Purchase",
            order_id,
            handler: async function (response) {
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      
              try {
                console.log(razorpay_order_id)
                console.log(razorpay_payment_id)
                console.log(razorpay_signature)
                const verifyRes = await api.post("/paymentverification", {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                  });
                  console.log("Verification response:", verifyRes.data);
                  const resData = verifyRes.data;
if (resData.success) {
  console.log("Payment Verified:", resData.message);
} else {
  console.error("Payment Verification Failed:", resData.message);
}
      
                // const result = await verifyRes.json();
                if (resData.success) {
                  alert("✅ Payment Verified Successfully!");
                   if (amount == 150){
                    
                    dispatch(addToken(100))
                }
                if (amount == 399){
                    
                    dispatch(addToken(300))
                }
                if (amount == 699){
                    
                    dispatch(addToken(500))
                }

                } else {
                  alert("❌ Payment Verification Failed!");
                }
              } catch (verifyError) {
                console.error("Verification Error:", verifyError);
                alert("⚠️ Could not verify payment.");
              }
            },
            prefill: {
              name: "Arjun Agarwal",
              email: "user@example.com",
            },
            theme: {
              color: "#fbbf24",
            },
          };
      
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } catch (error) {
          console.error("Failed to create order:", error);
        }      
    };
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4  sm:px-6 lg:px-8">
            <h2 className="text-4xl mt-10 font-bold text-center mb-8">Choose Your Plan</h2>
            <div className="flex gap-2 w-full h-full justify-center items-center ">
                <div className="card w-[24vw] h-[60vh] flex flex-col justify-between p-4  border border-zinc-200 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">🎵 100 Mues Plan</h2>
                        <p className="text-lg line-through text-red-300">₹200</p>
                        <p className="text-3xl font-extrabold text-green-400">Now ₹150 <span className="text-sm text-gray-300">/ one-time</span></p>
                        <p className="mt-2 text-sm text-gray-200">Generate music with 100 Mues and unlock creative freedom!</p>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-gray-100">
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Access to 100 Mues</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> High-quality music generation</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Instant download in MIDI</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Lifetime validity</li>
                    </ul>

                    <button onClick={() => createOrder(150)} className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition">
                        Buy Now & Save ₹50
                    </button>
                </div>

                <div className="card w-[27vw] h-[62vh] border border-zinc-200 bg-gradient-to-br from-indigo-800 to-purple-700 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">💎 Pro Mues Plan</h2>
                        <p className="text-lg line-through text-red-300">₹499</p>
                        <p className="text-3xl font-extrabold text-yellow-300">Now ₹399 <span className="text-sm text-gray-300">/ one-time</span></p>
                        <p className="mt-2 text-sm text-gray-200">Unlock 300 Mues to generate high-quality AI music with priority access.</p>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-gray-100">
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> 300 Mues included</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Advanced Music Features</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Priority Music Rendering</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Premium Support</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Exclusive Sound Packs</li>
                    </ul>

                    <button onClick={() => createOrder(399)} className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition">
                        Get Pro Now & Save ₹100
                    </button>
                </div>

                <div className="card w-[24vw] border border-zinc-200 h-[60vh] bg-gradient-to-br from-purple-900 to-indigo-800 text-white rounded-2xl shadow-xl p-5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">🚀 Ultra Pro Plan</h2>
                        <p className="text-lg line-through text-red-300">₹899</p>
                        <p className="text-3xl font-extrabold text-yellow-300">Now ₹699 <span className="text-sm text-gray-300">/ one-time</span></p>
                        <p className="mt-2 text-sm text-gray-200">Get 500 Mues for powerful, high-fidelity music generation.</p>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-gray-100">
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> 500 Mues Included</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Unlimited Project Access</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Fastest Rendering Speed</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Premium AI Modes</li>
                        <li className="flex items-center"><span className="check mr-2 text-green-400">✓</span> Dedicated Support</li>
                    </ul>

                    <button onClick={() => createOrder(699)} className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition">
                        Unlock Ultra Power & Save ₹200
                    </button>
                </div>

            </div>

        </div>
    );
}

