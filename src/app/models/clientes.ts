export interface cliente {
    _id:string | null;
    nombreCompleto: string;
    dpi: number;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    objetivo: number;
    noSucursal: number;
    mensualidad:number;
    moroso: string;
    montoMora: number;
    estado: string;
    cantUltimoPago: number;
    fechaPago: string;
}