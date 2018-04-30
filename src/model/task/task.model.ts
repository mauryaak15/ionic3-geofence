import { Address } from '../address/address.model';

export interface Task {
    id?: number;
    title: string;
    desc: string;
    addr: Address;
    label: string;
    creationDate: string;
    type: number;
    completionDate?: string;
    isComplete?: number;
}