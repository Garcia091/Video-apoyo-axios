import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const AddProducto = ({ setRecaragaProducto }) => {

    const history = useHistory()
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        categoria: ''
    })

    const { nombre, precio, categoria } = form

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const agregarProducto = async (e) => {
        e.preventDefault()

        if (nombre === '' || precio === '' || categoria === '') {
            setError(true)
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
            })
        }
        else {
            setError(false)

            try {
                const url = 'http://localhost:3004/restaurante'
                const resultado = await axios.post(url, {
                    nombre,
                    precio,
                    categoria
                })

                if (resultado.status === 201) {
                    Swal.fire(
                        'Producto creado',
                        'El producto se creo correctamente',
                        'success'
                    )
                }

            } catch (error) {
                console.log(error)
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error'
                })
            }
        }

        setRecaragaProducto(true)
        history.push('/')
    }


    return (
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Agregar Producto</h1>
            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        onChange={handleInputChange}
                        value={nombre}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={handleInputChange}
                        value={precio}
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
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                            Plato típico
                        </label>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
                </div>
            </form>
        </div>
    )
}

export default AddProducto
