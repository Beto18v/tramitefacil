import React, { ChangeEvent, useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { formatearMoneda } from '../../utils/numberToWords';

export interface CurrencyFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  containerClassName?: string;
  id?: string;
}

export const CurrencyField: React.FC<CurrencyFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  error,
  required,
  disabled,
  placeholder = '0',
  containerClassName = '',
  id,
}) => {
  const fieldId = id || `currency-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const [displayValue, setDisplayValue] = useState<string>(() => (value ? String(value) : ''));

  useEffect(() => {
    setDisplayValue(value ? String(value) : '');
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setDisplayValue(raw);
    onChange(num);
  };

  const formattedDisplay = value ? formatearMoneda(value) : '';

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={fieldId}
        className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
      >
        <span>{label}</span>
        {required && <span className="text-indigo-600 dark:text-indigo-400 font-normal">* Requerido</span>}
      </label>

      <div className="relative flex items-center">
        <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center font-bold text-xs">
          <DollarSign className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </div>

        <input
          id={fieldId}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full min-h-[44px] text-xs md:text-sm pl-9 pr-24 py-2.5 bg-white dark:bg-slate-800 border rounded-xl font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:border-transparent ${
            error
              ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
              : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500'
          } ${disabled ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-500 dark:text-slate-500 cursor-not-allowed' : ''}`}
        />

        <div className="absolute right-3 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 pointer-events-none bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
          COP
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        {error ? (
          <p className="text-rose-600 dark:text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : (
          <span />
        )}
        {formattedDisplay && (
          <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
            {formattedDisplay}
          </span>
        )}
      </div>
    </div>
  );
};

