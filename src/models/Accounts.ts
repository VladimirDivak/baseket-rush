export interface Account {
    username: string;
    email?: string;
    password?: string;
    isTelegramUser: boolean;
    avatar?: string;
}