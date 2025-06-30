
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  User,
  PieChart,
  X,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CreditCard, label: "Transações", active: false },
  { icon: PieChart, label: "Categorias", active: false },
  { icon: TrendingUp, label: "Investimentos", active: false },
  { icon: User, label: "Perfil", active: false },
  { icon: Settings, label: "Configurações", active: false },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-xl shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white/90 backdrop-blur-xl border-r border-slate-200 dark:bg-slate-900/90 dark:border-slate-700 transition-all duration-300 z-40",
        // Desktop behavior
        "md:translate-x-0",
        collapsed && !isMobile ? "md:w-16" : "md:w-64",
        // Mobile behavior
        isMobile ? (mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : ""
      )}>
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              {(!collapsed || isMobile) && (
                <div>
                  <h1 className="font-bold text-lg md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FinWise AI
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Inteligência Financeira</p>
                </div>
              )}
            </div>
            
            {/* Close button for mobile */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                className="md:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        <nav className="px-3 md:px-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-2 transition-all duration-200 group",
                item.active 
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 shadow-sm" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0",
                item.active && "text-blue-600"
              )} />
              {(!collapsed || isMobile) && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse button for desktop */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
};
