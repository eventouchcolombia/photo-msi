import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebaseConfig";



const Photo = () => {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreparado, setShowPreparado] = useState(false);
  const [showFinalDragon, setShowFinalDragon] = useState(false);
  const [showDragon, setShowDragon] = useState(false); // 👈 Mostrar dragón después del conteo
  const [hasCaptured, setHasCaptured] = useState(false);
  const [dragonBig, setDragonBig] = useState(false);
    const [finalDragonVisible, setFinalDragonVisible] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const marcoRef = useRef(null);
  const hasCapturedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showFinalDragon) {
      // Espera un frame para activar el fade-in
      setTimeout(() => setFinalDragonVisible(true), 10);
    } else {
      setFinalDragonVisible(false);
    }
  }, [showFinalDragon]);

  useEffect(() => {
    if (showDragon) {
      // Cambia el tamaño después de 1.5 segundos (ajusta el tiempo si quieres)
      const timer = setTimeout(() => setDragonBig(true), 3400);
      return () => clearTimeout(timer);
    } else {
      setDragonBig(false); // Reinicia si se oculta el dragón
    }
  }, [showDragon]);

  useEffect(() => {
    hasCapturedRef.current = hasCaptured;
  }, [hasCaptured]);


  const handleNext = () => {
    navigate("/form");
  };

  useEffect(() => {
  if (!loading && !hasCapturedRef.current) {
    setShowDragon(true);

    const dragonTimer = setTimeout(() => {
      if (!hasCapturedRef.current) {
        setShowFinalDragon(true);
        setShowDragon(false);
      }

      const preparadoTimer = setTimeout(() => {
        setShowPreparado(false);
        if (!hasCapturedRef.current) startCountdown();
      }, 5000);

      return () => clearTimeout(preparadoTimer);
    }, 5000);

    return () => clearTimeout(dragonTimer);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [loading]);


  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();

       
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const capturePhoto = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && context) {
      const marco = marcoRef.current;
      const canvasWidth = marco ? marco.width : 1080;
      const canvasHeight = marco ? marco.height : 1920;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const videoAspectRatio = videoWidth / videoHeight;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (videoAspectRatio > canvasAspectRatio) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * videoAspectRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / videoAspectRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
      context.setTransform(1, 0, 0, 1, 0, 0);

      if (marco) {
        context.drawImage(marco, 0, 0, canvas.width, canvas.height);
      }

      const dragonImg = new Image();
      dragonImg.src = "/drangonfinal.png";
      // medidas para el dragón
      // 🐉 Ajusta las medidas según tu imagen
      dragonImg.onload = async () => {
        const dragonWidth = 630;
        const dragonHeight = 1300;
        const dragonRight = 220;
        const dragonBottom = 128;

        const x = canvasWidth - dragonRight - dragonWidth;
        const y = canvasHeight - dragonBottom - dragonHeight;

        context.drawImage(dragonImg, x, y, dragonWidth, dragonHeight);

        const imageData = canvas.toDataURL("image/png");
        setHasCaptured(true);
        hasCapturedRef.current = true; 
        setShowFinalDragon(false);
        setCapturedImage(imageData);

        // 🆙 Subir a Firebase
        const imageName = `photo-${Date.now()}.png`;
        const storageRef = ref(storage, `photos/${imageName}`);

        try {
          await uploadString(storageRef, imageData, "data_url");
          const url = await getDownloadURL(storageRef);
          console.log("✅ Imagen subida. URL pública:", url);
           localStorage.setItem("capturedPhotoUrl", url);
        } catch (error) {
          console.error("❌ Error al subir la imagen:", error);
        }
      };
    }
  };

  const handleRetakePhoto = () => {
    setCapturedImage(null);
    setHasCaptured(false);
    setLoading(true);
    setShowDragon(false);
    setShowFinalDragon(false);
    //setMoveDragon(false);
  };

  const handleUserMedia = () => {
    setLoading(false);
  };
// Define video constraints
  // Puedes ajustar la resolución.
   const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 720 },
    facingMode: "user"
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {loading && (
        <img
          src="/loading.gif"
          alt="Cargando..."
          className="absolute w-24 h-24 animate-spin"
        />
      )}

      {!capturedImage && (
        <Webcam
          ref={webcamRef}
          className={`absolute top-0 left-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
        />
      )}

      {/* 🐉 Mostrar el dragón después del conteo */}
      {showDragon && (
         <img
          src="/dragon3.gif"
          alt="Dragón"
          className={`absolute z-40 bottom-40 right-[0px] transition-all duration-[3000ms]
            ${dragonBig
              ? "w-[600px] h-[600px] right-[-20px]"
              : "w-[1080px] h-[1400px]"
            }`}
        />
      )}
      {showFinalDragon && (
        <img
          src="/drangonfinal.png"
          alt="Dragón Final"
          className={`
            absolute z-40 bottom-24 right-[0px] w-[800px] h-[1400px]
            transition-all duration-400
            ${finalDragonVisible ? " translate-y-0" : "opacity-0 translate-y-10"}
          `}
        />
      )}

      <canvas ref={canvasRef} className="hidden" />

      {!capturedImage && (
        <img
          ref={marcoRef}
          src="/marco.png"
          alt="Marco"
          className="absolute w-full h-full pointer-events-none"
        />
      )}

      {showPreparado && (
        <img
          src="/preparate.png"
          alt="Prepárate"
          className="absolute z-50 top-[15%] w-96 h-auto"
        />
      )}

      {countdown !== null && (
        <img
          src={`/${countdown}.png`}
          alt={`Cuenta regresiva ${countdown}`}
          className="absolute mt-[-1000px] w-20 h-20 z-50"
        />
      )}

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Foto capturadas"
          className="absolute w-full h-full object-cover"
        />
      )}

      {capturedImage && (
        <div className="absolute bottom-35 flex gap-72 z-50">
          <button
            onClick={handleRetakePhoto}
            className="bg-black text-white px-6 py-3 w-80 rounded-lg text-4xl font-bold flex items-center justify-center gap-4"
          >
            <img src="/replay.png" alt="icono repetir" className="w-10 h-10" />
            Repetir foto
          </button>

          <button
            onClick={handleNext} // 👉 reemplaza con tu lógica de navegación
            className="bg-black text-white px-6 py-3 w-80 rounded-lg text-4xl font-bold flex items-center justify-center gap-4"
          >
            <img src="/next.png" alt="icono siguiente" className="w-10 h-10" />
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Photo;
