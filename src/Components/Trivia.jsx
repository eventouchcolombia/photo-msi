import { useState } from "react";
import { useNavigate } from "react-router-dom";

const preguntas = [
  {
    pregunta: "¿Qué significa MSI?",
    respuestas: [
      "Micro-Star International",
      "Mega Systems Incorporated",
      "Modern Software Interface",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál es una línea popular de laptops gaming de MSI?",
    respuestas: ["Predator", "Stealth", "Legion"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué color es característico en el logo de MSI?",
    respuestas: ["Rojo", "Azul", "Verde"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué animal aparece en el logo de gaming de MSI?",
    respuestas: ["Dragón", "Tigre", "Águila"],
    correcta: 0,
  },
  {
    pregunta: "¿En qué país fue fundada MSI?",
    respuestas: ["Japón", "Taiwán", "Estados Unidos"],
    correcta: 1,
  },
  {
    pregunta:
      "¿Cuál es una característica destacada de las laptops MSI para gamers?",
    respuestas: [
      "Teclado mecánico RGB",
      "Pantalla táctil",
      "Batería removible",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué serie de tarjetas gráficas produce MSI?",
    respuestas: ["GeForce", "Radeon", "Ambas"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es el software de control de hardware de MSI?",
    respuestas: ["Dragon Center", "Control Panel", "MSI Suite"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué tipo de producto NO fabrica MSI?",
    respuestas: ["Placas base", "Impresoras", "Tarjetas gráficas"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el eslogan de MSI para su línea gaming?",
    respuestas: ["True Gaming", "Play Hard", "Game On"],
    correcta: 0,
  },
];

function getRandomQuestions(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const Trivia = () => {
  const navigate = useNavigate();
  const [preguntasSeleccionadas] = useState(() =>
    getRandomQuestions(preguntas, 3)
  );
  const [vista, setVista] = useState(0); // 0, 1, 2, 3 (3 = resultado)
  const [score, setScore] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const handleRespuesta = (idx) => {
    setRespuestaSeleccionada(idx);
    if (idx === preguntasSeleccionadas[vista].correcta) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setRespuestaSeleccionada(null);
      setVista(vista + 1);
    }, 700);
  };

  if (vista >= 3) {
    // Vista de resultado
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[url('/fondoScore.jpg')] bg-cover bg-center text-white  ">
        <h2 className="text-7xl mb-6">¡Trivia terminada!</h2>
        <p className="text-4xl mb-8">
          Respuestas correctas: <span className="font-bold">{score}</span> de 3
        </p>
        <button
          className="bg-[#DD0209] text-white text-4xl px-8 py-3 rounded-4xl hover:scale-105 transition-transform shadow-[0_0_10px_#DD0209,0_0_60px_#DD0209]"
          onClick={() => navigate("/")}
        >
          Volver a inicio
        </button>
      </div>
    );
  }

  const preguntaActual = preguntasSeleccionadas[vista];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/fondoScore.jpg')] bg-cover bg-center text-white">
      <div className="p-8 rounded-3xl shadow-lg w-4/5 h-[50%]   text-center mb-120">
        <h2
          className="
          text-6xl font-bold mb-62 
           h-[14rem] flex items-center justify-center 
            text-center leading-tight 
           line-clamp-3 overflow-hidden
  "
        >
          {preguntaActual.pregunta}
        </h2>

        <div className="flex flex-col gap-20 ">
          {preguntaActual.respuestas.map((resp, idx) => (
            <div
              key={idx}
              className={`cursor-pointer h-30 mt-3 py-4 px-6 rounded-2xl  text-5xl  transition-all border-2 border-red-600 justify-center
                ${
                  respuestaSeleccionada === idx
                    ? idx === preguntaActual.correcta
                      ? "bg-green-600"
                      : "bg-red-600"
                    : " hover:bg-[#DD0209] hover:text-white"
                }
                ${
                  respuestaSeleccionada !== null &&
                  respuestaSeleccionada !== idx
                    ? "opacity-60"
                    : ""
                }
              `}
              onClick={() =>
                respuestaSeleccionada === null && handleRespuesta(idx)
              }
            >
              {resp}
            </div>
          ))}
        </div>
      </div>
      <div className="text-lg text-gray-400">Pregunta {vista + 1} de 3</div>
    </div>
  );
};

export default Trivia;
