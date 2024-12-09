
const Register = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-3/4 bg-black flex flex-col justify-center items-center text-white p-10">
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
  {/* Background Video */}
  <video 
    className="absolute top-0 left-0 w-full h-full object-cover" 
    src="/globe-5fdfa9a0f4.mp4" 
    autoPlay 
    loop 
    muted 
  ></video>

  {/* Content Overlay */}
  <div className="relative z-10 text-center bg-black bg-opacity-50 p-5 rounded-lg">
    <div className="text-3xl font-bold mb-5 flex items-center gap-2">
    <img src="/musical-note.png" alt="Google Logo" className="h-8 p-1" />
      <span>M</span>
    </div>
    <h1 className="text-4xl font-bold mb-3">Welcome to</h1>
    <h2 className="text-3xl font-bold mb-3">Muegen Community</h2>
    <p className="text-lg mb-3">Home to passionate music creators worldwide</p>
    <a
  href="#"
  className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text hover:underline font-medium text-lg"
>
  Know more
</a>

  </div>
</div>

      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-3xl font-bold mb-5">Join us</h2>
        <p className="text-gray-600 mb-5 text-center">
          Create a Muegen account and join a vibrant <br />community of music enthusiasts
        </p>
        <form className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Your password"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <div className="flex items-start mb-3">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="terms"
              />
            </div>
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to HackerRank's{" "}{/* while giving space we can add this {" "} to provide space b/w the elements */}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-lg font-bold hover:bg-indigo-600"
          >
            Sign up
          </button>
        </form>
        <div className="flex items-center my-5 w-full max-w-sm">
          <div className="border-t w-full"></div>
          <span className="mx-3 text-gray-500">or</span>
          <div className="border-t w-full"></div>
        </div>
        <div className="flex gap-3 w-full max-w-sm">
          <button className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center justify-center hover:bg-gray-200">
            <img src="/image.png" alt="Google Logo" className="h-8 p-1" />
            Continue with Google
          </button>
        </div>
        <div className="flex gap-4 mt-4">
  <button className="flex  gap-2 border p-3 justify-center items-center rounded-xl w-40 h-12">
    <img src="/linkedin.png" alt="LinkedIn Logo" className="h-6 w-6" />
    <p className="text-black text-sm font-medium">LinkedIn</p>
  </button>
  <button className="flex items-center justify-center  gap-2 border p-3 rounded-xl w-40 h-12">
    <img src="/github.png" alt="GitHub Logo" className="h-6 w-6" />
    <p className="text-black text-sm font-medium">GitHub</p>
  </button>
  <button className="flex items-center justify-center gap-2 border p-3 rounded-xl w-40 h-12">
    <img src="/facebook.png" alt="Facebook Logo" className="h-6 w-6" />
    <p className="text-black text-sm font-medium">Facebook</p>
  </button>
</div>

        <p className="mt-5 text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
