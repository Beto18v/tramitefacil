import React, { InputHTMLAttributes, ReactNode } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  id,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={inputId}
        className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
      >
        <span>{label}</span>
        {props.required && <span className="text-indigo-600 dark:text-indigo-400 font-normal">* Requerido</span>}
      </label>

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`w-full min-h-[44px] text-xs md:text-sm px-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-xl transition-all duration-150 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            error
              ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
              : 'border-slate-300 dark:border-slate-700 focus:ring-slate-900/10 dark:focus:ring-indigo-500/20 focus:border-slate-800 dark:focus:border-indigo-500'
          } ${disabled ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed' : ''} ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

