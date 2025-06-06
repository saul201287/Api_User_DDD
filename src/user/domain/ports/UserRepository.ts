import { User } from "../entities/User";

export interface UserRepository {
    create(user:User): Promise<User| null>; 
    login(email: string, password: string): Promise<User | null>;
    verify(email: string): Promise<User | null>;
    updateProfile(id: number, user: User): Promise<User | null>;
    getById(id: number): Promise<User | null>;
    changeRole(id: number, role: string): Promise<User | null>;
}