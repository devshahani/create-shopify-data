import Shop from '../../shop'
import { ShopifyAPIResourceName } from '../../shop/api';
import { DeleteContext, CreateOrdersContext } from '../../types/commands';
import * as Listr from 'listr'
import { IPublicShopifyConfig } from 'shopify-api-node';
import Generator from '../../generator';
import { PresetProductTypes } from '../../types/generator';

export default {
  loadPreset(type: PresetProductTypes) {
    return Generator.createProducts[type]
  },
}
