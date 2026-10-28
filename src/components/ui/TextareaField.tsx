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
        className="text-xs font-semibold text-slate-700 flex items-center justify-between"
      >
        <span>{label}</span>
        {props.required && <span className="text-blue-600 font-normal">* Requerido</span>}
      </label>

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`w-full text-xs md:text-sm px-3.5 py-2.5 bg-white border rounded-xl transition-all duration-150 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? 'border-rose-400 focus:ring-rose-500/20 text-rose-900'
            : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
        } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

