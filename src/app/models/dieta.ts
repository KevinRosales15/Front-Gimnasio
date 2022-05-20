export interface Dieta {
    _id: string | null;
    id_dieta: number;
    id_objetivo: number;
    nivel: number;
    tiempo: string;
    alimentos: string;
    carbohidratos: number;
    proteinas: number;
    peso: number;
}