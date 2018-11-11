import axios from 'axios'
import * as Configstore from 'configstore'
import * as keytar from 'keytar'

import API from './api'

const enum StorageNames {
  AppName = 'create-shopify-data',
  ActiveShop = 'ActiveShop'
}

const config = new Configstore('create-shopify-data', {
  activeShop: undefined
})

type ValidatedShopType = {
  myshopifyDomain: string,
  accessToken: string,
}

export default {
  API,
  validateActiveIdentity() {
    return new Promise<ValidatedShopType>(async (resolve, reject) => {
      try {
        const myshopifyDomain = this.getActiveShop()
        const accessToken = await this.getAccessTokenForShop(myshopifyDomain)
        await this.validateAccessToken(myshopifyDomain, accessToken)
        resolve({myshopifyDomain, accessToken})
      } catch(error) {
        reject(new Error(error))
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
    return new Promise<string>(async (resolve, reject) => {
      keytar
        .getPassword(StorageNames.AppName, myshopifyDomain)
        .then(accessToken =>
          accessToken
            ? resolve(accessToken)
            : reject(new Error(`Could not find an access token for ${myshopifyDomain}`))
        )
        .catch(error => {
          reject(new Error('Could not access credential storage.'))
        })
    })
  },
  unsetActiveShop() {
    config.delete(StorageNames.ActiveShop)
  }
}
