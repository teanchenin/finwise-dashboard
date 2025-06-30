
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Salário - Empresa XYZ",
    amount: 5200.00,
    type: "receita",
    category: "Salário",
    date: "2024-01-15",
  },
  {
    id: 2,
    description: "Supermercado Extra",
    amount: -320.50,
    type: "despesa",
    category: "Alimentação",
    date: "2024-01-14",
  },
  {
    id: 3,
    description: "Freelance Design",
    amount: 1200.00,
    type: "receita",
    category: "Freelance",
    date: "2024-01-13",
  },
  {
    id: 4,
    description: "Conta de Luz",
    amount: -180.30,
    type: "despesa",
    category: "Contas",
    date: "2024-01-12",
  },
  {
    id: 5,
    description: "Uber",
    amount: -25.50,
    type: "despesa",
    category: "Transporte",
    date: "2024-01-11",
  },
];

const categoryColors: Record<string, string> = {
  "Salário": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "Freelance": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Alimentação": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Contas": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  "Transporte": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

export const RecentTransactions = () => {
  return (
    <Card className="p-4 md:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
            Transações Recentes
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Últimas movimentações da sua conta
          </p>
        </div>
        <button className="text-xs md:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors self-start sm:self-auto">
          Ver todas
        </button>
      </div>

      <div className="space-y-3 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id} 
            className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-700/30 dark:hover:bg-slate-700/50 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                transaction.type === 'receita' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {transaction.type === 'receita' ? (
                  <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white text-sm md:text-base truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge className={`${categoryColors[transaction.category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"} text-xs`}>
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {transaction.date}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0 ml-2">
              <p className={`font-semibold text-sm md:text-base ${
                transaction.type === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'receita' ? '+' : ''}
                R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
