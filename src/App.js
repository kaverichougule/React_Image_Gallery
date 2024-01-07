import "./App.css";
import Search from "./Components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

import ImageListShimmer from "./Components/ImageListShimmer";
function App() {
  document.title = "Image Gallery";
  let [limit, setLimit]=useState(5);
  let [pageCount,setPageCount]=useState(5);
  const accessKey = "nHfRguxoG2Z1zahAoTf73tz9PcMFSZz809Li1nuNSCA";
  const [searchTerm, setSearchTerm] = useState("");
  const [getData, setData] = useState([]);
  const [getSearchedData, setSearchedData] = useState([]);
  let toCompareSearchTerm=searchTerm;
  useEffect(() => {
    let fetchData = async () => {
      try {
        if (searchTerm == "") {
          console.log(pageCount);

          const res = await axios.get(
            `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${pageCount}`   
          );
          setData((prev)=>[...prev,...res.data]);
        } else {
          const res = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchTerm}&_limit=${limit}$_page=${pageCount}`,
            {
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            }
          );
          setSearchedData((pre)=>[...pre,...res.data.results]);
        }
      } catch (err) {
        console.log("Error in fetching Data: ", err);
      }
    };
    fetchData();
  }, [searchTerm,pageCount]);
  console.log(searchTerm);
  async function HandlingInfiniteScroll(){
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
        setSearchedData={setSearchedData}
        searchVal={setSearchTerm}
      />

      <ImageListShimmer getData={getData} />
      <div className="gallery">
        <ul className="images">
          {(searchTerm=="")?
            getData.map((ele) => {
              return (
                <li class="card">
                  <img src={ele.urls.full} loading="lazy" alt="" />
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
            }):
            getSearchedData.map((ele) => {
              return (
                <li class="card">
                  <img src={ele.urls.full} loading="lazy" alt="" />
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
