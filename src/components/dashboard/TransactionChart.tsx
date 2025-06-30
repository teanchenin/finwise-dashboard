
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PeriodFilter, PeriodType } from "./PeriodFilter";

const allData = [
  { month: 'Jul', receitas: 3200, despesas: 2100 },
  { month: 'Ago', receitas: 3800, despesas: 2300 },
  { month: 'Set', receitas: 4200, despesas: 2800 },
  { month: 'Out', receitas: 3900, despesas: 2600 },
  { month: 'Nov', receitas: 4500, despesas: 3200 },
  { month: 'Dez', receitas: 5200, despesas: 3800 },
  { month: 'Jan', receitas: 4000, despesas: 2400 },
  { month: 'Fev', receitas: 3000, despesas: 1398 },
  { month: 'Mar', receitas: 2000, despesas: 9800 },
  { month: 'Abr', receitas: 2780, despesas: 3908 },
  { month: 'Mai', receitas: 1890, despesas: 4800 },
  { month: 'Jun', receitas: 2390, despesas: 3800 },
];

const filterDataByPeriod = (data: typeof allData, period: PeriodType) => {
  switch (period) {
    case '7d':
      return data.slice(-1);
    case '30d':
      return data.slice(-2);
    case '6m':
      return data.slice(-6);
    case '1y':
      return data;
    case 'all':
      return data;
    default:
      return data.slice(-6);
  }
};

export const TransactionChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('6m');
  const filteredData = filterDataByPeriod(allData, selectedPeriod);

  return (
    <Card className="p-3 sm:p-4 lg:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in">
      {/* Header - Layout vertical em telas muito pequenas */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between sm:mb-6">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">Fluxo Financeiro</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Receitas vs Despesas</p>
        </div>
        
        {/* Controles - Stack vertical em telas pequenas */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="order-2 sm:order-1">
            <PeriodFilter 
              selectedPeriod={selectedPeriod} 
              onPeriodChange={setSelectedPeriod} 
            />
          </div>
          
          {/* Legenda - Compacta em telas pequenas */}
          <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Receitas</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Despesas</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráfico - Altura ajustada para telas pequenas */}
      <div className="h-64 sm:h-72 lg:h-80 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              className="dark:stroke-slate-400"
              fontSize={12}
              interval={window.innerWidth < 400 ? 1 : 0}
            />
            <YAxis 
              stroke="#64748b" 
              className="dark:stroke-slate-400"
              fontSize={11}
              width={window.innerWidth < 400 ? 35 : 45}
              tickFormatter={(value) => {
                if (window.innerWidth < 400) {
                  return value >= 1000 ? `${(value/1000).toFixed(0)}k` : value.toString();
                }
                return value.toLocaleString('pt-BR');
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                padding: '8px'
              }}
              labelClassName="text-slate-900 font-medium"
              formatter={(value, name) => [
                `R$ ${Number(value).toLocaleString('pt-BR')}`,
                name === 'receitas' ? 'Receitas' : 'Despesas'
              ]}
            />
            <Area 
              type="monotone" 
              dataKey="receitas" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorReceitas)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="despesas" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorDespesas)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
