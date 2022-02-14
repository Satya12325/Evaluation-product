
import './App.css';
import Form from "./Components/Form";
import Table from "./Components/Table";
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);
  const [page,setPage]= useState(1);
  const [catagory,setCatagory]=useState({
    dept: "Show All"
  })

  
  const getData=(page)=>{
    fetch(`http://localhost:3000/product?_limit=3&_page=${page}`)
      .then(res => res.json())
      .then((res) => {
        setData([...res]);
      })
      .catch((err) => {
        console.log(err)
      })
      setData([])
  }
  useEffect(() => {
      getData(page);
  }, [page])


  const handleTask = async ({ name,cost,image,catagory }) => {
    const payload = {
      title: name,
      cost: cost,
      image: image,
      catagory:catagory,
     

    }

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    await fetch(`http://localhost:3000/product`, config)
    getData()
  }
  const handleDept=(dept)=>{
    setCatagory({dept: dept})
 }
 
 const handlePage=(e)=>{
  switch(e.target.name){
    case "Prev":
      if(page<=1)
      {
        setPage(1);
      }
      else{
        setPage((prev)=>prev-1);
      }
      break;
    case "Next":
      setPage((next)=>next+1);
      break;
    default:
      break;
  }
}
  return (
    <div className="App">
      <h1>
        Product details Form
      </h1>
      <div>
        <Form onTaskCreate={handleTask} />
      </div>
      <div>
        Catagory : {" "}
        {
          ["show All","Vagetable","Fruits","Provisions"].map((item) =>{
            return <button key={item} onClick={()=>handleDept(item)}>{item}</button>
          })
        }
      </div>
      <div>
        <Table
        data = {data.filter((cat)=>{
          if(catagory.dept === "Show All")
          {
            return "Show All"
          }
          return cat.catagory === catagory.dept;
        })}
        />
      </div>
      {
        <div >
            <button name="Prev" onClick={(e)=>handlePage(e)}>Prev</button>
            <h5>{page}</h5>
            <button name="Next" onClick={(e)=>handlePage(e)}>Next</button>
        </div>
      }
    </div>
  );
}

export default App;
