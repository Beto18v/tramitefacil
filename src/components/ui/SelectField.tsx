import React, { SelectHTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: (SelectOption | string)[];
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  containerClassName?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  helperText,
  error,
  leftIcon,
  id,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={selectId}
        className="text-xs font-semibold text-slate-700 flex items-center justify-between"
      >
        <span>{label}</span>
        {props.required && <span className="text-blue-600 font-normal">* Requerido</span>}
      </label>

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <select
          id={selectId}
          disabled={disabled}
          className={`w-full min-h-[44px] text-xs md:text-sm px-3.5 py-2.5 pr-10 bg-white border rounded-xl appearance-none transition-all duration-150 text-slate-900 focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer ${
            leftIcon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-400 focus:ring-rose-500/20 text-rose-900'
              : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
          } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => {
            const isString = typeof opt === 'string';
            const value = isString ? opt : opt.value;
            const text = isString ? opt : opt.label;
            return (
              <option key={String(value)} value={value}>
                {text}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center justify-center">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

