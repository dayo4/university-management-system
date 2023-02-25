import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import "./Index.scss";
import { domData } from "../../../DomData";
import AppLoader from "../../../../../../Loader";
import axios from "axios";
import Icon from "@mdi/react";
import {
  mdiAccountCircle,
  mdiStar,
  mdiStarOutline,
} from "@mdi/js";
import { Col, Row, Table } from "antd";


const Inbox = (props, ref) => {
  const [ploading, setploading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [starred, setStarred] = useState({});
  const [memoList, setMemoList] = useState([]);

  useImperativeHandle(ref, () => ({
    refreshMemos() {
      getMemos()
    }
  }), [])

  const getMemos = async () => {
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))
    setploading(true);

    const data = {
      apptoken: apptoken,
      usertoken,
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/management/listDraftMemo`, data)
      .then((res) => {
        console.log(res)
        if (res.data.success == false) {
          message.error('unable to get memo data!')
        } else {
          setMemoList(res.data.data);
        }

        setploading(false);
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          getMemos();
        }, 20000);
      });
  };

  useEffect(() => {
    getMemos()
  }, []);

  const tableColumns = [
    {
      dataIndex: 'image',
      key: 'image',
      className: 'UserImage'
    },
    {
      dataIndex: 'name',
      key: 'name',
      className: 'UserName',
    },
    {
      dataIndex: 'subject',
      key: 'subject',
      className: 'Subject'
    },
    {
      dataIndex: 'period',
      key: 'period',
      className: 'Period'
    },
    // {
    //   key: 'star',
    //   render: (value, record) => (
    //     <span onClick={onStarClicked} className="StarredIcon" id={record.key} >
    //       {
    //         starred[record.key] ?
    //           <Icon path={mdiStar}
    //             size={1}
    //           /> :
    //           <Icon path={mdiStarOutline}
    //             size={1}
    //           />
    //       }
    //     </span>
    //   ),
    //   className: 'StarredMsg'
    // },
  ];

  /* Table Data */
  const tableData = []
  for (let i = 0; i < memoList.length; i++) {
    tableData.push(
      {
        key: i,
        image: <Icon path={mdiAccountCircle} size={1.4} />,
        name: 'Adeola Mercy',
        subject: memoList[i].subject,
        period: memoList[i].timeago.split(',')[0] + ' ago',
      }
    )
  }

  function onStarClicked(e) {
    let target = e.target.closest('.StarredIcon').id
    let stars = starred

    if (stars[target]) {
      stars[target] = false
    }
    else {
      stars[target] = true
    }

    setStarred((state) => ({
      ...stars
    }))
  }


  return (
    <div>
      {ploading ? (
        <AppLoader nameloader={"Staff"} loading={ploading} />
      ) : (

        <Row>
          <Col xs={24}>
            <Table scroll={{ x: '100%' }} className='InboxTable' columns={tableColumns} dataSource={tableData} />
          </Col>
        </Row>

      )}
    </div>
  );
};

export default forwardRef(Inbox);
