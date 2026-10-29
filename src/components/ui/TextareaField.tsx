import React, { TextareaHTMLAttributes } from 'react';

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  helperText,
  error,
  id,
  rows = 3,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}) => {
  const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={textareaId}
        className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
      >
        <span>{label}</span>
        {props.required && <span className="text-indigo-600 dark:text-indigo-400 font-normal">* Requerido</span>}
      </label>

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`w-full text-xs md:text-sm px-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-xl transition-all duration-150 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
            : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500'
        } ${disabled ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

