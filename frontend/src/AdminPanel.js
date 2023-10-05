import { useState } from 'react';
import { createProduct } from '../api';

function AdminPanel() {
  const [actualURL, setActualURL] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    const data = await createProduct({ actualURL, image, price });
    console.log(data);
  };

  return (
    <div>
      {/* Your input fields here */}
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}
