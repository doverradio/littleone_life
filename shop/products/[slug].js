import Head from 'next/head';
import { useRouter } from 'next/router';
import { connectToDatabase } from '../../../utils/mongodb';

const ProductPage = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.name} - My Shop</title>
        <meta name="description" content={`Buy ${product.name} now!`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={`Buy ${product.name} now!`} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={`https://shop.littleone.life/product/${product.slug}`} />
      </Head>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* Other product details */}
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const product = await db.collection('products').findOne({ slug: params.slug });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductPage;
