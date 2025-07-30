import { useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container relative w-screen h-screen">
      <img
        src="/bgForm.jpg"
        alt="Background Form"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onClick={() => navigate('/')}
        className="absolute w-80 h-24 text-5xl left-1/2 bottom-96 transform -translate-x-1/2 bg-white bg-opacity-80 px-6 py-3 rounded shadow font-semibold"
      >
        Volver
      </button>
    </div>
  );
}

export default Form;