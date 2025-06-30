
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const expenseData = [
  { name: 'Alimentação', value: 1200, color: '#ef4444' },
  { name: 'Transporte', value: 800, color: '#f97316' },
  { name: 'Lazer', value: 600, color: '#eab308' },
  { name: 'Contas', value: 450, color: '#8b5cf6' },
  { name: 'Outros', value: 200, color: '#6b7280' }
];

const totalIncome = 8200;
const totalExpenses = 3250;
const expensePercentage = (totalExpenses / totalIncome) * 100;

export const FinancialHealth = () => {
  const getHealthStatus = () => {
    if (expensePercentage <= 30) return { status: 'Excelente', color: 'text-green-600 dark:text-green-400', icon: TrendingUp };
    if (expensePercentage <= 50) return { status: 'Bom', color: 'text-blue-600 dark:text-blue-400', icon: TrendingUp };
    if (expensePercentage <= 70) return { status: 'Atenção', color: 'text-yellow-600 dark:text-yellow-400', icon: AlertCircle };
    return { status: 'Crítico', color: 'text-red-600 dark:text-red-400', icon: TrendingDown };
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;

  return (
    <Card className="p-3 sm:p-4 lg:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Saúde Financeira</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Distribuição dos seus gastos</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <HealthIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className={`font-medium text-sm sm:text-base ${health.color}`}>{health.status}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-4 sm:space-y-6">
        {/* Gráfico - Sempre em cima no mobile */}
        <div className="h-48 sm:h-56 lg:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={window.innerWidth < 640 ? 60 : 80}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Informações - Embaixo no mobile */}
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between items-center p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Gasto Total</span>
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                R$ {totalExpenses.toLocaleString('pt-BR')}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">% da Receita</span>
              <span className={`font-semibold text-sm sm:text-base ${health.color}`}>
                {expensePercentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Detalhamento por Categoria</h4>
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-slate-50/30 dark:bg-slate-700/20 rounded-lg">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">{item.name}</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white ml-2">
                  R$ {item.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
