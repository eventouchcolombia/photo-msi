import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen overflow-hidden relative flex items-center justify-center bg-[url('/bgblack.jpg')] bg-cover bg-center">
      <video
        src="dragonMsi.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="z-10  mt-[-39%] flex flex-col gap-13 w-180   text-center text-white px-4">
        <button
          className="bg-[#DD0209] mt-0 h-26 text-7xl font-semibold px-8 py-3 rounded-4xl hover:scale-105 transition-transform animate-pulse opacity-80 shadow-[0_0_10px_#DD0209,0_0_60px_#DD0209]"
          onClick={() => navigate("/photo")}
        ></button>

        <button
          className="bg-[#DD0209] mt-0 h-26 text-white text-6xl font-semibold px-8 py-3 rounded-4xl hover:scale-105 transition-transform animate-pulse opacity-80 shadow-[0_0_10px_#DD0209,0_0_60px_#DD0209]"
          onClick={() => navigate("/trivia")}
        ></button>
      </div>
    </div>
  );
};

export default Welcome;
