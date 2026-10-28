import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import { DocumentType, AllDocumentsData } from '../types/documents';
import { generarTextoPlano } from './plainTextGenerator';

interface PartySignatureInfo {
  role?: string;
  name?: string;
  doc?: string;
  phone?: string;
  address?: string;
  note?: string;
}

function extractSignaturesForDoc(
  docType: DocumentType,
  state: AllDocumentsData
): { left: PartySignatureInfo; right: PartySignatureInfo } {
  // Helper to extract nested doc object
  const getDoc = (keyCamel: keyof AllDocumentsData, _keySnake?: string) =>
    (state[keyCamel] || {}) as unknown as Record<string, string | undefined>;

  switch (docType) {
    case 'cuenta_cobro': {
      const d = getDoc('cuentaCobro', 'cuenta_cobro');
      return {
        left: {
          role: 'EL CONTRATISTA:',
          name: d.nombreContratista || 'NOMBRE DEL CONTRATISTA',
          doc: `${d.tipoDocumentoContratista || 'C.C.'}: ${d.numeroDocumentoContratista || '____________'}`,
          phone: d.telefonoContratista ? `Tel: ${d.telefonoContratista}` : undefined,
          address: d.direccionContratista,
        },
        right: {
          role: 'RECIBIDO / REVISADO POR:',
          name: d.nombreCliente || 'EMPRESA / PAGADOR',
          doc: `${d.tipoDocumentoCliente || 'NIT'}: ${d.numeroDocumentoCliente || '____________'}`,
          note: 'Fecha de radicación: ____________________',
        },
      };
    }

    case 'propuesta_servicios': {
      const d = getDoc('propuestaServicios', 'propuesta_servicios');
      return {
        left: {
          role: 'PROPONENTE / CONSULTOR:',
          name: d.nombreProponente || 'Nombre Proponente',
          doc: d.identificacionProponente ? `ID: ${d.identificacionProponente}` : undefined,
          phone: d.telefonoProponente ? `Tel: ${d.telefonoProponente}` : undefined,
        },
        right: {
          role: 'ACEPTADA A CONFORMIDAD:',
          name: d.nombreCliente || d.empresaCliente || 'Cliente',
          doc: d.cargoCliente ? `Cargo: ${d.cargoCliente}` : undefined,
          note: 'Firma y sello de aceptación',
        },
      };
    }

    case 'contrato_prestacion': {
      const d = getDoc('contratoPrestacion', 'contrato_prestacion');
      return {
        left: {
          role: 'EL CONTRATANTE:',
          name: d.nombreContratante || 'Nombre Contratante',
          doc: `${d.tipoDocContratante || 'NIT'}: ${d.numDocContratante || '____________'}`,
          address: d.domicilioContratante,
        },
        right: {
          role: 'EL CONTRATISTA:',
          name: d.nombreContratista || 'Nombre Contratista',
          doc: `${d.tipoDocContratista || 'C.C.'}: ${d.numDocContratista || '____________'}`,
          address: d.domicilioContratista,
        },
      };
    }

    case 'carta_renuncia': {
      const d = getDoc('cartaRenuncia', 'carta_renuncia');
      return {
        left: {
          role: 'TRABAJADOR(A) RENUNCIANTE:',
          name: d.nombreTrabajador || 'Nombre Trabajador',
          doc: `${d.tipoDocumento || 'C.C.'}: ${d.numeroDocumento || '____________'}`,
          note: d.cargoTrabajador ? `Cargo: ${d.cargoTrabajador}` : undefined,
        },
        right: {
          role: 'RECIBIDO POR LA EMPRESA:',
          name: d.nombreDestinatario || d.nombreEmpresa || 'Gestión Humana',
          doc: d.cargoDestinatario ? `Cargo: ${d.cargoDestinatario}` : undefined,
          note: 'Fecha y hora de recibido: _______________',
        },
      };
    }

    case 'certificado_laboral': {
      const d = getDoc('certificadoLaboral', 'certificado_laboral');
      return {
        left: {
          role: 'TRABAJADOR SOLICITANTE:',
          name: d.nombreTrabajador || 'Nombre Trabajador',
          doc: `${d.tipoDocumento || 'C.C.'}: ${d.numeroDocumento || '____________'}`,
          phone: d.correoEntrega ? `Envío a: ${d.correoEntrega}` : undefined,
        },
        right: {
          role: 'RADICADO TALENTO HUMANO:',
          name: d.nombreEmpresa || 'Empresa Empleadora',
          note: 'Firma de recibido / Radicado',
        },
      };
    }

    case 'permiso_laboral': {
      const d = getDoc('permisoLaboral', 'permiso_laboral');
      return {
        left: {
          role: 'EMPLEADO SOLICITANTE:',
          name: d.nombreEmpleado || 'Nombre Empleado',
          doc: `${d.tipoDocumento || 'C.C.'}: ${d.numeroDocumento || '____________'}`,
          note: d.cargoEmpleado ? `Cargo: ${d.cargoEmpleado}` : undefined,
        },
        right: {
          role: 'AUTORIZADO POR (JEFE INMEDIATO):',
          name: d.nombreJefe || 'Jefe Inmediato',
          doc: d.cargoJefe ? `Cargo: ${d.cargoJefe}` : undefined,
          note: 'Estado: [  ] Aprobado  [  ] No Aprobado',
        },
      };
    }

    case 'no_renovacion_arriendo': {
      const d = getDoc('noRenovacionArriendo', 'no_renovacion_arriendo');
      return {
        left: {
          role: d.rolRemitente === 'arrendatario' ? 'EL ARRENDATARIO:' : 'EL ARRENDADOR:',
          name: d.nombreRemitente || 'Nombre Remitente',
          doc: `${d.tipoDocRemitente || 'C.C.'}: ${d.numDocRemitente || '____________'}`,
          phone: d.telefonoRemitente ? `Tel: ${d.telefonoRemitente}` : undefined,
        },
        right: {
          role: 'CONSTANCIA DE NOTIFICACIÓN:',
          name: d.nombreDestinatario || 'Nombre Destinatario',
          doc: `${d.tipoDocDestinatario || 'C.C.'}: ${d.numDocDestinatario || '____________'}`,
          note: 'Firma y fecha de recibido',
        },
      };
    }

    case 'contrato_arrendamiento': {
      const d = getDoc('contratoArrendamiento', 'contrato_arrendamiento');
      return {
        left: {
          role: 'EL ARRENDADOR:',
          name: d.nombreArrendador || 'Nombre Arrendador',
          doc: `${d.tipoDocArrendador || 'C.C.'}: ${d.numDocArrendador || '____________'}`,
          phone: d.telefonoArrendador ? `Tel: ${d.telefonoArrendador}` : undefined,
        },
        right: {
          role: 'EL ARRENDATARIO:',
          name: d.nombreArrendatario || 'Nombre Arrendatario',
          doc: `${d.tipoDocArrendatario || 'C.C.'}: ${d.numDocArrendatario || '____________'}`,
          phone: d.telefonoArrendatario ? `Tel: ${d.telefonoArrendatario}` : undefined,
          note: d.incluyeCodeudor && d.nombreCodeudor ? `Codeudor: ${d.nombreCodeudor} (${d.numDocCodeudor})` : undefined,
        },
      };
    }

    case 'acta_entrega': {
      const d = getDoc('actaEntrega', 'acta_entrega');
      return {
        left: {
          role: `QUIEN ENTREGA (${d.calidadEntrega || 'Arrendatario'}):`,
          name: d.nombreEntrega || 'Nombre Entrega',
          doc: d.docEntrega ? `Doc: ${d.docEntrega}` : undefined,
        },
        right: {
          role: `QUIEN RECIBE (${d.calidadRecibe || 'Arrendador'}):`,
          name: d.nombreRecibe || 'Nombre Recibe',
          doc: d.docRecibe ? `Doc: ${d.docRecibe}` : undefined,
        },
      };
    }

    case 'derecho_peticion': {
      const d = getDoc('derechoPeticion', 'derecho_peticion');
      return {
        left: {
          role: 'EL PETICIONARIO:',
          name: d.nombrePeticionario || 'Nombre Peticionario',
          doc: `${d.tipoDocumento || 'C.C.'}: ${d.numeroDocumento || '____________'} de ${d.lugarExpedicion || 'esta ciudad'}`,
          phone: d.telefono ? `Tel: ${d.telefono}` : undefined,
          address: d.direccionNotificacion,
        },
        right: {
          role: 'RECIBIDO POR ENTIDAD DESTINATARIA:',
          name: d.entidadDestinataria || 'Entidad Destinataria',
          note: 'Sello / Fecha / Radicado oficial',
        },
      };
    }

    case 'poder_autorizacion': {
      const d = getDoc('poderAutorizacion', 'poder_autorizacion');
      return {
        left: {
          role: 'OTORGANTE (PODERDANTE):',
          name: d.nombreOtorgante || 'Nombre Otorgante',
          doc: `${d.tipoDocOtorgante || 'C.C.'}: ${d.numDocOtorgante || '____________'}`,
          phone: d.telefonoOtorgante ? `Tel: ${d.telefonoOtorgante}` : undefined,
        },
        right: {
          role: 'APODERADO (ACEPTA):',
          name: d.nombreApoderado || 'Nombre Apoderado',
          doc: `${d.tipoDocApoderado || 'C.C.'}: ${d.numDocApoderado || '____________'}`,
          phone: d.telefonoApoderado ? `Tel: ${d.telefonoApoderado}` : undefined,
        },
      };
    }

    case 'habeas_data': {
      const d = getDoc('habeasData', 'habeas_data');
      return {
        left: {
          role: 'TITULAR RECLAMANTE:',
          name: d.nombreTitular || 'Nombre Titular',
          doc: `${d.tipoDocTitular || 'C.C.'}: ${d.numDocTitular || '____________'}`,
          phone: d.telefonoTitular ? `Tel: ${d.telefonoTitular}` : undefined,
          address: d.direccionNotificacion,
        },
        right: {
          role: 'CONSTANCIA DE RADICACIÓN:',
          name: d.centralDeRiesgo || 'Central de Riesgo',
          note: 'Número de radicado / Fecha de recepción',
        },
      };
    }

    case 'acuerdo_nda': {
      const d = getDoc('acuerdoNda', 'acuerdo_nda');
      const isBilateral = d.tipoNda === 'bilateral';
      return {
        left: {
          role: isBilateral ? 'POR LA PARTE A:' : 'POR LA PARTE DIVULGANTE:',
          name: d.nombreParteEmisora || 'Parte Emisora',
          doc: `${d.tipoDocEmisora || 'NIT'}: ${d.numDocEmisora || '____________'}`,
          address: d.domicilioEmisora,
        },
        right: {
          role: isBilateral ? 'POR LA PARTE B:' : 'POR LA PARTE RECEPTORA:',
          name: d.nombreParteReceptora || 'Parte Receptora',
          doc: `${d.tipoDocReceptora || 'NIT'}: ${d.numDocReceptora || '____________'}`,
          address: d.domicilioReceptora,
        },
      };
    }

    case 'compraventa_vehiculo': {
      const d = getDoc('compraventaVehiculo', 'compraventa_vehiculo');
      return {
        left: {
          role: 'EL VENDEDOR:',
          name: d.nombreVendedor || 'Nombre Vendedor',
          doc: `${d.tipoDocVendedor || 'C.C.'}: ${d.numDocVendedor || '____________'}`,
          phone: d.telefonoVendedor ? `Tel: ${d.telefonoVendedor}` : undefined,
          address: d.direccionVendedor,
        },
        right: {
          role: 'EL COMPRADOR:',
          name: d.nombreComprador || 'Nombre Comprador',
          doc: `${d.tipoDocComprador || 'C.C.'}: ${d.numDocComprador || '____________'}`,
          phone: d.telefonoComprador ? `Tel: ${d.telefonoComprador}` : undefined,
          address: d.direccionComprador,
        },
      };
    }

    case 'autorizacion_patios': {
      const d = getDoc('autorizacionPatios', 'autorizacion_patios');
      return {
        left: {
          role: 'OTORGANTE / PROPIETARIO:',
          name: d.nombrePropietario || 'Nombre Propietario',
          doc: `${d.tipoDocPropietario || 'C.C.'}: ${d.numDocPropietario || '____________'}`,
          phone: d.telefonoPropietario ? `Tel: ${d.telefonoPropietario}` : undefined,
        },
        right: {
          role: 'APODERADO / AUTORIZADO:',
          name: d.nombreAutorizado || 'Nombre Autorizado',
          doc: `${d.tipoDocAutorizado || 'C.C.'}: ${d.numDocAutorizado || '____________'}`,
          phone: d.telefonoAutorizado ? `Tel: ${d.telefonoAutorizado}` : undefined,
        },
      };
    }

    default:
      return {
        left: { role: 'EMISOR:', name: 'Firma Emisor' },
        right: { role: 'RECEPTOR:', name: 'Firma Receptor' },
      };
  }
}

function buildSignatureCell(info: PartySignatureInfo): TableCell {
  const cellChildren: Paragraph[] = [
    // Spacing before signature line
    new Paragraph({
      spacing: { before: 360, after: 80 },
      children: [],
    }),
    // Solid line for manual/digital signature
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: '________________________________________',
          bold: true,
          font: 'Arial',
          size: 20,
          color: '334155',
        }),
      ],
    }),
  ];

  if (info.role) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: info.role,
            bold: true,
            font: 'Arial',
            size: 20, // 10pt
            color: '0F172A',
          }),
        ],
      })
    );
  }

  if (info.name) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: info.name,
            bold: true,
            font: 'Arial',
            size: 22, // 11pt
            color: '0F172A',
          }),
        ],
      })
    );
  }

  if (info.doc) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: info.doc,
            font: 'Arial',
            size: 20,
            color: '475569',
          }),
        ],
      })
    );
  }

  if (info.phone) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: info.phone,
            font: 'Arial',
            size: 19,
            color: '64748B',
          }),
        ],
      })
    );
  }

  if (info.address) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: `Dirección: ${info.address}`,
            font: 'Arial',
            size: 19,
            color: '64748B',
          }),
        ],
      })
    );
  }

  if (info.note) {
    cellChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: info.note,
            italics: true,
            font: 'Arial',
            size: 19,
            color: '64748B',
          }),
        ],
      })
    );
  }

  return new TableCell({
    width: { size: 50, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    children: cellChildren,
  });
}

export async function exportDocx(
  docType: DocumentType,
  state: AllDocumentsData,
  title: string,
  filename: string
): Promise<void> {
  const fullText = generarTextoPlano(docType, state);
  const rawLines = fullText.split('\n');

  // Filter out the trailing signature text from rawLines so it is cleanly rendered in the Table instead
  const bodyLines: string[] = [];
  let reachedSignatures = false;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Check if we hit the signature marker
    if (
      trimmed.startsWith('___________________') ||
      trimmed.startsWith('OTORGANTE (PODERDANTE):') ||
      trimmed.startsWith('EL VENDEDOR:') ||
      trimmed.startsWith('EL CONTRATANTE:') ||
      trimmed.startsWith('EL ARRENDADOR:') ||
      trimmed.startsWith('Atentamente,')
    ) {
      reachedSignatures = true;
      break;
    }

    bodyLines.push(line);
  }

  const paragraphs: Paragraph[] = [
    // 1. Formal Document Header Title (Centered, 14pt bold, subtle border)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 240 },
      border: {
        bottom: {
          color: '94A3B8',
          space: 8,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 28, // 14pt
          font: 'Arial',
          color: '0F172A',
        }),
      ],
    }),
  ];

  // 2. Format Body Lines (Justified, 11pt Arial, relaxed line spacing)
  for (const line of bodyLines) {
    const trimmed = line.trim();

    if (!trimmed) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [],
        })
      );
      continue;
    }

    // Detect section headers
    const isSectionHeader =
      /^[A-ZÁÉÍÓÚÑ\s]{3,}:$/.test(trimmed) ||
      /^(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA)[\.:]/i.test(trimmed) ||
      /^[0-9]+\.\s+[A-ZÁÉÍÓÚÑ\s]{3,}/.test(trimmed) ||
      trimmed.startsWith('ASUNTO:') ||
      trimmed.startsWith('OBJETO:') ||
      trimmed.startsWith('LIQUIDACIÓN:') ||
      trimmed.startsWith('DATOS BANCARIOS:') ||
      trimmed.startsWith('CONDICIONES ECONÓMICAS:');

    if (isSectionHeader) {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 22, // 11pt
              font: 'Arial',
              color: '0F172A',
            }),
          ],
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 276, before: 60, after: 60 }, // 1.15 line height, 120 total spacing
          children: [
            new TextRun({
              text: line,
              size: 22, // 11pt
              font: 'Arial',
              color: '1E293B',
            }),
          ],
        })
      );
    }
  }

  // 3. Signature Table: 2 columns WITHOUT visible borders
  const signatures = extractSignaturesForDoc(docType, state);
  const signatureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        children: [
          buildSignatureCell(signatures.left),
          buildSignatureCell(signatures.right),
        ],
      }),
    ],
  });

  // Create docx Document with strict 2.54 cm margins (1440 twips)
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 2.54 cm
              right: 1440,  // 2.54 cm
              bottom: 1440, // 2.54 cm
              left: 1440,   // 2.54 cm
            },
          },
        },
        children: [...paragraphs, signatureTable],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  saveAs(blob, safeFilename);
}
