import React from 'react';
import { PagareInstruccionesData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import {
  CollapsibleSection,
  InputField,
  SelectField,
  CurrencyField,
  SwitchField,
  TextareaField,
} from '../../../components/ui';
import { SignaturePad } from '../../../components/shared/SignaturePad';
import { numeroALetras } from '../../../utils/numberToWords';
import {
  Receipt,
  User,
  Users,
  DollarSign,
  FileText,
  ShieldCheck,
  Fingerprint,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<PagareInstruccionesData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof PagareInstruccionesData>(
    key: K,
    val: PagareInstruccionesData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const handleCapitalChange = (valor: number) => {
    onChange({
      ...data,
      capital: valor,
      capitalLetras: numeroALetras(valor),
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Datos Generales del Pagaré */}
      <CollapsibleSection
        title="Datos del Pagaré"
        icon={<Receipt className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Número del Pagaré"
            value={data.numeroPagare}
            onChange={(e) => update('numeroPagare', e.target.value)}
            placeholder="Ej. PG-001"
          />
          <InputField
            label="Ciudad de suscripción"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha de suscripción"
            type="date"
            value={data.fechaSuscripcion}
            onChange={(e) => update('fechaSuscripcion', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Forma de vencimiento"
            value={data.tipoVencimiento}
            onChange={(e) =>
              update(
                'tipoVencimiento',
                e.target.value as PagareInstruccionesData['tipoVencimiento']
              )
            }
            options={[
              { value: 'fecha_fija', label: 'A día fijo (Fecha específica)' },
              { value: 'a_la_vista', label: 'A la vista (Exigible a su presentación)' },
              {
                value: 'segun_instrucciones',
                label: 'Conforme a Carta de Instrucciones adjunta',
              },
            ]}
          />
          {data.tipoVencimiento === 'fecha_fija' && (
            <InputField
              label="Fecha de vencimiento"
              type="date"
              value={data.fechaVencimiento}
              onChange={(e) => update('fechaVencimiento', e.target.value)}
            />
          )}
        </div>
      </CollapsibleSection>

      {/* 2. Acreedor / Tenedor del Título */}
      <CollapsibleSection
        title="Acreedor (Quién presta o recibe el dinero)"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Nombre o Razón Social del Acreedor"
              value={data.nombreAcreedor}
              onChange={(e) => update('nombreAcreedor', e.target.value)}
              placeholder="Ej. Inversiones Andinas S.A.S. o Juan Pérez"
            />
          </div>
          <InputField
            label="Ciudad del Acreedor"
            value={data.ciudadAcreedor}
            onChange={(e) => update('ciudadAcreedor', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Tipo de documento"
            value={data.tipoDocAcreedor}
            onChange={(e) => update('tipoDocAcreedor', e.target.value)}
            options={[
              { value: 'NIT', label: 'NIT (Persona jurídica o empresa)' },
              { value: 'C.C.', label: 'Cédula de Ciudadanía' },
              { value: 'C.E.', label: 'Cédula de Extranjería' },
              { value: 'Pasaporte', label: 'Pasaporte' },
            ]}
          />
          <InputField
            label="Número de documento / NIT"
            value={data.numDocAcreedor}
            onChange={(e) => update('numDocAcreedor', e.target.value)}
            placeholder="Ej. 901.458.720-3 o 80.123.456"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Deudor Principal */}
      <CollapsibleSection
        title="Deudor Principal (Quién se compromete a pagar)"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Nombre completo del Deudor"
              value={data.nombreDeudor}
              onChange={(e) => update('nombreDeudor', e.target.value)}
              placeholder="Ej. Carlos Restrepo Montoya"
            />
          </div>
          <InputField
            label="Ciudad del Deudor"
            value={data.ciudadDeudor}
            onChange={(e) => update('ciudadDeudor', e.target.value)}
            placeholder="Ej. Medellín"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <SelectField
            label="Tipo de documento"
            value={data.tipoDocDeudor}
            onChange={(e) => update('tipoDocDeudor', e.target.value)}
            options={[
              { value: 'C.C.', label: 'Cédula de Ciudadanía' },
              { value: 'C.E.', label: 'Cédula de Extranjería' },
              { value: 'NIT', label: 'NIT' },
              { value: 'Pasaporte', label: 'Pasaporte' },
            ]}
          />
          <InputField
            label="Número de identificación"
            value={data.numDocDeudor}
            onChange={(e) => update('numDocDeudor', e.target.value)}
            placeholder="Ej. 71.284.950"
          />
          <InputField
            label="Teléfono o Celular"
            value={data.telefonoDeudor}
            onChange={(e) => update('telefonoDeudor', e.target.value)}
            placeholder="Ej. 315 892 4410"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Dirección de residencia o domicilio"
            value={data.direccionDeudor}
            onChange={(e) => update('direccionDeudor', e.target.value)}
            placeholder="Ej. Calle 10 # 43E-22, Medellín"
          />
          <InputField
            label="Correo electrónico (opcional)"
            type="email"
            value={data.correoDeudor || ''}
            onChange={(e) => update('correoDeudor', e.target.value)}
            placeholder="Ej. carlos.restrepo@correo.com"
          />
        </div>
      </CollapsibleSection>

      {/* 4. Codeudor / Avalista Solidario */}
      <CollapsibleSection
        title="Codeudor o Avalista Solidario"
        icon={<Users className="w-5 h-5 text-emerald-600" />}
        defaultOpen={data.incluirCodeudor}
      >
        <SwitchField
          label="Vincular Codeudor / Avalista Solidario"
          checked={data.incluirCodeudor}
          onChange={(checked) => update('incluirCodeudor', checked)}
          description="Añade un respaldo solidario que responde con sus bienes por el pago de la totalidad de la obligación (sin beneficio de excusión)."
        />

        {data.incluirCodeudor && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <InputField
                  label="Nombre completo del Codeudor"
                  value={data.nombreCodeudor || ''}
                  onChange={(e) => update('nombreCodeudor', e.target.value)}
                  placeholder="Ej. Luz Marina Giraldo Mejía"
                />
              </div>
              <InputField
                label="Ciudad del Codeudor"
                value={data.ciudadCodeudor || ''}
                onChange={(e) => update('ciudadCodeudor', e.target.value)}
                placeholder="Ej. Medellín"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                label="Tipo de documento"
                value={data.tipoDocCodeudor || 'C.C.'}
                onChange={(e) => update('tipoDocCodeudor', e.target.value)}
                options={[
                  { value: 'C.C.', label: 'Cédula de Ciudadanía' },
                  { value: 'C.E.', label: 'Cédula de Extranjería' },
                  { value: 'NIT', label: 'NIT' },
                  { value: 'Pasaporte', label: 'Pasaporte' },
                ]}
              />
              <InputField
                label="Número de identificación"
                value={data.numDocCodeudor || ''}
                onChange={(e) => update('numDocCodeudor', e.target.value)}
                placeholder="Ej. 43.918.420"
              />
              <InputField
                label="Teléfono del Codeudor"
                value={data.telefonoCodeudor || ''}
                onChange={(e) => update('telefonoCodeudor', e.target.value)}
                placeholder="Ej. 300 456 7812"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Dirección del Codeudor"
                value={data.direccionCodeudor || ''}
                onChange={(e) => update('direccionCodeudor', e.target.value)}
                placeholder="Ej. Carrera 76 # 32-15"
              />
              <InputField
                label="Correo del Codeudor (opcional)"
                type="email"
                value={data.correoCodeudor || ''}
                onChange={(e) => update('correoCodeudor', e.target.value)}
                placeholder="Ej. codeudor@correo.com"
              />
            </div>
          </div>
        )}
      </CollapsibleSection>

      {/* 5. Condiciones Financieras */}
      <CollapsibleSection
        title="Monto del Capital e Intereses"
        icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CurrencyField
            label="Capital adeudado (Monto en pesos)"
            value={data.capital}
            onChange={handleCapitalChange}
          />
          <InputField
            label="Capital en letras (Generación automática)"
            value={data.capitalLetras || ''}
            onChange={(e) => update('capitalLetras', e.target.value)}
            placeholder="Ej. DIEZ MILLONES DE PESOS M/CTE."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Interés corriente mensual (%)"
            type="number"
            step="0.1"
            value={data.tasaInteresCorrienteMensual}
            onChange={(e) =>
              update('tasaInteresCorrienteMensual', parseFloat(e.target.value) || 0)
            }
            placeholder="Ej. 1.5"
          />
          <InputField
            label="Tasa de interés de mora"
            value={data.tasaInteresMora}
            onChange={(e) => update('tasaInteresMora', e.target.value)}
            placeholder="Tasa máxima autorizada por la Superfinanciera"
          />
        </div>

        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <SwitchField
            label="Cláusula de aceleración"
            checked={data.clausulaAceleracion}
            onChange={(checked) => update('clausulaAceleracion', checked)}
            description="Permite al acreedor cobrar el total de la deuda de inmediato en caso de mora en cualquier cuota (Ley 45 de 1990)."
          />
          <SwitchField
            label="Renuncia a requerimientos para constitución en mora y protesto"
            checked={data.renunciaRequerimientos}
            onChange={(checked) => update('renunciaRequerimientos', checked)}
            description="Facilita el cobro ejecutivo directo sin necesidad de notificaciones previas ni diligencia de protesto (Arts. 622 y 795 C.Co)."
          />
        </div>
      </CollapsibleSection>

      {/* 6. Carta de Instrucciones */}
      <CollapsibleSection
        title="Carta de Instrucciones (Art. 622 C.Co)"
        icon={<FileText className="w-5 h-5 text-emerald-600" />}
        defaultOpen={data.incluirCartaInstrucciones}
      >
        <SwitchField
          label="Incluir Carta de Instrucciones formal"
          checked={data.incluirCartaInstrucciones}
          onChange={(checked) => update('incluirCartaInstrucciones', checked)}
          description="Autorización legal irrevocable para diligenciar los espacios en blanco del pagaré en caso de incumplimiento."
        />

        {data.incluirCartaInstrucciones && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <InputField
              label="Objeto de la obligación o crédito respaldado"
              value={data.objetoCredito || ''}
              onChange={(e) => update('objetoCredito', e.target.value)}
              placeholder="Ej. Crédito de consumo o préstamo comercial"
            />
            <TextareaField
              label="Causal o eventos que activan el cobro (Exigibilidad)"
              rows={2}
              value={data.eventoExigibilidad}
              onChange={(e) => update('eventoExigibilidad', e.target.value)}
              placeholder="Describa qué incumplimientos autorizan al acreedor a llenar y cobrar el título..."
            />
            <TextareaField
              label="Instrucciones concretas de llenado"
              rows={3}
              value={data.instruccionesLlenado}
              onChange={(e) => update('instruccionesLlenado', e.target.value)}
              placeholder="Instrucciones específicas según Art. 622 C.Co..."
            />
          </div>
        )}
      </CollapsibleSection>

      {/* 7. Huella Dactilar y Firma */}
      <CollapsibleSection
        title="Huella Dactilar y Firma"
        icon={<Fingerprint className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <SwitchField
            label="Incluir recuadro para huella dactilar (Índice derecho)"
            checked={data.incluirHuella}
            onChange={(checked) => update('incluirHuella', checked)}
            description="Recomendado por notarías y entidades de crédito para mayor seguridad probatoria del título valor."
          />

          <div className="pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Firma digital del otorgante (opcional para previsualización o exportación):
            </p>
            <SignaturePad
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              onSignatureChange={(type, url) => {
                onChange({
                  ...data,
                  signatureType: type,
                  signatureDataUrl: url,
                });
              }}
              onSaveToProfile={onSaveSignatureToProfile}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
