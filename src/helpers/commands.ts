export default {
  async validateActiveShop(ctx: DeleteContext, task: ListrTask) {
    const {accessToken, myshopifyDomain} = await Shop.validateActiveIdentity()
    task.title = `Validate access token for ${myshopifyDomain}`
    ctx.myshopifyDomain = myshopifyDomain
    ctx.accessToken = accessToken
  },
}
