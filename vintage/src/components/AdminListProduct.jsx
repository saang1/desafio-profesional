import { ListProducts } from '../services/ProductService'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminListProduct = () => {

  const [products, setProducts] = useState([])

  const navigator = useNavigate();

  useEffect(() => {
    ListProducts().then((response) => {
      setProducts(response.data);
    }).catch(error => {
      console.error(error);
    })

  }, [])

  function addNewProduct(){
    navigator('/new-product')
  }

  return (
    <div className='container'>

      <h2 className='text-center'>Inventory</h2>
      
      <button className='btn btn-primary mb-2' onClick={addNewProduct}>Add Product</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Image</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                {product.image && (
                  <img src={`data:image/png;base64,${product.image}`} alt={product.name} style={{ maxWidth: '100px' }} />
                )}
                </td>
                <td>{product.price}</td>
              </tr>)
          }
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminListProduct