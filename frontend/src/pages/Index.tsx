import React, { useState } from 'react';
import DiabetesForm from '@/components/DiabetesForm';
import DiabetesResult from '@/components/DiabetesResult';
import { Activity, Shield, Users, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

const Index = () => {
  const [result, setResult] = useState(null);

  const handleResult = (analysisResult: any) => {
    setResult(analysisResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  const features = [
    {
      icon: Activity,
      title: 'Análise Precisa',
      description: 'Algoritmos avançados para análise de risco de diabetes'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Seus dados são processados com total segurança e privacidade'
    },
    {
      icon: Zap,
      title: 'Resultado Rápido',
      description: 'Obtenha resultados instantâneos em segundos'
    },
    {
      icon: Users,
      title: 'Suporte Médico',
      description: 'Orientações baseadas em conhecimento médico especializado'
    }
  ];

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-background py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <DiabetesResult result={result} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Análise de Diabetes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Descubra seu risco de diabetes através de uma análise rápida e confiável baseada em seus dados de saúde
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Análise baseada em algoritmos médicos validados</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-medical transition-smooth transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-lg mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div className="flex justify-center">
            <DiabetesForm onResult={handleResult} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Esta ferramenta é destinada apenas para fins informativos e não substitui o diagnóstico médico profissional.
          </p>
          <p className="text-xs text-muted-foreground">
            Sempre consulte um profissional de saúde qualificado para questões médicas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;