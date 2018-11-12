import * as _ from 'lodash'
import * as faker from 'faker'

import AddressManager from '../data/addresses'

export default (quantity: number) => {
  const customers = _.times(quantity, () =>
    createCustomer()
  );
  return customers;
};

function createCustomer() {
  const first_name = faker.fake(`{{name.firstName}}`);
  const last_name = faker.fake(`{{name.lastName}}`);
  const email = `${first_name}.${last_name}.${_.random(0, 10000000)}@developer-tools.com`
  const customer = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    verified_email: true,
    addresses: [{
      ...AddressManager.random(),
      first_name: first_name,
      last_name: last_name,
      phone: faker.phone.phoneNumber(),
    }],
    tags: 'create-shopify-data',
  };
  return customer;
}
