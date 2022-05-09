export class SharedEndPoints {
    END_POINTS: any;
    API_URL: string;

    constructor(API_URL: string){
        this.API_URL = API_URL;
        this.END_POINTS = {
            REGISTRO_CLIENTES: this.API_URL + '/registro_clientes',
            REGISTRO_EMPLEADOS: this.API_URL + '/registro_empleados',
            PAGOPLATAFORMA: this.API_URL + '/pago_plataforma',
            RUTINAS: this.API_URL + '/rutina',
            LUHN: this.API_URL + '/luhn',
            VERIFYEMAIL: this.API_URL + '/verifyEmail',
        }
    }
}
