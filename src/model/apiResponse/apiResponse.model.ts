import { Task } from "../task/task.model";

export interface ApiResponse {
    status?: Boolean;
    data?:  [{
        token?: string;
        user_id?: string;
        task?: Task[];
     }]; 
    message?: string;
}