import Item from "./Item";
import "./Items.scss";

export default function Items(props) {
  const items = props.items.map((item) => {
    if (item.inventoryId === "Flask") {
    } else {
      return <Item windowWidth={props.windowWidth} item={item} />;
    }
  });

  return (
    <div className="inventory-container">
      <span>{items}</span>
    </div>
  );
}
