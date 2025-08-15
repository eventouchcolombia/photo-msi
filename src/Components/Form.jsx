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
            {/* Solo la imagen debe estar dentro de .printable para la impresión */}
            <div className="flex flex-row mt-100 items-center gap-10">
              <div className="printable">
                <img
                  src={photoUrl}
                  alt="Foto capturada"
                  className="w-64 md:w-80 lg:w-[28rem] h-auto border rounded-lg"
                />
              </div>
              <div className="print:hidden">
                <QRCode value={photoUrl} size={300} />
              </div>
            </div>

            {/* Botón para imprimir (no se mostrará en la impresión) */}
            <div className="flex flex-row items-center gap-20 mt-35">
              <button
                onClick={() => window.electronAPI?.print?.()}
                // onClick={() => window.print()}
                className="bg-black/50 text-white px-6 py-3 w-96 rounded-xl text-5xl font-bold print:hidden"
              >
                Imprimir foto
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-black/50 text-white px-6 py-3 w-80 rounded-xl text-5xl font-bold print:hidden"
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
              bleed: 0;
            }

            body * {
              visibility: hidden;
            }

            .printable {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              visibility: visible;
              background: white;
              padding: 0;
              margin: 0;
              gap: 0 !important;
            }

            /* Asegura que los hijos del área imprimible también sean visibles */
            .printable * {
              visibility: visible;
            }

            .printable img {
              width: 100% !important;
              height: 100% !important;
              max-width: none;
              max-height: none;
              object-fit: contain;
              image-rendering: high-quality;
              border: none !important;
              border-radius: 0 !important;

            }
          }
        `}
      </style>
    </div>
  );
};

export default Form;
