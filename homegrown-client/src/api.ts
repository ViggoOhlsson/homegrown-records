
import type {IStoreItem} from "./models/IStoreItem";
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
    profile_picture_url: "https://earnest-kashata-ebaa1c.netlify.app/pfp.jpg",
    registeredOn: new Date()
}

export const exampleStoreItems:IStoreItem[] = [{
    _id: "65148681fe750175c9c08c8d",
    title: "King Gizzard & The Lizard Wizard - Quarters!",
    costUSD: 24.95,
    costSEK: 249.95,
    thumbnail: "https://earnest-kashata-ebaa1c.netlify.app/kglw-quarters.jpg",
    type: "Vinyl",
    category: "LP",
    dateAdded: new Date(),
    data: {
      tracklist: [
        "The River",
        "Infinite Rise",
        "God Is In The Rhythm",
        "Lonely Steel Sheet Flyer"
      ],
      description: "King gizzlerd",
      artist: "King Gizzard & The Lizard Wizard",
      title: "Quarters!",
      releaseYear: 2015,
      discs: 1
    }
  },{
    _id: "66586781ab85c1528db170a4",
    title: "The Beatles - Abbey Road",
    costUSD: 19.95,
    thumbnail: "https://earnest-kashata-ebaa1c.netlify.app/the_beatles-abbey_road.jpg",
    type: "Vinyl",
    category: "LP",
    dateAdded: new Date(),
    data: {
      tracklist: [
        "Come Together",
        "Something",
        "Maxwell's Silver Hammer",
        "Oh! Darling",
        "Octopus's Garden",
        "etc."
      ],
      description: "generic description",
      artist: "The Beatles",
      title: "Abbey Road",
      releaseYear: 1969,
      discs: 1
    }
  }
]