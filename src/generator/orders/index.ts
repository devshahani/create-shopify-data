import * as _ from 'lodash'
import * as faker from 'faker'
import Generator from '../index'

export default (quantity: number, variants: any[], customers: any[], backdate: number) => {
  const orders = customers.map(customer => {
    return createOrder(_.sampleSize(variants, _.random(1, 10)), customer)
  })
  return orders;
};

function createOrder(variants: any[], customer: any) {
  let orderPrice = 0

  const order = {}
  // @ts-ignore
  order.financial_status = 'paid';
  // @ts-ignore
  order.tags = 'create-shopify-data';
  // @ts-ignore
  order.test = true;
  // @ts-ignore
  order.customer = customer
  // @ts-ignore
  order.shipping_address = customer.addresses[0]
  // @ts-ignore
  order.line_items = variants.map(variant => {
    orderPrice += parseFloat(variant.price)
    return {
      variant_id: variant.id,
      quantity: _.sample([1, 1, 1, 1, 2, 3])
    }
  })
  // @ts-ignore
  order.transactions = [
    {
      kind: 'sale',
      status: 'success',
      amount: orderPrice,
      test: true,
      gateway: 'bogus',
    },
  ];

  // switch (ordersDateRange) {
  //   case 'year':
  //     order.processed_at = moment()
  //       .subtract(_.random(0, 365), 'days')
  //       .subtract(_.random(0, 24), 'hours')
  //       .subtract(_.random(0, 60), 'minutes')
  //       .toISOString();
  //     break;
  //   case 'month':
  //     order.processed_at = moment()
  //       .subtract(_.random(0, 30), 'days')
  //       .subtract(_.random(0, 24), 'hours')
  //       .subtract(_.random(0, 60), 'minutes')
  //       .toISOString();
  //     break;
  //   case 'today':
  //   default:
  //     order.processed_at = moment()
  //       .subtract(_.random(0, 600), 'minutes')
  //       .toISOString();

  //     break;
  // }

  // if (moment(order.processed_at).isSame(moment(), 'week')) {
  //   order.fulfillment_status = _.sample([null, 'partial', 'fulfilled']);
  // } else {
  //   order.fulfillment_status = 'fulfilled';
  // }

  return order
}
