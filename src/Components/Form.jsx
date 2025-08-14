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
    <div className="form-container relative w-screen h-screen flex items-center justify-center bg-[url('/bgblack.jpg')] bg-cover bg-center print:bg-white">
      <img
        src="fondo photobooth 3.jpg"
        alt="Background Form"
        className="absolute inset-0 w-full h-full object-cover z-0 print:hidden"
      />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full h-full justify-center">
     

        {photoUrl && (
          <>
            {/* Solo esta imagen se imprimirá */}
            <div className="flex flex-row items-center gap-10 printable">
            <img
              src={photoUrl}
              alt="Foto capturada"
              className="w-[80%] max-w-[600px] h-auto border rounded-lg printable"
            />
             <QRCode value={photoUrl} size={300} />
             </div>

            {/* Botón para imprimir (no se mostrará en la impresión) */}
            <div className="flex flex-row items-center gap-20 mt-44">
              <button
                onClick={() => window.electronAPI?.print?.()}
                // onClick={() => window.print()}
                className="bg-gray-400 text-black px-6 py-3 w-96 rounded-xl text-5xl font-bold print:hidden"
              >
                Imprimir foto
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-400 text-black px-6 py-3 w-80 rounded-xl text-5xl font-bold print:hidden"
              >
                Reiniciar
              </button>
            </div>
          </>
        )}

        {/* Botón volver (no se imprimirá) */}
      </div>

      {/* Estilos específicos para impresión */}
      <style>
        {`
          @media print {
            @page {
              size: 4in 6in; /* 10x15 cm en pulgadas */
              margin: 0;
            }

            body * {
              visibility: hidden;
            }

            .printable {
              position: absolute;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              visibility: visible;
              background: white;
              padding: 0;
              margin: 0;
            }

            .printable img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              image-rendering: high-quality;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Form;
