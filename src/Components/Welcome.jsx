import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen overflow-hidden relative flex items-center justify-center bg-[url('/bgblack.jpg')] bg-cover bg-center"
      onClick={() => navigate('/photo')}
    >
      <img
        src="Welcome.png"
        alt="Welcome to the Photobooth"
        className="absolute inset-0 w-full h-full object-cover  pointer-events-none"
      />

      <div className="z-10 text-center text-white px-4">
        <h1 className="text-8xl font-bold mb-6">
          Bienvenidos al photobooth <br></br> MSI-Evocom
        </h1>
        <button
  className="bg-[#94C01E] mt-44 text-black text-6xl font-semibold px-8 py-3 rounded-lg hover:scale-105 transition-transform animate-pulse"
>
  Tomar Foto
</button>

      </div>
    </div>
  );
};

export default Welcome;