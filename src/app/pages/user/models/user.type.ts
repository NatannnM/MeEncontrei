export type User = {
    id: string,
    username: string,
    email: string,
    created_at: Date,
    role: 'ADMIN' | 'USER',
    image: string,
}
