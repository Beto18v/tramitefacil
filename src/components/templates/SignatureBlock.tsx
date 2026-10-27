import React from 'react';

interface Props {
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
  name?: string;
  docType?: string;
  docNumber?: string;
  expedition?: string;
  phone?: string;
  email?: string;
  address?: string;
  role?: string;
  label?: string;
  widthClass?: string;
}

export const SignatureBlock: React.FC<Props> = ({
  signatureType = 'text',
  signatureDataUrl,
  name,
  docType = 'C.C.',
  docNumber,
  expedition,
  phone,
  email,
  address,
  role,
  label = 'Atentamente,',
  widthClass = 'w-72',
}) => {
  const isDrawn = signatureType === 'draw' && Boolean(signatureDataUrl);

  return (
    <div className={widthClass}>
      {label && <p className="text-xs text-slate-500 mb-2">{label}</p>}

      {/* Signature image or spacing */}
      <div className="h-14 flex items-end">
        {isDrawn ? (
          <img
            src={signatureDataUrl}
            alt="Firma"
            className="h-14 max-w-[220px] object-contain mb-0.5"
          />
        ) : (
          <div className="h-8" />
        )}
      </div>

      <div className="border-b-2 border-slate-900 mb-2" />

      {name && (
        <p className="font-bold text-slate-900 uppercase text-xs md:text-sm tracking-tight leading-tight">
          {name}
        </p>
      )}

      {role && (
        <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
          {role}
        </p>
      )}

      {docNumber && (
        <p className="text-xs text-slate-700">
          {docType}: <span className="font-mono">{docNumber}</span>
          {expedition ? ` de ${expedition}` : ''}
        </p>
      )}

      {phone && <p className="text-xs text-slate-600">Tel: {phone}</p>}
      {email && <p className="text-xs text-slate-600">Email: {email}</p>}
      {address && <p className="text-xs text-slate-600">Dirección: {address}</p>}
    </div>
  );
};
