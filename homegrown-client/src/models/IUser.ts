export default interface IUser {
    _id: string
    username: string
    registeredOn: Date
    firstname: string
    lastname: string
    fullname: string
    profile_picture_url: string
    credits: number
    email:string
    isAdmin: boolean
}