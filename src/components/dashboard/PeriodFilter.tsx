
import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type PeriodType = '7d' | '30d' | '6m' | '1y' | 'all';

interface PeriodFilterProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

const periodOptions = [
  { value: '7d' as PeriodType, label: 'Últimos 7 dias', shortLabel: '7d' },
  { value: '30d' as PeriodType, label: 'Últimos 30 dias', shortLabel: '30d' },
  { value: '6m' as PeriodType, label: 'Últimos 6 meses', shortLabel: '6m' },
  { value: '1y' as PeriodType, label: 'Último ano', shortLabel: '1a' },
  { value: 'all' as PeriodType, label: 'Todo período', shortLabel: 'Todos' }
];

export const PeriodFilter = ({ selectedPeriod, onPeriodChange }: PeriodFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = periodOptions.find(option => option.value === selectedPeriod);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm border-slate-200 hover:bg-white/80 transition-all text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 h-auto"
      >
        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="hidden xs:inline sm:hidden">
          {selectedOption?.shortLabel}
        </span>
        <span className="hidden sm:inline">
          {selectedOption?.label}
        </span>
        <span className="xs:hidden">
          {selectedOption?.shortLabel}
        </span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-white rounded-lg sm:rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onPeriodChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm hover:bg-slate-50 transition-colors ${
                selectedPeriod === option.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
              }`}
            >
              <span className="sm:hidden">{option.shortLabel}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
