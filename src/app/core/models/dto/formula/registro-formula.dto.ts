import { RegistroDetalleFormulaDto } from '../detalleFormula/registro-detalle-formula.dto';

export interface RegistroFormulaDto {
  idPaciente: number;
  idCita: number;
  detallesFormula: RegistroDetalleFormulaDto[];
}
