import './Items.scss'
import Item from './Item'
import className from 'classnames'


export default function Items (props) {
  
  const items = props.items.map((item) => {  
      return <Item item={item}/>
  })
 
  return <div className="inventory-container">
      {items}
  </div>
}