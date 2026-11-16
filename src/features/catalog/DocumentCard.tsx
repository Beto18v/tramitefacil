import React from 'react';
import {
  CATEGORIES_CONFIG,
  DocumentMeta,
  DocumentType,
} from '../../types/documents';
import { ArrowRight, Clock } from 'lucide-react';
import { resolveIcon } from './documentIcons';

interface Props {
  document: DocumentMeta;
  onSelect: (id: DocumentType) => void;
}

export const DocumentCard: React.FC<Props> = ({ document, onSelect }) => {
  const sector = CATEGORIES_CONFIG.find((c) => c.id === document.category);
  const Icon = resolveIcon(document.iconName || document.categoryIcon);
  const featuredTags = document.featuredTags?.slice(0, 3) ?? [];

  return (
    <div
      onClick={() => onSelect(document.id)}
      className="group bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xs hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div className="space-y-4">
        {/* Top bar: Icon badge + Time badge */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
              sector
                ? `${sector.colorTheme.bg} ${sector.colorTheme.text} ${sector.colorTheme.border}`
                : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60'
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
            <span className="tabular-nums">{document.estimatedMinutes || '2 min'}</span>
          </span>
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors leading-snug tracking-tight">
            {document.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {document.description}
          </p>
        </div>

        {/* Featured tags */}
        {featuredTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {featuredTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Legal validity badge */}
        <div className="pt-1">
          <span className="inline-block text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/80 px-2 py-0.5 rounded-md truncate max-w-full">
            {document.lawReference}
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 font-medium truncate">
          {document.subfilter || sector?.name || document.categoryName}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(document.id);
          }}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors cursor-pointer shrink-0"
        >
          <span>Diligenciar trámite</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
};
