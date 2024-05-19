import { useState } from 'react';
import { createProduct } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);


  const navigator = useNavigate();

  function saveProduct(e) {
    e.preventDefault();
  
    const productData = {
      name: name,
      description: description,
      price: price
    };
  
    createProduct(productData, image) // Pass both product data and image separately
      .then((response) => {
        console.log('Product created successfully:', response.data);
        navigator('/administrator');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Add Product</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group row mb-3">
                  <label className="col-sm-4 col-form-label">Product Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      name="name"
                      value={name}
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <label className="col-sm-4 col-form-label">Product Description</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      placeholder="Enter Product Description"
                      name="description"
                      value={description}
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <label className="col-sm-4 col-form-label">Product Price</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      placeholder="Enter Product Price"
                      name="price"
                      value={price}
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <label className="col-sm-4 col-form-label">Product Image</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                </div>
                

                <div className="form-group row mb-3">
                  <div className="col-sm-8 offset-sm-4">
                    <button className="btn btn-success w-100" onClick={saveProduct}>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;