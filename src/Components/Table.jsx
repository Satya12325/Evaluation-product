
import styled from "styled-components"

export default function Table({data}){
    const Table = styled.table`
    border: 1px solid black;
    margin:auto;
    `;


    return(
        <>
        <table>
            <Table>
                <tr>
                    <th>No.</th>
                <th>Product Name</th>
                <th>Price</th>
               
                <th>Image</th>
               <th>Catagory</th>
                </tr>
            { data.map((item) => {
            return <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.cost}</td>                
                <td><img width="100px" src={item.image} alt="" /></td>
                <td>{item.catagory}</td>
                </tr>
            })}
            </Table>
        </table>
        </>
    )
}