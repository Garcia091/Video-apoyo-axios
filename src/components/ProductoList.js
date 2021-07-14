import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'


const ProductoList = ({ productos, setRecaragaProducto }) => {

const handelDelete = async(id) => {

    const url = `http://localhost:3004/restaurante/${id}`
    const resultado = await axios.delete(url)
    setRecaragaProducto(true)
}


    return (
        <div className="container text-center">
            <h1 className="text-center mt-5">Información del producto</h1>
            <table class=" table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">categoría</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(producto => {
                            return (
                                <tr key={producto.id}>
                                    <th scope="row">{producto.id}</th>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.categoria}</td>
                                    <td>
                                        <Link  to={`/producto/edit/${producto.id}`}
                                            className="btn btn-success mr-2"
                                        >
                                         Editar
                                        </Link>

                                        <button 
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={()=>handelDelete(producto.id)}
                                            > Eliminar &times;
                                        
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductoList
