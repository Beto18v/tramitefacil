import React from 'react';
import { DocumentStyleConfig } from '../../types/documents';

export type LegalDocumentDensity = 'standard' | 'dense' | 'comfortable';

export interface BannerHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  dateCity?: React.ReactNode;
  extraInfo?: React.ReactNode;
  align?: 'left' | 'center';
}

export interface LetterRecipientProps {
  greeting?: string;
  name: React.ReactNode;
  attention?: React.ReactNode;
  role?: React.ReactNode;
  department?: React.ReactNode;
  idNumber?: React.ReactNode;
  address?: React.ReactNode;
  city?: React.ReactNode;
  email?: React.ReactNode;
  extra?: React.ReactNode;
}

export interface LetterHeaderProps {
  cityAndDate?: React.ReactNode;
  recipient?: React.ReactNode | LetterRecipientProps;
  subject?: React.ReactNode;
  reference?: React.ReactNode;
  subjectStyle?: 'underline' | 'boxed';
}

export interface LegalDocumentShellProps {
  styleConfig: DocumentStyleConfig;
  headerType?: 'banner' | 'letter' | 'custom' | 'none';
  banner?: BannerHeaderProps;
  letter?: LetterHeaderProps;
  customHeader?: React.ReactNode;
  // Shorthand props for banner
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  dateCity?: React.ReactNode;
  extraHeaderInfo?: React.ReactNode;
  // Shorthand props for letter
  cityAndDate?: React.ReactNode;
  recipient?: React.ReactNode | LetterRecipientProps;
  subject?: React.ReactNode;
  reference?: React.ReactNode;
  subjectStyle?: 'underline' | 'boxed';
  // Slots
  signatures?: React.ReactNode;
  children: React.ReactNode;
  // Styling options
  className?: string;
  contentClassName?: string;
  density?: LegalDocumentDensity;
  watermarkText?: string;
}

/**
 * Resolves font family CSS class from user's DocumentStyleConfig.
 */
export function getLegalDocumentFontClass(fontFamily?: 'serif' | 'sans'): string {
  return fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
}

/**
 * Resolves font size & line height CSS classes based on user's DocumentStyleConfig
 * and layout density.
 */
export function getLegalDocumentSizeClass(
  fontSize?: 'compact' | 'normal' | 'spacious',
  density: LegalDocumentDensity = 'standard'
): string {
  if (density === 'dense') {
    return fontSize === 'compact'
      ? 'text-[11px] sm:text-[11.5px] leading-relaxed'
      : fontSize === 'spacious'
      ? 'text-[13.5px] sm:text-[14px] leading-relaxed'
      : 'text-[12px] sm:text-[12.5px] leading-relaxed';
  }
  if (density === 'comfortable') {
    return fontSize === 'compact'
      ? 'text-[12.5px] leading-relaxed'
      : fontSize === 'spacious'
      ? 'text-[15px] leading-loose'
      : 'text-[13.5px] leading-relaxed';
  }
  return fontSize === 'compact'
    ? 'text-[12px] sm:text-[12.5px] leading-relaxed'
    : fontSize === 'spacious'
    ? 'text-[14.5px] sm:text-[15px] leading-relaxed'
    : 'text-[13px] sm:text-[13.5px] leading-relaxed';
}

/**
 * Central shell component for Colombian legal and formal documents.
 * Standardizes:
 * - Print sheet container styling and dimensions.
 * - Font family and size resolution from DocumentStyleConfig.
 * - Anti-collision header wrapping and responsive layout.
 * - Discrete bottom-right watermark footer.
 * - Signatures slot at the bottom of the page.
 */
export const LegalDocumentShell: React.FC<LegalDocumentShellProps> = ({
  styleConfig,
  headerType,
  banner,
  letter,
  customHeader,
  title,
  subtitle,
  badge,
  dateCity,
  extraHeaderInfo,
  cityAndDate,
  recipient,
  subject,
  reference,
  subjectStyle = 'underline',
  signatures,
  children,
  className = '',
  contentClassName = 'space-y-5',
  density = 'standard',
  watermarkText = 'TrámiteFácil Hub · Documento Privado',
}) => {
  const fontClass = getLegalDocumentFontClass(styleConfig.fontFamily);
  const sizeClass = getLegalDocumentSizeClass(styleConfig.fontSize, density);

  // Determine effective header configuration
  const effectiveBanner: BannerHeaderProps | undefined = banner || (
    (title || badge || dateCity || extraHeaderInfo)
      ? {
          title,
          subtitle,
          badge,
          dateCity,
          extraInfo: extraHeaderInfo,
        }
      : undefined
  );

  const effectiveLetter: LetterHeaderProps | undefined = letter || (
    (cityAndDate || recipient || subject || reference)
      ? {
          cityAndDate,
          recipient,
          subject,
          reference,
          subjectStyle,
        }
      : undefined
  );

  const resolvedHeaderType =
    headerType ||
    (customHeader ? 'custom' : effectiveBanner ? 'banner' : effectiveLetter ? 'letter' : 'none');

  const renderHeader = () => {
    if (resolvedHeaderType === 'custom' || customHeader) {
      return customHeader;
    }

    if (resolvedHeaderType === 'banner' && effectiveBanner) {
      const isCenter = effectiveBanner.align === 'center';

      if (isCenter) {
        return (
          <div className="mb-4">
            <div className="border-b-2 border-slate-900 pb-3 mb-3 text-center">
              <h1 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-slate-950 leading-tight">
                {effectiveBanner.title}
              </h1>
              {effectiveBanner.subtitle && (
                <p className="text-[10.5px] sm:text-[11px] text-slate-600 uppercase tracking-widest mt-1">
                  {effectiveBanner.subtitle}
                </p>
              )}
            </div>
            {(effectiveBanner.dateCity || effectiveBanner.extraInfo || effectiveBanner.badge) && (
              <div className="flex justify-between items-center text-xs text-slate-600">
                {effectiveBanner.badge ? <div>{effectiveBanner.badge}</div> : <div />}
                <div className="text-right shrink-0">
                  {effectiveBanner.dateCity && (
                    <p className="whitespace-nowrap font-medium text-slate-700">
                      {effectiveBanner.dateCity}
                    </p>
                  )}
                  {effectiveBanner.extraInfo && (
                    <p className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">
                      {effectiveBanner.extraInfo}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-950 leading-tight">
              {effectiveBanner.title}
            </h1>
            {effectiveBanner.subtitle && (
              <p className="text-xs text-slate-600 mt-1 leading-normal">
                {effectiveBanner.subtitle}
              </p>
            )}
          </div>
          {(effectiveBanner.badge || effectiveBanner.dateCity || effectiveBanner.extraInfo) && (
            <div className="text-right shrink-0">
              {effectiveBanner.badge && (
                <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 font-mono text-sm font-semibold text-slate-900 whitespace-nowrap mb-1">
                  {effectiveBanner.badge}
                </div>
              )}
              {effectiveBanner.dateCity && (
                <p className="text-xs text-slate-600 font-semibold whitespace-nowrap">
                  {effectiveBanner.dateCity}
                </p>
              )}
              {effectiveBanner.extraInfo && (
                <p className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">
                  {effectiveBanner.extraInfo}
                </p>
              )}
            </div>
          )}
        </div>
      );
    }

    if (resolvedHeaderType === 'letter' && effectiveLetter) {
      const rec = effectiveLetter.recipient;
      const isStructuredRecipient =
        typeof rec === 'object' && rec !== null && 'name' in (rec as any) && !React.isValidElement(rec);

      return (
        <div className="space-y-4 mb-4">
          {effectiveLetter.cityAndDate && (
            <div className="text-right text-xs md:text-sm text-slate-700">
              <p className="whitespace-nowrap">{effectiveLetter.cityAndDate}</p>
            </div>
          )}

          {rec && (
            isStructuredRecipient ? (
              <div className="space-y-1 text-xs md:text-sm min-w-0">
                {(rec as LetterRecipientProps).greeting && (
                  <p className="font-semibold text-slate-900 leading-tight">
                    {(rec as LetterRecipientProps).greeting}
                  </p>
                )}
                <p className="font-bold text-slate-950 uppercase text-sm md:text-base leading-tight">
                  {(rec as LetterRecipientProps).name}
                </p>
                {(rec as LetterRecipientProps).attention && (
                  <p className="text-slate-800">
                    Atención: <strong>{(rec as LetterRecipientProps).attention}</strong>
                  </p>
                )}
                {(rec as LetterRecipientProps).role && (
                  <p className="text-slate-600">{(rec as LetterRecipientProps).role}</p>
                )}
                {(rec as LetterRecipientProps).department && (
                  <p className="text-slate-500">{(rec as LetterRecipientProps).department}</p>
                )}
                {(rec as LetterRecipientProps).idNumber && (
                  <p className="text-slate-700">{(rec as LetterRecipientProps).idNumber}</p>
                )}
                {(rec as LetterRecipientProps).address && (
                  <p className="text-slate-600">Dirección: {(rec as LetterRecipientProps).address}</p>
                )}
                {(rec as LetterRecipientProps).city && (
                  <p className="text-slate-600">{(rec as LetterRecipientProps).city}</p>
                )}
                {(rec as LetterRecipientProps).email && (
                  <p className="text-slate-600">Email: {(rec as LetterRecipientProps).email}</p>
                )}
                {(rec as LetterRecipientProps).extra}
              </div>
            ) : (
              <div className="min-w-0">{rec as React.ReactNode}</div>
            )
          )}

          {effectiveLetter.subject && (
            effectiveLetter.subjectStyle === 'boxed' ? (
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 my-2">
                <p className="font-bold text-slate-950 text-xs md:text-sm uppercase leading-tight">
                  ASUNTO:{' '}
                  <span className="font-semibold normal-case text-slate-900">
                    {effectiveLetter.subject}
                  </span>
                </p>
                {effectiveLetter.reference && (
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    <strong>Referencia / Trámite:</strong> {effectiveLetter.reference}
                  </p>
                )}
              </div>
            ) : (
              <div className="border-b-2 border-slate-900 pb-2">
                <p className="font-bold text-slate-950 text-xs md:text-sm uppercase leading-tight">
                  ASUNTO:{' '}
                  <span className="font-semibold normal-case text-slate-900">
                    {effectiveLetter.subject}
                  </span>
                </p>
                {effectiveLetter.reference && (
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    <strong>Referencia:</strong> {effectiveLetter.reference}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`${fontClass} ${sizeClass} bg-white text-slate-900 p-6 sm:p-10 md:p-12 pb-16 md:pb-20 min-h-[980px] flex flex-col justify-between ${className}`}
    >
      <div className={contentClassName}>
        {renderHeader()}
        {children}
      </div>

      {(signatures || styleConfig.includeWatermark !== false) && (
        <div className="mt-8">
          {signatures}
          {styleConfig.includeWatermark !== false && (
            <div className="text-right pt-3 mt-2">
              <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase select-none">
                {watermarkText}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
