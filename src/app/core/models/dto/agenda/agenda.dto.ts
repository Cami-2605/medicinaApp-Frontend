export interface AgendaDto {
  id: number;
  dia: string; // Se usa string en Angular para LocalDate
  horaInicio: string; // Se usa string para LocalTime
  horaFin: string; // Igual: string para LocalTime
  isActivo: boolean;
  idCita: number;
}
