
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FinancialCards } from "@/components/dashboard/FinancialCards";
import { TransactionChart } from "@/components/dashboard/TransactionChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialHealth } from "@/components/dashboard/FinancialHealth";
import { MonthlySummary } from "@/components/dashboard/MonthlySummary";
import { FinancialProjection } from "@/components/dashboard/FinancialProjection";
import { Sidebar } from "@/components/layout/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 md:ml-64 min-h-screen">
          <DashboardHeader />
          <div className="grid gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:mt-6">
            <FinancialCards />
            
            {/* Primeira linha - Gráficos principais */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <TransactionChart />
              <RecentTransactions />
            </div>

            {/* Segunda linha - Saúde Financeira e Resumo */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <FinancialHealth />
              <MonthlySummary />
            </div>

            {/* Terceira linha - Projeção Financeira */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
              <FinancialProjection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
