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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const getMemos = async () => {
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))
    setploading(true);

    const data = {
      apptoken: apptoken,
      usertoken,
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/management/listMemo`, data)
      .then((res) => {
        console.log(res)
        if (res.data.success == false) {
          message.error('unable to get data!')
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
      key: 'star',
      render: (value, record) => (
        <span onClick={onStarClicked} className="StarredIcon" id={record.key} >
          {
            starred[record.key] ?
              <Icon path={mdiStar}
                size={1}
              /> :
              <Icon path={mdiStarOutline}
                size={1}
              />
          }
        </span>
      ),
      className: 'StarredMsg'
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
  ];


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
            <Table rowSelection={rowSelection} scroll={{ x: '100%' }} className='InboxTable' columns={tableColumns} dataSource={
              memoList.map((memo, i) => {
                return {
                  key: i,
                  name:  'Adeola Mercy',
                  subject: memo.subject,
                  period: memo.timeago.split(',')[0] + ' ago',
                }
              })
            } />
          </Col>
        </Row>

      )}
    </div>
  );
};

export default forwardRef(Inbox);
