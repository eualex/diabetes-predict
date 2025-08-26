import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiabetesResult {
  has_diabetes: boolean;
  diabetes_probability: number;
  no_diabetes_probability: number;
}

interface DiabetesResultProps {
  result: DiabetesResult;
  onReset: () => void;
}

const DiabetesResult: React.FC<DiabetesResultProps> = ({ result, onReset }) => {
  const { toast } = useToast();

  const hasDiabetes = result.has_diabetes;
  const diabetesProbability = result.diabetes_probability;
  const noDiabetesProbability = result.no_diabetes_probability;

  // Show notification when component mounts
  useEffect(() => {
    if (hasDiabetes) {
      toast({
        title: '⚠️ Risco Elevado Detectado',
        description: `Probabilidade de diabetes: ${Math.round(
          diabetesProbability * 100,
        )}%. Recomendamos consultar um médico.`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: '✅ Risco Baixo',
        description: `Probabilidade de não ter diabetes: ${Math.round(
          noDiabetesProbability * 100,
        )}%. Continue mantendo hábitos saudáveis!`,
      });
    }
  }, [hasDiabetes, diabetesProbability, noDiabetesProbability, toast]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card
        className={`shadow-card border-2 transition-smooth ${
          hasDiabetes
            ? 'border-orange-200 bg-orange-50/50'
            : 'border-green-200 bg-green-50/50'
        }`}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            {hasDiabetes ? (
              <AlertCircle className="h-16 w-16 text-orange-500" />
            ) : (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
          </div>
          <CardTitle
            className={`text-2xl font-bold ${
              hasDiabetes ? 'text-orange-700' : 'text-green-700'
            }`}
          >
            {hasDiabetes ? 'Risco Elevado' : 'Risco Baixo'}
          </CardTitle>
          <CardDescription className="text-lg">
            {hasDiabetes
              ? 'Os dados indicam um possível risco de diabetes'
              : 'Os dados sugerem baixo risco de diabetes'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-glow mb-2">
                <span className="text-lg font-bold text-white">
                  {Math.round(diabetesProbability * 100)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Risco de Diabetes</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-glow mb-2">
                <span className="text-lg font-bold text-white">
                  {Math.round(noDiabetesProbability * 100)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Sem Diabetes</p>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              hasDiabetes
                ? 'bg-orange-100 border border-orange-200'
                : 'bg-green-100 border border-green-200'
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                hasDiabetes ? 'text-orange-800' : 'text-green-800'
              }`}
            >
              Recomendações:
            </h4>
            <ul
              className={`space-y-1 text-sm ${
                hasDiabetes ? 'text-orange-700' : 'text-green-700'
              }`}
            >
              {hasDiabetes ? (
                <>
                  <li>• Consulte um médico endocrinologista</li>
                  <li>• Realize exames de sangue detalhados</li>
                  <li>• Monitore a alimentação e pratique exercícios</li>
                  <li>• Mantenha acompanhamento médico regular</li>
                </>
              ) : (
                <>
                  <li>• Mantenha hábitos de vida saudáveis</li>
                  <li>• Pratique exercícios regularmente</li>
                  <li>• Faça check-ups médicos anuais</li>
                  <li>• Continue monitorando sua saúde</li>
                </>
              )}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Importante:</strong> Esta análise é apenas uma estimativa
              baseada em dados estatísticos. Sempre consulte um profissional de
              saúde qualificado para diagnósticos precisos e orientações
              médicas.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="transition-bounce hover:shadow-medical"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Nova Análise
        </Button>
      </div>
    </div>
  );
};

export default DiabetesResult;
