import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import axios from 'axios'

import ProductoList from '../components/ProductoList'
import EditProducto from '../components/EditProducto'
import Producto from '../components/Producto'
import AddProducto from '../components/AddProducto'
import Navbar from '../components/Navbar'

const AppRouter = () => {

    const [productos, setProductos] = useState([])
    const [recaragaProducto, setRecaragaProducto] = useState(true)

    useEffect(() => {
        consultarApi()
        setRecaragaProducto(false)
    }, [recaragaProducto])

    const consultarApi = async () => {
        const url = 'http://localhost:3004/restaurante'
        const res = await axios.get(url)
        const data = res.data
        console.log(data)
        setProductos(data)
    }


    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/"
                    render={() => (
                        <Producto
                            productos={productos}
                            setRecaragaProducto={setRecaragaProducto}
                        />
                    )}
                />
                <Route exact path="/producto/nuevo"
                    render={() => (
                        <AddProducto
                            setRecaragaProducto={setRecaragaProducto}
                        />
                    )}
                />

                <Route exact path="/producto/edit/:id"

                    render={props => {

                        const idProducto = String(props.match.params.id)
                        const producto = productos.filter(producto =>producto.id === idProducto )
                        return (
                            < EditProducto
                                 productos={producto[0]}
                                setRecaragaProducto={setRecaragaProducto}
                            />
                        )
                    }}


                />
            </Switch>
        </Router>
    )
}

export default AppRouter
