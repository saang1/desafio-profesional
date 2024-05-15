import { useState } from 'react'



const Product = () => {

  const[name, setName] = useState('')
  const[description, setDescription] = useState('')
  const[price, setPrice] = useState('')

  function handleName(e){
    setName(e.target.value);
  }

  function handleDescription(e){
    setDescription(e.target.value);
  }

  function handlePrice(e){
    setPrice(e.target.value);
  }

  function saveProduct(e){
    e.preventDefault();

    const product = {name,description,price}
    console.log(product);
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3 '>
          <h2 className='text-center'>Add Product</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-lavel'>Product Name</label>
                <input 
                  type='text'
                  placeholder='Enter Product Name'
                  name='name'
                  value={name}
                  className='form-control'
                  onChange={handleName}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-lavel'>Product Description</label>
                <input 
                  type='text'
                  placeholder='Enter Product Description'
                  name='description'
                  value={description}
                  className='form-control'
                  onChange={handleDescription}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-lavel'>Product Price</label>
                <input 
                  type='text'
                  placeholder='Enter Product Price'
                  name='price'
                  value={price}
                  className='form-control'
                  onChange={handlePrice}
                />
              </div>

              <button className='btn btn-success' onClick={saveProduct} >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product