import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types/documents';
import { defaultUserProfile, saveUserProfile } from '../../utils/profileInjector';
import {
  ShieldCheck,
  X,
  CreditCard,
  Check,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  onApplyToCurrentDoc?: () => void;
}

export const UserProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  onApplyToCurrentDoc,
}) => {
  const [profile, setProfile] = useState<UserProfile>(currentProfile || defaultUserProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentProfile) {
      setProfile(currentProfile);
    }
  }, [currentProfile]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 my-8 text-white">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-[11px] font-semibold border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
              Almacenamiento 100% Privado en tu Navegador
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Perfil del Emisor / Firmante
            </h3>
            <p className="text-xs text-slate-400">
              Guarda tus datos personales una sola vez para autocompletar automáticamente cualquier trámite o contrato.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-800 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Section Header */}
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Datos personales y de identificación
            </span>
          </div>

          {/* Nombre y Profesión */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombre Completo o Razón Social *
              </label>
              <input
                type="text"
                required
                value={profile.nombreCompleto}
                onChange={(e) => handleChange('nombreCompleto', e.target.value)}
                placeholder="Ej. Juan Andrés Pérez Gómez"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cargo, Oficio o Profesión
              </label>
              <input
                type="text"
                value={profile.cargoOProfesion}
                onChange={(e) => handleChange('cargoOProfesion', e.target.value)}
                placeholder="Ej. Diseñador Gráfico / Ingeniero"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Documento y Expedición */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tipo de Documento
              </label>
              <select
                value={profile.tipoDocumento}
                onChange={(e) => handleChange('tipoDocumento', e.target.value)}
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none font-medium"
              >
                <option value="Cédula de Ciudadanía">C.C. (Cédula de Ciudadanía)</option>
                <option value="NIT">NIT (Número Tributario)</option>
                <option value="Cédula de Extranjería">C.E. (Cédula de Extranjería)</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Permiso por Protección Temporal">PPT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                value={profile.numeroDocumento}
                onChange={(e) => handleChange('numeroDocumento', e.target.value)}
                placeholder="Ej. 1.032.456.789"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lugar de Expedición
              </label>
              <input
                type="text"
                value={profile.expedicionDocumento}
                onChange={(e) => handleChange('expedicionDocumento', e.target.value)}
                placeholder="Ej. Medellín"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Contacto: Ciudad, Teléfono, Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ciudad de Residencia
              </label>
              <input
                type="text"
                value={profile.ciudad}
                onChange={(e) => handleChange('ciudad', e.target.value)}
                placeholder="Ej. Cali"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                value={profile.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                placeholder="Ej. +57 300 123 4567"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={profile.correo}
                onChange={(e) => handleChange('correo', e.target.value)}
                placeholder="Ej. correo@ejemplo.com"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Dirección física */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Dirección de Notificación / Domicilio
            </label>
            <input
              type="text"
              value={profile.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
              placeholder="Ej. Calle 45 # 12-34, Apto 502"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* Datos Bancarios (opcional para cuentas de cobro y propuestas) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              Datos Bancarios (Opcional - para cuentas de cobro)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Entidad Bancaria
                </label>
                <input
                  type="text"
                  value={profile.banco}
                  onChange={(e) => handleChange('banco', e.target.value)}
                  placeholder="Ej. Bancolombia / Davivienda / Nequi"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tipo de Cuenta
                </label>
                <select
                  value={profile.tipoCuenta}
                  onChange={(e) => handleChange('tipoCuenta', e.target.value as 'Ahorros' | 'Corriente')}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none font-medium"
                >
                  <option value="Ahorros">Cuenta de Ahorros</option>
                  <option value="Corriente">Cuenta Corriente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  value={profile.numeroCuenta}
                  onChange={(e) => handleChange('numeroCuenta', e.target.value)}
                  placeholder="Ej. 1234567890"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              Cancelar
            </button>

            <div className="flex items-center gap-2">
              {onApplyToCurrentDoc && (
                <button
                  type="button"
                  onClick={() => {
                    saveUserProfile(profile);
                    onSaveProfile(profile);
                    onApplyToCurrentDoc();
                    onClose();
                  }}
                  className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl transition border border-emerald-200 dark:border-emerald-800 cursor-pointer"
                >
                  Guardar y autocompletar ahora
                </button>
              )}

              <button
                type="submit"
                className="min-h-[44px] px-6 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" strokeWidth={2} />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <span>Guardar Perfil</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
