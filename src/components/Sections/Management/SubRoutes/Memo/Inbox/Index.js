import React from "react";
import "./Index.scss";
import { domData } from "../../../DomData";

const Inbox = () => {
  return (
    <>
      {domData.map((data) => {
        const { store, name, price, description, img, size } = data;
        return (
          <>
            <div className="inbox-memo-cont">
              <div className="user-name-inbox">
                <img src={img} alt=" " />

                <div className="user-name-name">
                  <h6>{store}</h6>
                  <p>{name}</p>
                </div>
              </div>

              <div className="user-inbox-details">
                <p>
                  {description} - <span>We know how frustrating it... </span>{" "}
                </p>
              </div>

              <div className="user-inbox-date">
                <p>{size}</p>
              </div>
            </div>
            <div className="line-line"> </div>
          </>
        );
      })}
    </>
  );
};

export default Inbox;
