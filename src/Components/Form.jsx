import {useState,useRef} from "react";

export default function Form({onTaskCreate}){
    const [product,setProduct] = useState({
        name:"",
        cost:"",
        image:  null,
        catagory:"",
    })
   
    const imageRef = useRef(null);

 
    const handleChange = (e) => {
        let { name, value } = e.target;

      setProduct({
            ...product,
            [name]: value
        });
    }


        const handleImageChange = (e)=>{
            const file = imageRef.current.files[0];
            let src = null;
            if (file) {
                src = URL.createObjectURL(file);
            }
            setProduct({
                ...product,
                image: src
            });
            return () => {
                URL.revokeObjectURL(src)
            }
        }

        const handleSubmit=(e)=>{
            // if(product.name === "" ){
            //     return false
            // }
             e.preventDefault();
             onTaskCreate &&  onTaskCreate(product);
           
        }


    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>Product Name : </lable>
                    <input type="text"
                    placeholder="Enter your product name"
                    name="name"
                  // value={product.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <lable>Product Price : </lable>
                    <input type="text"
                    placeholder="Enter your product Price"
                    name="cost"
                   //  value={product.cost}
                    // onChange={(e)=>setPrice(e.target.value)}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <lable>Product Image: </lable>
                    <input 
                    multiple
                    type="file"
                    ref={imageRef}
                    onChange={handleImageChange}

                    />
                </div>
                <div>
                    <lable>Product Catagory : </lable>
                    <select name="catagory"
                         value={product.catagory}
                        // onChange={(e)=>setCatagory(e.target.value)}
                        onChange={handleChange}
                    >
                         <option value="" key="1">
                            Select
                        </option>
                        <option key="FRU" value="fruits">fruits</option>
                        <option key="VEG" value="vegetables">vegetables</option>
                        <option key="PRO" value="provisions">provisions</option>
                    </select>
                </div>
                <input type="submit" value="SUBMIT" />
            </form>
        </div>
        </>
    )
}