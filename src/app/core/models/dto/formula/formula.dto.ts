import { DetalleFormulaDto } from '../detalleFormula/detalle-formula.dto';

export interface FormulaDto {
  id: number;
  fechaRegistro: string;
  idPaciente: number;
  idCita: number;
  detallesFormula: DetalleFormulaDto[];
}
