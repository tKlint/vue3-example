import storage from '../utils/storage';
import { defineStore } from "pinia";
import api from '../service/index';
import { useRouter } from 'vue-router';
import { getDynamicModule } from '@/router/dynamicModules';
import generatorRoutes from '@/router/dynamicRouterGenerator';

export type UserState = {
  token: string;
  name?: string;
  avatar?: string;
  routes?: API.Router[];
  uuid?: number;
  loading?: boolean;
}

type UserActions = {
  login(data: API.LoginParams): Promise<Partial<UserState>>;
  afterLogin(): Promise<Partial<UserState>>;
  loginOut(): void;
}

const { ACCESS_TOKEN_KEY } = import.meta.env;
const initState: UserState = {
  token: storage.get(ACCESS_TOKEN_KEY, ''),
  name: 'admin',
  avatar: '',
  routes: undefined,
  uuid: -1,
  loading: false
}
export const useUserStore = defineStore<'user', UserState, {}, UserActions>({
  id: 'user',
  state: () => {
    return {
      // token: storage.get(ACCESS_TOKEN_KEY, '')
      ...initState
    }
  },
  actions: {
    async afterLogin() {
      const { avatarUrl, name, uuid } = await api.fetechUser({ token: this.token })
      const routes = await api.fetechUserRoutes({ token: this.token });
      // getDynamicModule('/');
      generatorRoutes(routes);
      this.avatar = avatarUrl;
      this.name = name;
      this.uuid = uuid;
      this.routes = routes;
      return { routes };
    },
    async login (data) {
      console.log(data, '用戶提交');
      const { token } = await api.login();
      storage.set(ACCESS_TOKEN_KEY, token);
      this.token = token;
      // const router = useRouter();
      // router.push('/');
      return { token }
    },
    loginOut() {
      this.token = '';
      this.name = 'admin';
      this.avatar = '';
      this.routes = undefined;
      this.uuid = -1;
      this.loading = false;
      storage.clear();
    }
  }
});
