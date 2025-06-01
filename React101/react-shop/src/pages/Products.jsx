import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([{}])

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch('https://fakestoreapi.com/products').then((result) => {
        result.json().then(prods => {
          setProducts(prods);
          console.log(prods);
        });
      }).catch((err) => {
        console.error(err);
      });
    }

    fetchProducts();
  }, [])
  

  return (
    <>
      <div className="row p-3">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {products.map(prod => 
            <div className="card" style={{ width: '21.65rem', height: '19rem', maxHeight: '19rem', overflow: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">{prod.title}</h5>
                <p className="card-text" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{prod.description}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
