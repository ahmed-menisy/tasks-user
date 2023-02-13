export interface formLogin {
  email: string;
  password: string;
  role: string;
}

export interface formReister extends formLogin {
  username: string;
}

export interface formTask {
  title: string;
  userId: string;
  image: string;
  description: string;
  deadline: string;
}

export interface users {
  _id: string;
  username: string;
  email: string;
  assignedTasks: number;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Tasks {
  _id: string;
  title: string;
  userId: UserId;
  image: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: string;
}

export interface UserId {
  _id: string;
  username: string;
  email: string;
  password: string;
  assignedTasks: number;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
