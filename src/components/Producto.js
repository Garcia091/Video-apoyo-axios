import React from 'react'
import ProductoList from './ProductoList'

const Producto = ({ productos, setRecaragaProducto }) => {
    return (
        <div>
            <ProductoList
                productos={productos}
                setRecaragaProducto={setRecaragaProducto}
            />
        </div>
    )
}

export default Producto
