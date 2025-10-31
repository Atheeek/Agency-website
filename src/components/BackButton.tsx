import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-6 left-4 md:left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm md:text-base"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
}