import React from "react";

export default function ImageListShimmer(props) {
  return (
    <div className="gallery">
        <ul className="images">
          {props.getData.map((ele) => {
            return (
              <li class="card">
                <img src="" loading="lazy" alt="" />
                <div class="details">
                  <div class="photographer">
                    <span></span>
                    <span></span>
                                     
                    <span></span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
  );
}
