interface ITextChat {
  text: string
}

interface IMessage {
  id: number,
  images: string | null,
  owner: {
    id: number
  },
  text: string
}