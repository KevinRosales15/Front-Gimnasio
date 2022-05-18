export interface empleado {
    _id:string | null;
    nombreCompleto: string;
    dpi: number;
    fechaNacimiento: Date;
    email: string;
    telefono: number;
    noSucursal: number;
    password: string;
    puesto_rol: string;
}