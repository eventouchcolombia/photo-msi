import { useState, useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const Photo = () => {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreparado, setShowPreparado] = useState(false);
  const [showFinalDragon, setShowFinalDragon] = useState(false);
  const [showDragon, setShowDragon] = useState(false); // 👈 Mostrar dragón después del conteo

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const marcoRef = useRef(null);

  // const navigate = useNavigate();

  // const handleNext = () => {
  //   navigate("/form");
  // };

 useEffect(() => {
  if (!loading) {
    setShowDragon(true); // 🐉 Mostrar dragon.gif

    // ⏳ Después de 6 segundos, mostrar dragonfinal.png
    const dragonTimer = setTimeout(() => {
      setShowFinalDragon(true);
      setShowDragon(false); 
      // 🧍 Mostrar "prepárate" por 2 segundos
      setShowPreparado(true);
      const preparadoTimer = setTimeout(() => {
        setShowPreparado(false);
        startCountdown(); // 🔢 Iniciar cuenta regresiva
      }, 5000);

      return () => clearTimeout(preparadoTimer);
    }, 4258); // ⏱️ 6s de duración del gif

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

       

        // ✅ Cambiar a dragonfinal.png después de 6s
        setTimeout(() => {
          setShowFinalDragon(true);
        }, 5300);
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

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  // const handleRetakePhoto = () => {
  //   setCapturedImage(null);
  //   setLoading(true);
  //   setShowDragon(false);
  //   setShowFinalDragon(false);
  //   setMoveDragon(false);
  // };

  const handleUserMedia = () => {
    setLoading(false);
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
          videoConstraints={{ facingMode: "user" }}
          onUserMedia={handleUserMedia}
        />
      )}

      {/* 🐉 Mostrar el dragón después del conteo */}
{showDragon && (
          <img
            src="/dragon3.gif"
            alt="Dragón"
            className="absolute z-40 bottom-32 right-[220px] w-[630px] h-[1400px] transition-all duration-1000"
          />
        )}
        {showFinalDragon && (
          <img
            src="/drangonfinal.png"
            alt="Dragón Final"
            className="absolute z-40  bottom-32 right-[220px] w-[630px] h-[1300px] transition-all duration-1000"
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

      <div className="absolute bottom-96 w-full flex justify-center gap-20 z-50 pointer-events-auto"></div>
    </div>
  );
};

export default Photo;
