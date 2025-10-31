export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    created_at: Date,
    role: 'ADMIN' | 'USER',
    profile_pic: string,
}
