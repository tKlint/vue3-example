declare namespace API {

  type Router = {
    icon?: string;
    router: string;
    orderNum: number;
    type: 0 | 1 | 2;
    path?: string;
    name?: string;
    children?: Router[];
    redirect?: string;
  }
  type CuurentUser = {
    name: string;
    uuid: number;
    avatarUrl: string;
  }
  type LoginParams = {
    account: string;
    password: string;
    type: number;
  }
}