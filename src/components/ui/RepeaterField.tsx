import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface RepeaterFieldProps {
  label: string;
  items: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder?: string;
  addButtonText?: string;
  itemPrefix?: string;
  minItems?: number;
  helperText?: string;
  containerClassName?: string;
}

export const RepeaterField: React.FC<RepeaterFieldProps> = ({
  label,
  items,
  onAdd,
  onUpdate,
  onRemove,
  placeholder = 'Describe el ítem...',
  addButtonText = 'Añadir Ítem',
  itemPrefix = 'Ítem #',
  minItems = 1,
  helperText,
  containerClassName = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          {items.length} {items.length === 1 ? 'elemento' : 'elementos'}
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl transition-all focus-within:border-slate-400 dark:focus-within:border-slate-500 focus-within:bg-white dark:focus-within:bg-slate-800"
          >
            <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 pl-1 shrink-0 select-none">
              {itemPrefix}
              {index + 1}
            </span>

            <input
              type="text"
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 min-h-[36px] text-xs px-2 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
            />

            {items.length > minItems && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors shrink-0 cursor-pointer"
                title="Eliminar elemento"
                aria-label={`Eliminar elemento ${index + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/60 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addButtonText}</span>
        </button>
      </div>

      {helperText && <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
};

