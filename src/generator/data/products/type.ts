type Product = {
  handle: string;
  images: [
    {
      position: number;
      src: string;
    }
  ];
  title: string;
  body_html: string;
  vendor: string;
  tags: string;
  published: boolean;
  requires_shipping: boolean;
  taxable: boolean;
  variants: string[];
  collections: string[];
}
