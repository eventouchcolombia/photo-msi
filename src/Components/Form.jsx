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
    <div className="form-container relative w-screen h-screen flex items-center justify-center bg-black print:bg-white">
      <img
        src="/bgForm.jpg"
        alt="Background Form"
        className="absolute inset-0 w-full h-full object-cover z-0 print:hidden"
      />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full h-full justify-center">
        {photoUrl && (
          <>
            {/* Solo esta imagen se imprimirá */}
            <img
              src={photoUrl}
              alt="Foto capturada"
              className="w-[80%] max-w-[600px] h-auto border rounded-lg printable"
            />
             <QRCode value={photoUrl} size={200} />
            {/* Botón para imprimir (no se mostrará en la impresión) */}
            <button
              onClick={() => window.electronAPI?.print?.()}
              // onClick={() => window.print()}
              className="bg-white text-black px-6 py-3 w-80 rounded-lg text-2xl font-bold print:hidden"
            >
              Imprimir foto
            </button>
          </>
        )}

        {/* Botón volver (no se imprimirá) */}
        <button
          onClick={() => navigate("/")}
          className="bg-purple-400 text-black px-6 py-3 w-80 rounded-lg text-4xl font-bold print:hidden"
        >
          Volver
        </button>
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
            }
          }
        `}
      </style>
    </div>
  );
};

export default Form;
