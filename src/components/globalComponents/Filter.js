import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Row, Select, Space } from "antd";
import "./Filter.scss"
import Icon from '@mdi/react';
import {
    mdiClose,
    mdiFilterOutline,
} from '@mdi/js';


const Filter = ({ toggleFilter, closeFilter,  }) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData"))
    );
    const [facultiesList, setFacultiesList] = useState([]);

    useEffect(() => {

    }, []);


    return (
        toggleFilter ?
                (
                    <div className="FilterCont">
                    <Row justify={{ xs: 'start', sm: 'space-between' }} align={'middle'} className="Filter">
                        <Col xs={24} md={11} style={{ marginTop: '10px' }}>
                            <div className="FilterItem">
                                <div className='Label'>Faculty</div>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%'
                                    }}
                                    placeholder="Select A Faculty"
                                    optionFilterProp="children"
                                    // onChange={onFacultyChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={facultiesList.map((fac) => {
                                        return {
                                            value: fac.id,
                                            label: fac.faculty,
                                        }
                                    })}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={11} style={{ marginTop: '10px' }}>
                            <div className="FilterItem">
                                <div className='Label'>Department</div>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%'
                                    }}
                                    placeholder="Select Department"
                                    optionFilterProp="children"
                                    // onChange={onFacultyChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[]}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={11} style={{ marginTop: '10px' }}>
                            <div className="FilterItem">
                                <div className='Label'>Level</div>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%'
                                    }}
                                    placeholder="Select Level"
                                    optionFilterProp="children"
                                    // onChange={onFacultyChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[]}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={11} style={{ marginTop: '10px' }}>
                            <div className="FilterItem">
                                <div className='Label'>Session</div>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%'
                                    }}
                                    placeholder="Select Session"
                                    optionFilterProp="children"
                                    // onChange={onFacultyChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[]}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={11} style={{ marginTop: '10px' }}>
                            <div className="FilterItem">
                                <div className='Label'>Hostel</div>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%'
                                    }}
                                    placeholder="Select Hostel"
                                    optionFilterProp="children"
                                    // onChange={onFacultyChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row justify={'center'} align={'middle'} className={'FilterBtns'}>
                        <Button
                        onClick={()=> closeFilter()}
                        style={{marginRight:'10px'}}
                            icon={<Icon path={mdiClose} size={0.9} />}
                        >
                            Clear
                        </Button>
                        <Button
                            icon={<Icon path={mdiFilterOutline} size={0.9} />}
                        >
                            Apply
                        </Button>
                    </Row>
                </div>
        
                ) : ('')
        
    );
};

export default Filter;
