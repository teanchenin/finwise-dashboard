
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp } from "lucide-react";

const currentData = {
  monthlyIncome: 8200,
  monthlyExpenses: 3250,
  currentBalance: 12847.50,
  savingsRate: 0.60 // 60% da diferença entre receita e despesa vai para poupança
};

const generateProjection = () => {
  const monthlySavings = (currentData.monthlyIncome - currentData.monthlyExpenses) * currentData.savingsRate;
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return months.map((month, index) => ({
    month,
    balance: currentData.currentBalance + (monthlySavings * (index + 1)),
    savings: monthlySavings * (index + 1)
  }));
};

const projectionData = generateProjection();
const yearEndBalance = projectionData[projectionData.length - 1].balance;
const totalYearSavings = projectionData[projectionData.length - 1].savings;

export const FinancialProjection = () => {
  return (
    <Card className="p-3 sm:p-4 lg:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Projeção Financeira</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Baseada no padrão atual</p>
        </div>
        <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 self-start sm:self-auto" />
      </div>

      {/* Resumo da Projeção */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">Saldo Final 2024</span>
          </div>
          <p className="text-sm sm:text-base lg:text-xl font-bold text-green-800 dark:text-green-200 break-all">
            R$ {yearEndBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">Economia Total</span>
          </div>
          <p className="text-sm sm:text-base lg:text-xl font-bold text-blue-800 dark:text-blue-200 break-all">
            R$ {totalYearSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">Economia Mensal</span>
          </div>
          <p className="text-sm sm:text-base lg:text-xl font-bold text-purple-800 dark:text-purple-200 break-all">
            R$ {((currentData.monthlyIncome - currentData.monthlyExpenses) * currentData.savingsRate).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Gráfico de Projeção */}
      <div className="h-64 sm:h-72 lg:h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              className="dark:stroke-slate-400"
              fontSize={12}
              interval={window.innerWidth < 640 ? 1 : 0}
            />
            <YAxis 
              stroke="#64748b" 
              className="dark:stroke-slate-400"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              fontSize={12}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
              formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Saldo Projetado']}
              labelClassName="text-slate-900"
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              fill="url(#colorBalance)"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Premissas */}
      <div className="p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-2">Premissas da Projeção:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600 dark:text-slate-400">
          <div>• Receita mensal: R$ {currentData.monthlyIncome.toLocaleString('pt-BR')}</div>
          <div>• Despesas mensais: R$ {currentData.monthlyExpenses.toLocaleString('pt-BR')}</div>
          <div>• Taxa de poupança: {(currentData.savingsRate * 100).toFixed(0)}% do excedente</div>
          <div>• Não considera inflação ou variações de renda</div>
        </div>
      </div>
    </Card>
  );
};
