import React from 'react';
import { DocumentoFormalData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<DocumentoFormalData>> = ({
  data,
  styleConfig,
}) => {
  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      headerType="letter"
      letter={{
        cityAndDate: data.cityAndDate || 'Colombia',
        recipient: (
          <div className="space-y-0.5 text-xs md:text-sm">
            <p className="font-bold text-slate-900 uppercase">Señores:</p>
            <p className="font-bold text-slate-950 text-sm md:text-base uppercase">
              {data.recipient?.name || 'A QUIEN CORRESPONDA'}
            </p>
            {data.recipient?.titleOrCompany && (
              <p className="text-slate-700 font-medium">{data.recipient.titleOrCompany}</p>
            )}
            {data.recipient?.address && (
              <p className="text-slate-600">{data.recipient.address}</p>
            )}
          </div>
        ),
        subject: data.subject || 'COMUNICACIÓN Y SOLICITUD FORMAL',
      }}
      signatures={
        <div className="pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-6">{data.closing || 'Atentamente,'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(data.signatures && data.signatures.length > 0
              ? data.signatures
              : [
                  {
                    role: 'SOLICITANTE',
                    name: 'Nombre de quien firma',
                    idNumber: 'C.C. No. ________________',
                    phone: '',
                    email: '',
                  },
                ]
            ).map((sig, idx) => (
              <div key={idx} className="space-y-1">
                <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
                <p className="font-bold text-slate-950 uppercase text-xs">
                  {sig.name || 'FIRMA'}
                </p>
                {sig.idNumber && (
                  <p className="text-[11px] text-slate-700 font-mono">{sig.idNumber}</p>
                )}
                {sig.role && (
                  <p className="text-[11px] text-emerald-800 font-semibold">{sig.role}</p>
                )}
                {sig.phone && <p className="text-[11px] text-slate-600">Tel: {sig.phone}</p>}
                {sig.email && <p className="text-[11px] text-slate-600">{sig.email}</p>}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Saludo inicial */}
        <p className="font-semibold text-slate-900 text-xs md:text-sm">
          {data.openingGreeting || 'Respetado(a) señor(a):'}
        </p>

        {/* Hechos y Antecedentes */}
        {data.facts && data.facts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
              I. Hechos y Antecedentes
            </h4>
            <div className="space-y-2 text-justify text-slate-800 text-xs md:text-sm leading-relaxed">
              {data.facts.map((fact, idx) => (
                <p key={idx}>{fact}</p>
              ))}
            </div>
          </div>
        )}

        {/* Fundamentos de Derecho */}
        {data.legalBasis && data.legalBasis.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
              II. Fundamentos Jurídicos y Normativos
            </h4>
            <div className="space-y-1.5 text-justify text-slate-800 text-xs md:text-sm leading-relaxed">
              {data.legalBasis.map((law, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700 shrink-0">•</span>
                  <p>{law}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Peticiones / Solicitudes */}
        {data.petitions && data.petitions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
              III. Peticiones Concretas
            </h4>
            <div className="space-y-2 text-justify text-slate-800 text-xs md:text-sm leading-relaxed">
              {data.petitions.map((pet, idx) => (
                <p key={idx}>{pet}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};

