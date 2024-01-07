import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
function Search(props) {
//   const [searchTerm, setSearchTerm] = useState("");
  const [prevSearch,setprevSearch]=useState("");
  function SearchTheImage(e){
    e.preventDefault();
    let result=e.target.children[1].value;
    // if(result===""){
    //     props.searchVal("random");
    // }
    // else{
    //     props.searchVal(result)
    // }
    props.searchVal(result)    
  }
  return (
    <div class="section1">
      <h1 class="heading">Artistic Array</h1>
      <h3 class="subheading">Discover, Download, Delight</h3>
      <form action="" onSubmit={SearchTheImage}>
        <i class="uil uil-search"></i>
        <input type="text" placeholder="Search Images" id="search-img"  />
        <button class="search">Search</button>
      </form>
    </div>
  );
}

export default Search;
