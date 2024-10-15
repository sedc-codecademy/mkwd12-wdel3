export interface User {
  _id: string;
  username: string;
  email: string;
  __v: number;
}

export interface RegisterReq {
  username: string;
  email: string;
  password: string;
}
