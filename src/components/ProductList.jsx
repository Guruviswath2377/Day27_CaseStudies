import React , {useState, useffect} from 'react'
import { useEffect } from 'react'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories , setCategories] = useState([])
    const [search , setSearch] = useState('')
    const [category , setCategory] = useState('all')
    const [sort , setSort] = useState('none')


    //Fetch porduts
    useEffect(() =>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(data =>{
            setProducts(data)
            setFilteredProducts(data)
            setCategories([...new Set(data.map(p=>p.category))])

        })
    }, [])
    
    useEffect(()=>{
        let result = [...products];
        if(category !== "all"){
            result=result.filter(p=>p.category === category)
        }

        if(search.trim() != ""){
            result = result.filter(p=>p.title.toLowerCase().includes(search.toLowerCase()))
        }

        if(sort === "low-high"){
            result.sort((a,b)=> a.price-b.price)
        }
        else if(sort === "high-low"){
            result.sort((a,b)=>b.price-a.price)
        }
    
    setFilteredProducts(result)
     }, [search, category, sort, products])
    
    
  return (
    <div className='container my-4'>

  <h1 className='text-center mb-4'>Product Management System</h1>
  //filter
  {/* Filters */}    

<div className='row mb-4'>    

  <div className='col-md-4'>    
    <input 
      type='text' 
      className='form-control' 
      placeholder="Search Products"    
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
    />    
  </div>    

  <div className='col-md-4'>    
    <select 
      className="form-select" 
      value={category}    
      onChange={(e) => setCategory(e.target.value)} 
    >    
      <option value="all">All Categories</option>    
      {categories.map((cat, i) => (    
        <option key={i} value={cat}>    
          {cat}    
        </option>    
      ))}    
    </select>    
  </div>    

  <div className='col-md-4'>    
    <select 
      className='form-select' 
      value={sort}    
      onChange={(e) => setSort(e.target.value)} 
    >    
      <option value="none">Sort by Price</option>    
      <option value="low-high">Low to High</option>    
      <option value="high-low">High to Low</option>    
    </select>    
  </div>    

</div>    



  {/* Product Cards */}
  <div className="row">
    {filteredProducts.map((product) => (
      <div key={product.id} className="col-md-4 mb-4">
        <div className='card h-100 shadow-sm'>
          <img
            src={product.image}
            className='card-img-top p-3'
            alt={product.title}
            style={{ height: "200px", objectFit: "contain" }}
          />
          <div className='card-body d-flex flex-column'>
            <h5 className="card-title">{product.title}</h5>
            <p className='card-text text-truncate'>{product.description}</p>
            <div className='mt-auto'>
              <p className='fw-bold text-success'>${product.price}</p>
              <button className="btn btn-primary w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}

    {filteredProducts.length === 0 && (
      <p className='text-center text-muted'>No product found.</p>
    )}
  </div>
</div>
  )
}

export default ProductList