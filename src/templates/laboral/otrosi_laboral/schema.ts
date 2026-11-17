import { DocumentMeta, OtrosiLaboralData } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'otrosi_laboral',
  title: 'Otrosí Modificatorio de Contrato de Trabajo',
  shortTitle: 'Otrosí Laboral',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Otrosí formal para modificar salario, cargo, prórroga de vigencia o modalidad laboral, ratificando las demás estipulaciones contractuales.',
  iconName: 'FileText',
  lawReference: 'C.S.T. Arts. 43, 50 y concordantes',
  tags: [
    'otrosí',
    'modificación contrato',
    'acuerdo laboral',
    'ajuste salarial',
    'prórroga',
    'laboral',
    'cst',
    'adenda laboral',
  ],
  estimatedMinutes: '2 min',
  featuredTags: ['Modificación Bilateral', 'Ajuste Salarial / Cargo', 'CST Art. 50'],
  subfilter: 'Modificaciones',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: OtrosiLaboralData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  numeroOtrosi: 'Otrosí N° 01',
  tipoContratoOriginal: 'Contrato de Trabajo a Término Indefinido',
  fechaContratoOriginal: '2024-02-01',
  nombreEmpresa: '',
  nitEmpresa: '',
  nombreRepresentanteLegal: '',
  tipoDocRepresentante: 'Cédula de Ciudadanía',
  numDocRepresentante: '',
  nombreTrabajador: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  cargoTrabajador: '',
  tipoModificacion: 'ajuste_salarial',
  clausulaModificada: 'Cláusula Tercera (Salario y Remuneración)',
  textoAnterior:
    'El EMPLEADOR pagará al TRABAJADOR por la prestación de sus servicios un salario básico mensual equivalente a dos millones quinientos mil pesos ($2.500.000) m/cte.',
  textoNuevo:
    'A partir de la fecha de vigencia del presente otrosí, el EMPLEADOR pagará al TRABAJADOR por la prestación de sus servicios un salario básico mensual de tres millones doscientos mil pesos ($3.200.000) m/cte., pagadero en las fechas y condiciones pactadas en el contrato original.',
  fechaVigenciaModificacion: TODAY,
  incluyeRatificacion: true,
  ratificacionTexto:
    'Las partes manifiestan de manera expresa que las demás cláusulas, términos y condiciones del Contrato Individual de Trabajo suscrito originalmente que no hayan sido expresamente modificadas por el presente instrumento, continúan vigentes, obligatorias y con plena validez jurídica para todos los efectos legales.',
  signatureType: 'text',
};

export const sampleData: OtrosiLaboralData = {
  ciudad: 'Bucaramanga',
  fecha: TODAY,
  numeroOtrosi: 'Otrosí N° 02',
  tipoContratoOriginal: 'Contrato de Trabajo a Término Fijo',
  fechaContratoOriginal: '2023-08-01',
  nombreEmpresa: 'SOLUCIONES DIGITALES DEL ORIENTE S.A.S.',
  nitEmpresa: '900.876.543-1',
  nombreRepresentanteLegal: 'María Eugenia Celis Pineda',
  tipoDocRepresentante: 'Cédula de Ciudadanía',
  numDocRepresentante: '63.456.789',
  nombreTrabajador: 'Andrés Felipe Villamizar Rueda',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '1.098.765.432',
  cargoTrabajador: 'Líder de Desarrollo Web y Plataformas',
  tipoModificacion: 'cambio_cargo',
  clausulaModificada: 'Cláusula Primera (Cargo y Funciones)',
  textoAnterior:
    'El TRABAJADOR desempeñará el cargo de Desarrollador Web Junior, ejecutando las labores de soporte técnico y mantenimiento de módulos frontend asignadas por la jefatura del área técnica.',
  textoNuevo:
    'El TRABAJADOR asumirá a partir de la vigencia del presente otrosí el cargo de Líder de Desarrollo Web y Plataformas, teniendo a su cargo la coordinación del equipo técnico, definición arquitectural de proyectos y supervisión de entregables de software conforme a los estándares de la empresa.',
  fechaVigenciaModificacion: TODAY,
  incluyeRatificacion: true,
  ratificacionTexto:
    'Las partes manifiestan de manera expresa que las demás cláusulas, términos y condiciones del Contrato Individual de Trabajo suscrito originalmente que no hayan sido expresamente modificadas por el presente instrumento, continúan vigentes, obligatorias y con plena validez jurídica para todos los efectos legales.',
  signatureType: 'text',
};

export type { OtrosiLaboralData };
