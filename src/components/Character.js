import React from 'react';
import Items from './Items';
import Flasks from './Flasks'
import './Character.scss'

import { Row, Col } from 'react-bootstrap'


import {Tabs, Tab} from 'react-bootstrap'


export default function Character(props) {
  console.log(props.character.character)
  const className = props.character.character.class
  console.log(typeof(className))
  const classIcon = `/icons/${className.toLowerCase()}_icon.png`
  return (
    <div className="container char" style={{borderRadius: '10px', overflow: 'hidden'}}>
      <Row className="p-5 char-title">
        <Col lg="auto"><img src={classIcon} alt={props.character.character.class}/></Col>
        <Col lg={5} className="my-auto">
          <h1 style={{backgroundColor: "rgba(0,0,0,0.5)"}}>{props.character.character.name}</h1>
          <h5 style={{backgroundColor: "rgba(0,0,0,0.5)"}}>{props.character.character.level} | {props.character.character.class}</h5>
          </Col>
         
      </Row>
      <Row className="p-3" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Col>skills</Col>
        
        <Col>
          <Row>
            <Items items={props.character.items}/>
            {props.view === 'character' && <button onClick={props.toggleView}><span>Back</span></button>}
          </Row>
          <Row>
           <Col>
           <Flasks items={props.character.items} />
           
          </Col>
           </Row>
        </Col>
      
      </Row>
    
    </div>
  );
};