import {useState,useRef} from "react";

export default function Form({onTaskCreate}){
    const [formData, setFormData] = useState({
        title: "",
        cost: "",
        catagory: "",        
        image: null
    })
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0)
    const [catagory,setCatagory] = useState("")
    const imageRef = useRef(null);

    // const handleChange = (e)=>{
    //     setProduct(e.target.value)       
    // }
    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;

      value = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
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
                ...formData,
                image: src
            });
            return () => {
                URL.revokeObjectURL(src)
            }
        }

        const handleSubmit=(e)=>{
            if(product.name === "" ){
                return false
            }
             e.preventDefault();
            onTaskCreate &&  onTaskCreate(product);
            setProduct({title:"",
            cost:"",
            image:  null,
            catagory:"", });
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
                    value={product.title}
                    // onChange={(e)=>{setTitle(e.target.value)}}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <lable>Product Price : </lable>
                    <input type="text"
                    placeholder="Enter your product Price"
                    name="name"
                     value={product.price}
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
                    <select name="department"
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