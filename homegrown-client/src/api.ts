
import type IUser from "./models/IUser";

export const defaultAdminUser: IUser = {
    _id: "65148681fe750175c9c08c8d",
    username: "Administrator",
    credits: 100,
    email: "admin@homegrown.com",
    firstname: "John",
    lastname: "Doe",
    fullname: "John Doe",
    isAdmin: true,
    profile_picture_url: "pfp.jpg",
    registeredOn: new Date()
}