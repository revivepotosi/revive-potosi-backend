export interface User {
    _id?: string;
    username: string;
    email: string;
    name: string;
    lastname: string;
    password: string;
    roles?: string[];
    isActive?: boolean;
}
