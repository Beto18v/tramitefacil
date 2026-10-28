import React from 'react';

export interface SwitchFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  containerClassName?: string;
  id?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  checked,
  onChange,
  description,
  disabled,
  containerClassName = '',
  id,
}) => {
  const switchId = id || `switch-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label
      htmlFor={switchId}
      className={`flex items-start justify-between gap-4 p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl cursor-pointer transition-colors ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${containerClassName}`}
    >
      <div className="flex flex-col select-none">
        <span className="text-xs font-semibold text-slate-900">{label}</span>
        {description && (
          <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">{description}</span>
        )}
      </div>

      <div className="relative inline-flex items-center shrink-0 mt-0.5">
        <input
          id={switchId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </div>
    </label>
  );
};

