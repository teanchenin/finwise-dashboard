
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, Lightbulb } from "lucide-react";

const monthlyData = {
  saved: 4950,
  savingGoal: 5000,
  topExpenseCategory: { name: 'Alimentação', amount: 1200, increase: 15 },
  insights: [
    "Seus gastos com alimentação aumentaram 15% este mês",
    "Você está 50 reais abaixo da sua meta de economia",
    "Transporte foi sua segunda maior despesa"
  ],
  suggestions: [
    "Considere cozinhar mais em casa para reduzir gastos com alimentação",
    "Use transporte público ou carona para economizar",
    "Revise assinaturas de streaming que não usa"
  ]
};

export const MonthlySummary = () => {
  const savingProgress = (monthlyData.saved / monthlyData.savingGoal) * 100;
  const isGoalMet = monthlyData.saved >= monthlyData.savingGoal;

  return (
    <Card className="p-3 sm:p-4 lg:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Resumo Mensal</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Janeiro 2024</p>
        </div>
        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 self-start sm:self-auto" />
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Meta de Economia */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Meta de Economia</span>
            <span className={`text-xs sm:text-sm font-semibold ${isGoalMet ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {savingProgress.toFixed(1)}%
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              R$ {monthlyData.saved.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              de R$ {monthlyData.savingGoal.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isGoalMet ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(savingProgress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Maior Gasto */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Maior Gasto</p>
              <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white truncate">{monthlyData.topExpenseCategory.name}</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                R$ {monthlyData.topExpenseCategory.amount.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 ml-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">+{monthlyData.topExpenseCategory.increase}%</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-2 sm:space-y-3">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            Insights do Mês
          </h4>
          <div className="space-y-2">
            {monthlyData.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 p-2 sm:p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sugestões */}
        <div className="space-y-2 sm:space-y-3">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            Sugestões de Economia
          </h4>
          <div className="space-y-2">
            {monthlyData.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 p-2 sm:p-3 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
