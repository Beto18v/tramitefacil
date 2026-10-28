import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/documents';
import { defaultUserProfile, saveUserProfile } from '../utils/profileInjector';
import {
  ShieldCheck,
  X,
  Sparkles,
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

  const handleLoadDemoProfile = () => {
    const demo: UserProfile = {
      nombreCompleto: 'Carlos Eduardo Ramírez Salazar',
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: '1.025.889.340',
      expedicionDocumento: 'Bogotá D.C.',
      ciudad: 'Bogotá D.C.',
      telefono: '+57 312 456 7890',
      correo: 'carlos.ramirez.dev@email.com',
      direccion: 'Carrera 15 # 93-45, Of. 402',
      cargoOProfesion: 'Consultor de Software y Soluciones Web',
      banco: 'Bancolombia',
      tipoCuenta: 'Ahorros',
      numeroCuenta: '031-987654-21',
    };
    setProfile(demo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Header (Modo Claro Fintech) */}
        <div className="bg-white text-slate-900 p-5 sm:p-6 flex items-start justify-between border-b border-slate-200/90">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Almacenamiento 100% Local (tramitefacil_profile_v1)
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Perfil del Emisor / Firmante
            </h3>
            <p className="text-xs text-slate-600">
              Guarda tus datos personales una sola vez para autocompletar automáticamente cualquier trámite o contrato.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Quick Demo fill button */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-medium text-slate-500">Datos personales y tributarios</span>
            <button
              type="button"
              onClick={handleLoadDemoProfile}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium py-1 px-2 rounded-lg hover:bg-blue-50 transition min-h-[36px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Rellenar con datos de prueba
            </button>
          </div>

          {/* Nombre y Profesión */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre Completo o Razón Social *
              </label>
              <input
                type="text"
                required
                value={profile.nombreCompleto}
                onChange={(e) => handleChange('nombreCompleto', e.target.value)}
                placeholder="Ej. Juan Andrés Pérez Gómez"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cargo, Oficio o Profesión
              </label>
              <input
                type="text"
                value={profile.cargoOProfesion}
                onChange={(e) => handleChange('cargoOProfesion', e.target.value)}
                placeholder="Ej. Diseñador Gráfico / Ingeniero"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Documento y Expedición */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Documento
              </label>
              <select
                value={profile.tipoDocumento}
                onChange={(e) => handleChange('tipoDocumento', e.target.value)}
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium text-slate-800"
              >
                <option value="Cédula de Ciudadanía">C.C. (Cédula de Ciudadanía)</option>
                <option value="NIT">NIT (Número Tributario)</option>
                <option value="Cédula de Extranjería">C.E. (Cédula de Extranjería)</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Permiso por Protección Temporal">PPT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                value={profile.numeroDocumento}
                onChange={(e) => handleChange('numeroDocumento', e.target.value)}
                placeholder="Ej. 1.032.456.789"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lugar de Expedición
              </label>
              <input
                type="text"
                value={profile.expedicionDocumento}
                onChange={(e) => handleChange('expedicionDocumento', e.target.value)}
                placeholder="Ej. Medellín"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Contacto: Ciudad, Teléfono, Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ciudad de Residencia
              </label>
              <input
                type="text"
                value={profile.ciudad}
                onChange={(e) => handleChange('ciudad', e.target.value)}
                placeholder="Ej. Cali"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                value={profile.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                placeholder="Ej. +57 300 123 4567"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={profile.correo}
                onChange={(e) => handleChange('correo', e.target.value)}
                placeholder="Ej. correo@ejemplo.com"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Dirección física */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dirección de Notificación / Domicilio
            </label>
            <input
              type="text"
              value={profile.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
              placeholder="Ej. Calle 45 # 12-34, Apto 502"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Datos Bancarios (opcional para cuentas de cobro y propuestas) */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              Datos Bancarios (Opcional - para cuentas de cobro)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Entidad Bancaria
                </label>
                <input
                  type="text"
                  value={profile.banco}
                  onChange={(e) => handleChange('banco', e.target.value)}
                  placeholder="Ej. Bancolombia / Davivienda / Nequi"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo de Cuenta
                </label>
                <select
                  value={profile.tipoCuenta}
                  onChange={(e) => handleChange('tipoCuenta', e.target.value as 'Ahorros' | 'Corriente')}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Ahorros">Cuenta de Ahorros</option>
                  <option value="Corriente">Cuenta Corriente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  value={profile.numeroCuenta}
                  onChange={(e) => handleChange('numeroCuenta', e.target.value)}
                  placeholder="Ej. 1234567890"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
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
                  className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200 cursor-pointer"
                >
                  Guardar y Autollenar ahora
                </button>
              )}

              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
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
