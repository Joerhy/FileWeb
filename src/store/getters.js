const getters = {
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.token,
  user: state => state.user,
  permission_routers: state => state.permission.routers,
}
export default getters