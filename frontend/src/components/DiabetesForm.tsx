import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity, Heart, Zap } from 'lucide-react';

interface DiabetesData {
  age: number;
  blood_pressure: number;
  bmi: number;
  diabetes_pedigree_function: number;
  glucose: number;
  insulin: number;
  pregnancies: number;
  skin_thickness: number;
}

interface DiabetesFormProps {
  onResult: (result: any) => void;
}

const DiabetesForm: React.FC<DiabetesFormProps> = ({ onResult }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DiabetesData>({
    age: 0,
    blood_pressure: 0,
    bmi: 0,
    diabetes_pedigree_function: 0,
    glucose: 0,
    insulin: 0,
    pregnancies: 0,
    skin_thickness: 0,
  });

  const handleInputChange = (field: keyof DiabetesData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha na análise');
      }

      const result = await response.json();
      onResult(result);

      toast({
        title: 'Análise concluída!',
        description: 'Os resultados da análise estão prontos.',
      });
    } catch (error) {
      toast({
        title: 'Erro na análise',
        description: 'Não foi possível processar os dados. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { key: 'age', label: 'Idade (anos)', icon: Heart, min: 0, max: 120 },
    { key: 'glucose', label: 'Glicose (mg/dL)', icon: Zap, min: 0, max: 300 },
    {
      key: 'blood_pressure',
      label: 'Pressão Arterial (mmHg)',
      icon: Activity,
      min: 0,
      max: 200,
    },
    {
      key: 'skin_thickness',
      label: 'Espessura da Pele (mm)',
      icon: Activity,
      min: 0,
      max: 100,
    },
    { key: 'insulin', label: 'Insulina (μU/mL)', icon: Zap, min: 0, max: 900 },
    {
      key: 'bmi',
      label: 'IMC (kg/m²)',
      icon: Heart,
      min: 0,
      max: 60,
      step: 0.1,
    },
    {
      key: 'diabetes_pedigree_function',
      label: 'Histórico Familiar',
      icon: Heart,
      min: 0,
      max: 2.5,
      step: 0.01,
    },
    { key: 'pregnancies', label: 'Gestações', icon: Heart, min: 0, max: 20 },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-semibold gradient-primary bg-clip-text text-transparent">
          Análise de Diabetes
        </CardTitle>
        <CardDescription className="text-base">
          Preencha os dados abaixo para uma análise personalizada
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map(
              ({ key, label, icon: Icon, min, max, step = 1 }) => (
                <div key={key} className="space-y-2">
                  <Label
                    htmlFor={key}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    max={max}
                    step={step}
                    value={formData[key as keyof DiabetesData] || ''}
                    onChange={e =>
                      handleInputChange(
                        key as keyof DiabetesData,
                        e.target.value,
                      )
                    }
                    className="input-focus transition-smooth"
                    placeholder={`Ex: ${
                      key === 'age' ? '30' : key === 'glucose' ? '120' : '0'
                    }`}
                  />
                </div>
              ),
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant="medical"
            className="w-full h-12 text-base font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analisando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Iniciar Análise
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesForm;
