import axios from 'axios'
import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

const EditProducto = ({ history, productos, setRecaragaProducto }) => {

    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        categoria: ''
    })

    const nonmbreRef = useRef('')
    const precioRef = useRef('')

    const { nombre, precio, categoria } = form

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const actualizarProducto = async (e) => {
        e.preventDefault();

        const nuevoNombre = nonmbreRef.current.value,
            nuevoPrecio = precioRef.current.value;

        if (nuevoNombre === '' || nuevoPrecio === '') {
            setError(true)
            Swal.fire({
                type: 'error',
                title: error,
                text: 'Hubo un error'
            })

            return
        }

        let categoriaPlatillo = (categoria === '') ? productos.categoria : categoria;

        console.log("categoriaPlatillo", categoriaPlatillo)

        setError(false)

        const editData = {
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            categoria: categoriaPlatillo

        }


        try {
            const url = `http://localhost:3004/restaurante/${productos.id}`
            const resultado = await axios.put(url, editData)

            if (resultado.statusText === 'ok') {
                Swal.fire(
                    'Producto editado',
                    'El producto se editó correctamente',
                    'success'
                )
            }

        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
            })
        }
        setRecaragaProducto(true)
        history.push('/')
    }
    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

            <form
                className="mt-5"
                onSubmit={actualizarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nonmbreRef}
                        defaultValue={productos.nombre}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioRef}
                        defaultValue={productos.precio}
                        onChange={handleInputChange}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            defaultChecked={(productos.categoria === 'postre')}
                            onChange={handleInputChange}

                        />
                        <label className="form-check-label">
                            Postre
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            defaultChecked={(productos.categoria === 'bebida')}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                            Bebida
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="carnes"
                            defaultChecked={(productos.categoria === 'carnes')}
                            onChange={handleInputChange}

                        />
                        <label className="form-check-label">
                            Carnes
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            defaultChecked={(productos.categoria === 'ensalda')}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                            Ensalada
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="plato típico"
                            defaultChecked={(productos.categoria === 'plato típico')}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                        plato típico
                        </label>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
                </div>
            </form>
        </div>
    )
}

export default withRouter(EditProducto)
