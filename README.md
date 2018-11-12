# create-shopify-data

Generate data for your Shopify store

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-shopify-data.svg)](https://npmjs.org/package/create-shopify-data)
[![Downloads/week](https://img.shields.io/npm/dw/create-shopify-data.svg)](https://npmjs.org/package/create-shopify-data)
[![License](https://img.shields.io/npm/l/create-shopify-data.svg)](https://github.com/devshahani/create-shopify-data/blob/master/package.json)

<!-- toc -->
* [create-shopify-data](#create-shopify-data)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g create-shopify-data
$ create-shopify-data COMMAND
running command...
$ create-shopify-data (-v|--version|version)
create-shopify-data/0.0.0 darwin-x64 node-v10.12.0
$ create-shopify-data --help [COMMAND]
USAGE
  $ create-shopify-data COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`create-shopify-data help [COMMAND]`](#create-shopify-data-help-command)
* [`create-shopify-data use SHOP ACCESS_TOKEN`](#create-shopify-data-use-shop-access-token)

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

## `create-shopify-data use SHOP ACCESS_TOKEN`

Enter your myshopify domain (e.g ping-pong-shop-2) along with an access token (https://help.shopify.com/en/api/getting-started/authentication/private-authentication). Once authenticated, your credentials persist over usage sessions.

```
USAGE
  $ create-shopify-data use SHOP ACCESS_TOKEN

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/use.ts](https://github.com/devshahani/create-shopify-data/blob/v0.0.0/src/commands/use.ts)_
<!-- commandsstop -->
