import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is logged in, go to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        // If not logged in, go to login page
        navigate('/login', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading screen while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/a214adb1-1327-4a83-9cfb-06148d9998f3.png" 
            alt="Zentra Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Zentra</h1>
        <p className="text-xl text-muted-foreground mb-2">The AI Core of Trust</p>
        <p className="text-lg text-muted-foreground/80">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
