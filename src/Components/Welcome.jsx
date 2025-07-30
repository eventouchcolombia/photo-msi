import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen overflow-hidden relative cursor-pointer"
      onClick={() => navigate('/photo')}
    >
      <img
        src="/Welcome.jpg"
        alt="Welcome to the Photobooth"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

export default Welcome;