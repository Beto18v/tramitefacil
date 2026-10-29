import React, { useState } from 'react';
import {
  FileText,
  Scale,
  ShieldCheck,
  Lock,
  X,
  Info,
  BookOpen,
  UserCheck,
  UserCog,
  Check,
} from 'lucide-react';
import { UserProfile } from '../types/documents';

interface FooterProps {
  userProfile?: UserProfile | null;
  onOpenProfileModal?: () => void;
}

const getAbbreviatedDoc = (tipo?: string, num?: string): string => {
  if (!num) return tipo || 'Sin documento';
  return `${tipo || 'DOC'}: ${num}`;
};

export const Footer: React.FC<FooterProps> = ({ userProfile, onOpenProfileModal }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const currentYear = new Date().getFullYear();

  const legalFrameworks = [
    { code: 'Ley 1755 de 2015', name: 'Derecho de Petición' },
    { code: 'Ley 820 de 2003', name: 'Arrendamiento Urbano' },
    { code: 'Código Sustantivo del Trabajo', name: 'Laboral & Renuncias' },
    { code: 'Código de Comercio', name: 'Prestación de Servicios & NDA' },
    { code: 'Código Civil', name: 'Compraventa & Poderes' },
    { code: 'Leyes 1266/2008 & 2157/2021', name: 'Habeas Data Financiero' },
    { code: 'Ley 1581 de 2012', name: 'Protección de Datos' },
    { code: 'Ley 769 de 2002', name: 'Tránsito y Transporte' },
  ];

  return (
    <footer className="no-print mt-12 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Executive Section: Datos del Emisor y Autocompletado Local */}
        {onOpenProfileModal && (
          <div className="bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                  {userProfile?.nombreCompleto ? (
                    <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm tracking-tight">
                      Datos del Emisor y Autocompletado Local (100% Privado en tu Navegador)
                    </h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700">
                      Ley 1581 de 2012
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Tus datos fiscales, de contacto y firma se guardan exclusivamente en el almacenamiento local de tu navegador. Nunca se transmiten a servidores externos ni intermediarios.
                  </p>

                  {userProfile?.nombreCompleto ? (
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {userProfile.nombreCompleto}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl shadow-2xs">
                        {getAbbreviatedDoc(userProfile.tipoDocumento, userProfile.numeroDocumento)}
                      </span>
                      {userProfile.signatureDataUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 px-2 py-1 rounded-xl shadow-2xs">
                          <Check className="w-3.5 h-3.5" />
                          Firma lista
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
                      Configura tus datos fiscales y firma manuscrita una sola vez para autollenar cualquier contrato o minuta en 1 clic.
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 pt-2 md:pt-0">
                <button
                  type="button"
                  onClick={onOpenProfileModal}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 shadow-xs ${
                    userProfile?.nombreCompleto
                      ? 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
                  }`}
                >
                  <UserCog className="w-4 h-4" />
                  <span>
                    {userProfile?.nombreCompleto
                      ? 'Editar Datos y Firma'
                      : 'Configurar Perfil para Autollenar'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Row 1: Brand & Core Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tracking-tight">
                TrámiteFácil Hub · Documentos Legales Instantáneos para Colombia
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-2xl">
              Plataforma tecnológica orientada a la democratización y eficiencia en la redacción de contratos, cartas y trámites ciudadanos en el marco del ordenamiento jurídico colombiano.
            </p>
          </div>

          {/* Privacy statement badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Privacidad y Habeas Data</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              Procesamiento 100% privado en tu navegador (Ley 1581 de 2012). Tus datos nunca se almacenan ni transmiten a servidores externos.
            </p>
          </div>
        </div>

        {/* Row 2: Colombian Legal References */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold text-xs">
            <Scale className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Fundamentos de la Normatividad Colombiana</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {legalFrameworks.map((law) => (
              <span
                key={law.code}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-800 text-[11px]"
              >
                <span className="font-semibold text-slate-900 dark:text-slate-100">{law.code}:</span>
                <span className="text-slate-500 dark:text-slate-400">{law.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 3: Legal Disclaimer Notice Box */}
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
            <Info className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
            <span>Exención de Responsabilidad Legal (Legal Disclaimer)</span>
          </div>
          <p>
            TrámiteFácil Hub es una plataforma tecnológica de redacción y automatización documental estándar. No constituye asesoría jurídica profesional, concepto legal ni relación abogado-cliente. Para casos litigiosos o de alta complejidad, consulte a un profesional del derecho colegiado.
          </p>
        </div>

        {/* Row 4: Bottom bar with copyright and modal links */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} TrámiteFácil Hub. Desarrollado con rigor técnico para Colombia.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition cursor-pointer min-h-[36px] flex items-center"
            >
              Términos de Uso
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition cursor-pointer min-h-[36px] flex items-center"
            >
              Política de Privacidad
            </button>
          </div>
        </div>
      </div>

      {/* Modal 1: Términos de Uso */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-base">
                <BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3>Términos y Condiciones de Uso</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">1. Naturaleza Tecnológica de la Plataforma</h4>
                <p>
                  TrámiteFácil Hub es una herramienta de software autónoma diseñada para la automatización, formateo y estandarización tipográfica de minutas y documentos usuales en el tráfico civil, comercial y laboral de la República de Colombia.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">2. Ausencia de Asesoría Jurídica y Relación Abogado-Cliente</h4>
                <p>
                  El uso de las plantillas y del asistente de redacción no configura asesoría profesional de un profesional del derecho, dictamen pericial ni representación jurídica. Si su situación particular involucra controversia judicial, sumas complejas o incertidumbre legal, debe consultar con un abogado titulado y con tarjeta profesional vigente ante el Consejo Superior de la Judicatura.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">3. Responsabilidad del Usuario</h4>
                <p>
                  El usuario asume la total responsabilidad sobre la veracidad, licitud y exactitud de los datos consignados en cada formulario, así como sobre la pertinencia del documento elegido para su situación jurídica particular.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">4. Validez y Firma Digital</h4>
                <p>
                  Conforme a la Ley 527 de 1999 y el Decreto 2364 de 2012, las firmas electrónicas y manuscritas digitalizadas incorporadas en el documento gozan de valor probatorio cuando son reconocibles y atribuibles a las partes signatarias.
                </p>
              </section>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="min-h-[44px] px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Comprendido y Aceptado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Política de Privacidad y Habeas Data */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3>Política de Privacidad y Habeas Data (Ley 1581 de 2012)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">1. Principio de Cero Servidor (Local-First Architecture)</h4>
                <p>
                  TrámiteFácil Hub implementa una arquitectura estrictamente del lado del cliente. Ninguno de los datos ingresados (nombres, cédulas, teléfonos, cuentas bancarias, direcciones o firmas manuscritas) es enviado a servidores remotos, bases de datos en la nube ni servicios de telemetría de terceros.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">2. Almacenamiento Local (LocalStorage)</h4>
                <p>
                  Los datos del perfil emisor y los borradores de documentos se guardan exclusivamente en el almacenamiento local de su navegador web. El usuario tiene el control absoluto y puede eliminar sus datos en cualquier momento limpiando el caché o usando la opción de restablecer.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">3. Cumplimiento Estatutario (Ley 1581 de 2012)</h4>
                <p>
                  En cumplimiento del régimen de Protección de Datos Personales de Colombia, se garantiza el principio de libertad, veracidad, transparencia y acceso y circulación restringida. Dado que TrámiteFácil Hub no actúa como Responsable ni Encargado de bases de datos centralizadas, el titular de la información mantiene la posesión directa e indelegable de sus datos en su dispositivo.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">4. Generación Segura de PDF y Word</h4>
                <p>
                  La conversión a PDF y Word se ejecuta íntegramente en la memoria RAM del navegador, descargando el archivo resultante directamente a la carpeta de descargas del usuario sin intermediación de servidores externos.
                </p>
              </section>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="min-h-[44px] px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
