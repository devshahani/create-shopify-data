🚨 In active development (and extremely unstable)

# create-shopify-data

[![Version](https://img.shields.io/npm/v/create-shopify-data.svg)](https://npmjs.org/package/create-shopify-data)
[![Downloads/week](https://img.shields.io/npm/dw/create-shopify-data.svg)](https://npmjs.org/package/create-shopify-data)
[![License](https://img.shields.io/npm/l/create-shopify-data.svg)](https://github.com/devshahani/create-shopify-data/blob/master/package.json)

Generate dummy data for your Shopify store.

## To-do:

- [x] Delete products, customers, orders
- [x] Create orders
- [x] Create products (apparel)
- [ ] Create products (random)
- [ ] Tests

<!-- toc -->

- [create-shopify-data](#create-shopify-data)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g create-shopify-data
$ create-shopify-data COMMAND
running command...
$ create-shopify-data (-v|--version|version)
create-shopify-data/0.2.0 darwin-x64 node-v10.12.0
$ create-shopify-data --help [COMMAND]
USAGE
  $ create-shopify-data COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`create-shopify-data delete RESOURCE`](#create-shopify-data-delete-resource)
- [`create-shopify-data help [COMMAND]`](#create-shopify-data-help-command)
- [`create-shopify-data orders`](#create-shopify-data-orders)
- [`create-shopify-data products:apparel`](#create-shopify-data-productsapparel)
- [`create-shopify-data use SHOP ACCESS_TOKEN`](#create-shopify-data-use-shop-access-token)

## `create-shopify-data delete RESOURCE`

Delete all orders from your Shopify store.

```
USAGE
  $ create-shopify-data delete RESOURCE

OPTIONS
  -i, --interval=interval  [default: 500] Specify the interval (in ms) between each Shopify API request. Default (and
                           min) is 500
```

_See code: [src/commands/delete.ts](https://github.com/devshahani/create-shopify-data/blob/v0.2.0/src/commands/delete.ts)_

## `create-shopify-data help [COMMAND]`

display help for create-shopify-data

```
USAGE
  $ create-shopify-data help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_

## `create-shopify-data orders`

Create orders using preexisting products

```
USAGE
  $ create-shopify-data orders

OPTIONS
  -b, --backdate=backdate  [default: 0] The max number of months order creation time can be backdated by. Defaults to 0
                           (no backdate)

  -i, --interval=interval  [default: 500] Specify the interval (in ms) between each Shopify API request. Default (and
                           min) is 500

  -q, --quantity=quantity  [default: 20] The number of orders you would like to create
```

_See code: [src/commands/orders.ts](https://github.com/devshahani/create-shopify-data/blob/v0.2.0/src/commands/orders.ts)_

## `create-shopify-data products:apparel`

Create orders using preexisting products

```
USAGE
  $ create-shopify-data products:apparel

OPTIONS
  -i, --interval=interval  [default: 500] Specify the interval (in ms) between each Shopify API request. Default (and
                           min) is 500
```

_See code: [src/commands/products/apparel.ts](https://github.com/devshahani/create-shopify-data/blob/v0.2.0/src/commands/products/apparel.ts)_

## `create-shopify-data use SHOP ACCESS_TOKEN`

Enter your myshopify domain (e.g ping-pong-shop-2) along with an access token or private app password (https://help.shopify.com/en/api/getting-started/authentication/private-authentication). Once authenticated, your credentials persist over usage sessions.

```
USAGE
  $ create-shopify-data use SHOP ACCESS_TOKEN

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/use.ts](https://github.com/devshahani/create-shopify-data/blob/v0.2.0/src/commands/use.ts)_

<!-- commandsstop -->
