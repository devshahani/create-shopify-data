import axios from 'axios'
import * as Configstore from 'configstore'
import * as keytar from 'keytar'

import * as API from 'shopify-api-node'

const enum StorageNames {
  AppName = 'create-shopify-data',
  ActiveShop = 'ActiveShop'
}

const config = new Configstore('create-shopify-data', {
  activeShop: undefined
})

export default {
  addIdentity(shop: string, accessToken: string){
    return new Promise(async (resolve, reject) => {
      try {
        const myshopifyDomain = this.validateAndCleanDomain(shop)
        await this.validateAccessToken(myshopifyDomain, accessToken)
        await this.addToKeychain(myshopifyDomain, accessToken)
        this.setActiveShop(myshopifyDomain)
        resolve()
      } catch(error) {
        reject(error)
      }
    })
  },
  validateAndCleanDomain(domain: string) {
    const clean = domain.replace('.myshopify.com', '')
    if (/^[a-z0-9-]+$/.test(clean)) {
      const myshopifyDomain = `${clean}.myshopify.com`
      return myshopifyDomain
    } else {
      const errorMessage = `${clean} is not a valid myshopify domain (e.g ping-pong-shop-2)`
      throw new Error(errorMessage)
    }
  },
  API,
  validateAccessToken(myshopifyDomain: string, accessToken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://${myshopifyDomain}/admin/shop.json`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
          }
        })
        .then(_ => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addToKeychain(myshopifyDomain: string, accessToken: string) {
    return new Promise(async (resolve, reject) => {
      keytar
        .setPassword(StorageNames.AppName, myshopifyDomain, accessToken)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  setActiveShop(myshopifyDomain: string) {
    config.set(StorageNames.ActiveShop, myshopifyDomain)
  },
  getActiveShop(): string {
    const shop = config.get(StorageNames.ActiveShop)
    if (shop) {
      return shop
    } else {
      throw new Error('No authenticated shops. Add a shop to continue.')
    }
  },
  getAccessTokenForShop(myshopifyDomain: string) {
    return new Promise(async (resolve, reject) => {
      keytar
        .getPassword(StorageNames.AppName, myshopifyDomain)
        .then(accessToken =>
          accessToken
            ? resolve(accessToken)
            : reject("Could not find requested credentials")
        )
        .catch(error => {
          reject('Could not access credential storage.')
        })
    })
  },
  unsetActiveShop() {
    config.delete(StorageNames.ActiveShop)
  }
}
