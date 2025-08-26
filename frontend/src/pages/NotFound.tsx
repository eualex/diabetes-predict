import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-background px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-primary mx-auto mb-4" />
        </div>
        <h1 className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Página não encontrada</p>
        <Button 
          onClick={() => window.location.href = '/'} 
          variant="medical"
          className="transition-bounce"
        >
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
