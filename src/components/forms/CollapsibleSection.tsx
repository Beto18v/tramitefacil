import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  title: string;
  step?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<Props> = ({
  title,
  step,
  icon,
  subtitle,
  defaultOpen = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[48px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              {step && (
                <span className="text-[11px] font-mono font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  {step}
                </span>
              )}
              <h3 className="text-sm font-semibold text-slate-900 leading-snug tracking-tight">
                {title}
              </h3>
            </div>
            {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div
          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 pt-2 border-t border-slate-100 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
