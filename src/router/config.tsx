

interface IMenus{
  menus: any[];
}

const router: IMenus = {
  menus: [
    {
      path: '/app/user',
      meta: { title: '用户' },
      hidden: false,
      children: [
        {
          path: '/app/user/store',
          component: 'Store',
          meta: { title: '我的店铺',  hiddenAside: true }
        }
      ]
    }
  ]
}

export default router