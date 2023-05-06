export default interface IStoreItem {
    _id: string
    title: string
    thumbnail: string
    type: string
    category: string
    costUSD: number
    costSEK: number
    data: IStoreItemData,
    dateAdded: Date
}

export interface IStoreItemData {
    title?:string
    artist?:string,
    tracklist?:string[]
    releaseYear?:Number
    description?:string
    discs?: number
    brand?: string
}