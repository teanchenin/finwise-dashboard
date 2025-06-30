
import { ArrowUp, ArrowDown, TrendingUp, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

const financialData = [
  {
    title: "Saldo Total",
    value: "R$ 12.847,50",
    change: "+12,5%",
    isPositive: true,
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Receitas",
    value: "R$ 8.200,00",
    change: "+8,2%",
    isPositive: true,
    icon: ArrowUp,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Despesas",
    value: "R$ 3.250,00",
    change: "-5,1%",
    isPositive: false,
    icon: ArrowDown,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Cartões",
    value: "R$ 1.450,30",
    change: "+2,3%",
    isPositive: true,
    icon: CreditCard,
    gradient: "from-purple-500 to-violet-500"
  }
];

export const FinancialCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {financialData.map((card, index) => (
        <Card 
          key={index} 
          className="p-4 md:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/70 dark:border-slate-700 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                {card.title}
              </p>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mt-1 md:mt-2 truncate">
                {card.value}
              </h3>
              <div className="flex items-center mt-1 md:mt-2">
                <span className={`text-xs md:text-sm font-medium ${
                  card.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {card.change}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 md:ml-2 hidden sm:inline">
                  vs mês anterior
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg animate-pulse flex-shrink-0 ml-2`}>
              <card.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
