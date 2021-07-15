import React, { PureComponent } from 'react'

export default class Prueba extends PureComponent {
    render() { 
        let esta;
        esta=(
            this.props.currentTodos.map(l1=>(
                <tr key={l1._id}>
                    <td>{l1.codigo}</td>
                    <td>{l1.descripcion}</td>
                </tr>
            ))
        )
        return (
            <div> 
                <h1>llamada al prueba de datos</h1>
                {esta}
            </div>
        )
    }
}
