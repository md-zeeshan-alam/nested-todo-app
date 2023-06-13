export type Ttask = {
  id: number;
  value: string;
  task: Ttask[];
};

export type TUser = {
  id: number;
  token: string;
  username: string;
  password: string;
  task: Ttask[];
};

export type Ttaskpayload = {
  taskId: number;
  value: string;
};

export type TnodePayload = {
  userData: Ttask;
  taskId: number;
  value: string;
};

export type TSignIn = {
  username: string;
  password: string;
  token: string;
};
