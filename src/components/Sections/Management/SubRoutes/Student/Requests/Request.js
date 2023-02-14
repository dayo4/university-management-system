import { Button, Col, Row } from "antd";
import React from "react";
import "./Request.scss";
// import img from ""

const Request = () => {

  const requestData = []
  for (let i = 0; i < 8; i++) {
    requestData.push(
      <Col xs={18} sm={14} md={10} lg={9} className="request-each">
        <div className="req1">
          <img src="./userimg.svg" alt="" />
          <h1>Ademola Johnson</h1>
          <p>ajohnson140@gmail.com</p>
        </div>

        <div className="req2">
          <div className="req2-a">
            <h2>Physiology</h2>
            <p>Department</p>
          </div>
          <div className="req2-b">
            <h2>Clinical Science</h2>
            <p>Faculty</p>
          </div>
        </div>
        <div className="req3">
          <p>Reasons:</p>
          <h2>I have issues paying school and don’t have a sponsor</h2>
        </div>
        <div className="req4">
          <div className="req4-a">
            <h2>Date Applied</h2>
            <p>2!/02/2022</p>
          </div>
          <div className="req4-b">
            <h2>Exit Date</h2>
            <p>2!/02/2022</p>
          </div>
          <div className="req4-c">
            <h2>Return Date</h2>
            <p>2!/02/2022</p>
          </div>
        </div>
        <div className="req5-btns">
          <Button className="accept-btn">Accept</Button>
          <Button className="reject-btn">Reject</Button>
        </div>
      </Col>
    )
  }
  return (
    <Row justify={{xs:'center', md:'space-around'}} className="request-whole-cont">
      {requestData}
    </Row>
  );
};

export default Request;
