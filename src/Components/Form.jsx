import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const Form = () => {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("capturedPhotoUrl");
    if (storedUrl) {
      setPhotoUrl(storedUrl);
    }
  }, []);

  return (
    <div className="form-container relative w-screen h-screen flex items-center justify-center bg-black">
      <img
        src="/bgForm.jpg"
        alt="Background Form"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {photoUrl && (
          <div className="flex flex-col md:flex-row gap-8 items-center bg-black/40 bg-opacity-90 p-8 rounded-xl shadow-lg">
            <img
              src={photoUrl}
              alt="Foto capturada"
              className="w-[300px] h-auto rounded-lg border"
            />
            <QRCode value={photoUrl} size={200} />
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-purple-400 text-black px-6 py-3 w-80 rounded-lg text-4xl font-bold"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Form;
