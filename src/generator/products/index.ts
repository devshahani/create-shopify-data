import * as faker from 'faker'
import * as _ from 'lodash'
// import Products from '../../commands/products';
type ProductInputType = 'apparel' | 'random'

type CreateProductsInput = {
  type: ProductInputType;
  quantity: number;
  variants: number;
}

export default ({type = 'apparel', quantity}: CreateProductsInput) => {
  let products: any[] = []

  const action =
    {
      random: doSomethingRandom,
      apparel: doSomethingApparel
    }[type]

  action(quantity, products)

  return products
}

// src/generator/products/index.ts
// src/generator/products/random.ts
// src/generator/products/apparel.ts
// src/generator/customers/index.ts

function doSomethingRandom(quantity: any, products: any) {
  import('../data/products/burst').then(Burst => {
    _.times(quantity, () => products.push(createProduct(Burst.default)))
  })
}

function doSomethingApparel(quantity: any, products: any) {
  import('../data/products/apparel').then(Apparel => {
    products = Apparel.default.map((product: Product) => {
      return {
        product: {
          ...product,
          variants: buildVariants(product)
        }
      }
    })
  })
}

function buildVariants(product: any) {
  const {variants} = product
  if (!variants || !variants.length) return
  return variants.map((variantName: string) => {
    return buildVariant({title: variantName})
  })
}

function buildVariant({title, virtual = false}: any) {
  return {
    title,
    option1: title,
    price: _.random(30, 80),
    weight: virtual ? 0 : _.random(200, 500),
    weight_unit: 'g',
    inventory_management: 'shopify',
    inventory_quantity: _.random(0, 20),
    inventory_policy: 'continue',
    requires_shipping: !virtual,
    compare_at_price: undefined //implement
  }
}

function createProduct(library: any) {
  const product = _.sample(library)
  return {
    product: {
      title: product.title,
      body_html: product.description,
      vendor: faker.fake('{{company.companyName}}'),
      product_type: faker.fake('{{commerce.department}}'),
      variants: _.times(_.random(1, 3), () => {
        return createProductVariant(_.sample([true, false]))
      }),
      images: [{src: product.image}],
      tags: 'developer-tools-generator'
    }
  }
}
function createProductVariant(virtual = false) {
  // console.log(virtual,!virtual, virtual ? 0 : faker.fake("{{random.number}}"));
  // const option_type = _.sample(["{{commerce.productMaterial}}","{{commerce.color}}"]);
  return {
    price: _.random(15, 120),
    weight: virtual ? 0 : _.random(1, 500),
    weight_unit: 'g',
    inventory_management: 'shopify',
    inventory_quantity: _.random(0, 50),
    option1: _.sample([
      faker.fake('{{commerce.productMaterial}}'),
      faker.fake('{{commerce.color}}')
    ]),
    inventory_policy: 'deny',
    requires_shipping: !virtual
  }
}
