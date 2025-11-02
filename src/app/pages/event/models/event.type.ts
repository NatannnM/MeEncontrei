export type Event = {
  id: string,
  owner: string,
  name: string,
  address: string,
  city: string,
  begin_date: Date | string,
  end_date: Date | string,
  info: string,
  image: string,
  price: number,
  id_facility: string,
  public: 'PRIVATE' | 'PUBLIC'
}