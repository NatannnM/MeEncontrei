export type Establishment = {
  id: string,
  location: string,
  city: string,
  name: string,
  description: string,
  owner: string,
  photo: string,
  map: string,
  image: string,
  public: 'PRIVATE' | 'PUBLIC'
}