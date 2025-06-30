
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const DashboardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-0">
      <div className="ml-12 md:ml-0">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm md:text-base">
          Bem-vindo de volta! Aqui está um resumo das suas finanças.
        </p>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 ml-12 md:ml-0">
        <div className="relative flex-1 sm:flex-none">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white text-sm"
          />
        </div>
        
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative flex-shrink-0">
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="flex-shrink-0">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
        </Button>
      </div>
    </header>
  );
};
