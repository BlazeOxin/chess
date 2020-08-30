declare module "*.png"{
    const content: string;
    export default content;
}
interface emitterAtrb{
    ev: string;
    payload?: {
        
    }
}
interface Menu {
    theme:string;
    icon: string;
    sections: {
        name: string;
        subSeperation:{
            name: string;
            ev: string;
            dropdown?: {
                items: {
                    name: string;
                    ev: string;
                }[]
            }
        }[][]
    }[]
}
type emitter = (e: emitterAtrb) => Promise<void|any>; 
