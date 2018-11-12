import * as _ from 'lodash'
import * as faker from 'faker'
import Generator from '../index'

export default (quantity: number, variants: any[]) => {
  const orders = _.times(quantity, () =>
    createOrder(_.sample(variants))
  );
  return orders;
};

function createOrder(variant: any) {

  const order = {}
  // @ts-ignore
  order.financial_status = 'paid';
  // @ts-ignore
  order.tags = 'developer-tools-generator';
  // @ts-ignore
  order.test = true;
  // @ts-ignore
  order.line_items = _.times(_.sample([1, 1, 1, 1, 2, 3]), () => {
    const variant = _.sample(availableVariants);
    orderPrice += parseFloat(variant.price);
    return {
      variant_id: variant.id,
      quantity: _.sample([1, 1, 1, 1, 2, 3]),
    };
  });
  order.transactions = [
    {
      kind: 'sale',
      status: 'success',
      amount: orderPrice,
      test: true,
      gateway: 'bogus',
    },
  ];
  order.customer = Generator.createCustomers(1)
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
