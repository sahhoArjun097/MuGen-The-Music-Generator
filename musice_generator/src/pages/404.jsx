import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="w-screen h-[calc(100vh-30px)] bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link 
        to={"/"} 
        className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Page404;
