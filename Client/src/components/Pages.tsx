import Page1 from "./Page1";

const Pages = () => {
  return (
    <div>
      <div className="w-full ">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-200 to-blue-200 w-full">
          <Page1 />
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-800 to-purple-800 text-white">
          <h2 className="text-4xl font-bold text-black">The Second slide</h2>
          <p className="mt-2">Scroll Down for next slide</p>
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-pink-800 text-white">
          <h2 className="text-4xl font-bold">The Third slide</h2>
          <p className="mt-2">Scroll Down</p>
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-indigo-100 text-black">
          <h2 className="text-4xl font-bold">The Fourth slide</h2>
        </div>
      </div>
    </div>
  );
};

export default Pages;
