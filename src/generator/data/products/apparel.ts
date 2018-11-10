const apparel: Product[] = [
  {
    handle: 'ocean-blue-shirt',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/young-man-in-bright-fashion_925x.jpg'
      }
    ],
    title: 'Ocean Blue Shirt',
    body_html:
      'Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.',
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Men', 'Featured']
  },
  {
    handle: 'classic-varsity-top',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/casual-fashion-woman_925x.jpg'
      }
    ],
    title: 'Classic Varsity Top',
    body_html:
      'Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women', 'Featured']
  },
  {
    handle: 'yellow-wool-jumper',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/autumn-photographer-taking-picture_925x.jpg'
      }
    ],
    title: 'Yellow Wool Jumper',
    body_html:
      'Knitted jumper in a soft wool blend with low dropped shoulders and wide sleeves and think cuffs. Perfect for keeping warm during Fall.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women', 'Featured']
  },
  {
    handle: 'floral-white-top',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/city-woman-fashion_925x@2x.jpg'
      }
    ],
    title: 'Floral White Top',
    body_html: 'Stylish sleeveless white top with a floral pattern.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women', 'Featured']
  },
  {
    handle: 'striped-silk-blouse',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/striped-blouse-fashion_925x.jpg'
      }
    ],
    title: 'Striped Silk Blouse',
    body_html:
      'Ultra-stylish black and red striped silk blouse with buckle collar and matching button pants.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'classic-leather-jacket',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/leather-jacket-and-tea_925x.jpg'
      }
    ],
    title: 'Classic Leather Jacket',
    body_html:
      'Womans zipped leather jacket. Adjustable belt for a comfortable fit, complete with shoulder pads and front zip pocket.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'dark-denim-top',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/young-female-models-denim_925x.jpg'
      }
    ],
    title: 'Dark Denim Top',
    body_html:
      'Classic dark denim top with chest pockets, long sleeves with buttoned cuffs, and a ripped hem effect.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'navy-sport-jacket',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/mens-fall-fashion-jacket_925x.jpg'
      }
    ],
    title: 'Navy Sports Jacket',
    body_html:
      "Long-sleeved navy waterproof jacket in thin, polyester fabric with a soft mesh inside. The durable water-repellent finish means you'll be kept comfortable and protected when out in all weathers.",
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Men']
  },
  {
    handle: 'dark-winter-jacket',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/smiling-woman-on-snowy-afternoon_925x.jpg'
      }
    ],
    title: 'Soft Winter Jacket',
    body_html:
      'Thick black winter jacket, with soft fleece lining. Perfect for those cold weather days.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'black-leather-bag',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/black-bag-over-the-shoulder_925x.jpg'
      }
    ],
    title: 'Black Leather Bag',
    body_html:
      'Womens black leather bag, with ample space. Can be worn over the shoulder, or remove straps to carry in your hand.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: [],
    collections: ['Women']
  },
  {
    handle: 'zipped-jacket',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/menswear-blue-zip-up-jacket_925x.jpg'
      }
    ],
    title: 'Zipped Jacket',
    body_html:
      "Dark navy and light blue men's zipped waterproof jacket with an outer zipped chestpocket for easy storeage.",
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Men']
  },
  {
    handle: 'silk-summer-top',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/young-hip-woman-at-carnival_925x.jpg'
      }
    ],
    title: 'Silk Summer Top',
    body_html: 'Silk womens top with short sleeves and number pattern.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'longsleeve-cotton-top',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/woman-outside-brownstone_925x.jpg'
      }
    ],
    title: 'Long Sleeve Cotton Top',
    body_html:
      'Black cotton womens top, with long sleeves, no collar and a thick hem.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'chequered-red-shirt',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/red-plaid-shirt_925x.jpg'
      }
    ],
    title: 'Chequered Red Shirt',
    body_html:
      'Classic mens plaid flannel shirt with long sleeves, in chequered style, with two chest pockets.',
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Men']
  },
  {
    handle: 'white-cotton-shirt',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/smiling-woman-poses_925x.jpg'
      }
    ],
    title: 'White Cotton Shirt',
    body_html:
      'Plain white cotton long sleeved shirt with loose collar. Small buttons and front pocket.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'olive-green-jacket',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/urban-fashion_925x.jpg'
      }
    ],
    title: 'Olive Green Jacket',
    body_html:
      'Loose fitting olive green jacket with buttons and large pockets. Multicoloured pattern on the front of the shoulders.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'blue-silk-tuxedo',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/man-adjusts-blue-tuxedo-bowtie_925x.jpg'
      }
    ],
    title: 'Blue Silk Tuxedo',
    body_html:
      'Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.',
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Men']
  },
  {
    handle: 'red-sports-tee',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/womens-red-t-shirt_925x.jpg'
      }
    ],
    title: 'Red Sports Tee',
    body_html:
      "Women's red sporty t-shirt with colorful details on the sleeves and a small white pocket.",
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'striped-skirt-and-top',
    images: [
      {
        position: 1,
        src: 'https://burst.shopifycdn.com/photos/woman-in-the-city_925x.jpg'
      }
    ],
    title: 'Striped Skirt and Top',
    body_html: 'Black cotton top with matching striped skirt.',
    vendor: 'Liam Fashions',
    tags: 'women',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
    collections: ['Women']
  },
  {
    handle: 'led-high-tops',
    images: [
      {
        position: 1,
        src:
          'https://burst.shopifycdn.com/photos/putting-on-your-shoes_925x.jpg'
      }
    ],
    title: 'LED High Tops',
    body_html:
      'Black high top shoes with green LED lights in the sole, tied up with laces and a buckle.',
    vendor: 'Liam Fashions',
    tags: 'men',
    published: true,
    requires_shipping: true,
    taxable: true,
    variants: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    collections: ['Men']
  }
]

export default apparel
