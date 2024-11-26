export interface Option {
    value: string;
    label: string;
}


export interface CustomSelectProps {
    options: String[];
    onChange: (e: any) => void;
    value: string | number
    id?: string 
    labelname?: string 
    star?: boolean 
}