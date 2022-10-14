export function fetechUserRoutes (data: { token: string; }): Promise<API.Router[]> {
  return Promise.resolve([
    {
      router: '/dashboard',
      orderNum: 0,
      type: 1,
      path: '/dashboard',
      name: 'dashboard'
    }, {
      router: '/about',
      orderNum: 1,
      type: 1,
      path: '/about',
      name: 'about'
    }
  ])
}

export function fetechUser (data: { token: string; }): Promise<API.CuurentUser> {
  return Promise.resolve({
    name: '哈哈',
    uuid: 1,
    avatarUrl: 'www'
  })
}