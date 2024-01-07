import "./App.css";
import Search from "./Components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  document.title = "Image Gallery";
  let [limit, setLimit]=useState(5);
  let [pageCount,setPageCount]=useState(5);
  const accessKey = "6Ggmw-uddPXhyrcGm53KFaNXGsdnWR3NRjVQy4nq5Z0";
  const [searchTerm, setSearchTerm] = useState("");
  const [getData, setData] = useState([]);
  const [prevSearch,setprevSearch]=useState("");
  useEffect(() => {
    let fetchData = async () => {
      try {
        if (searchTerm == "") {
          console.log(pageCount);

          const res = await axios.get(
            `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${pageCount}`   
          );
          setData((prev)=>[...prev,...res.data]);
        }else {
          const res = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchTerm}&_limit=${limit}&page=${pageCount}`,
            {
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            }
          );
          if(prevSearch==searchTerm){
            setData((prev)=>[...prev,...res.data.results]);
          }
          else{
            console.log("Hiiiiiiiiiii");
            setData(res.data.results);
          }
        }
      } catch (err) {
        console.log("Error in fetching Data: ", err);
      }
    };
    fetchData();
  }, [searchTerm,pageCount]);
  console.log(searchTerm);
 function HandlingInfiniteScroll(){
    try{
      if((document.documentElement.scrollTop+document.documentElement.clientHeight+1)>=document.documentElement.scrollHeight){
        setPageCount((prv)=>prv+1);
      }
    }
    catch(err){
      console.log("NextPage",err);
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",HandlingInfiniteScroll);
  },[])
  return (
    <div className="App">
      <Search
        accessKey={accessKey}
        setData={setData}
        searchVal={setSearchTerm}
        searchTerm={searchTerm}
        setprevSearch={setprevSearch}
      />

      <div className="gallery">
        <ul className="images">
          {
            getData.map((ele) => {
              return (
                <li class="card">
                  <img src={ele.urls.small} loading="lazy" alt="" />
                  <div class="details">
                    <div class="photographer">
                      <span>{ele.user.first_name}</span>
                      {
                      
                        ((ele.alt_description).length<50)? <span>{ele.alt_description}</span>:
                        <span></span>
                      }                    
                      <span>{ele.created_at}</span>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
