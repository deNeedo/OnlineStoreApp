import React from "react";

const Table = ({data}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
                {data.map((item) => (
                <tr key={item.id_item}>
                    <td> {item.item_name} </td>
                    <td> {item.type} </td>
                </tr>
                ))}
            </tbody>

        </table>

)}

export default Table;