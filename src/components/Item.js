import { Popover, OverlayTrigger, Badge } from "react-bootstrap";

import className from "classnames";

import "./Item.scss";

export default function Item(props) {
  // label of item
  const pillType = className({
    success:
      props.item.inventoryId === "Ring" ||
      props.item.inventoryId === "Ring2" ||
      props.item.inventoryId === "Amulet",
    danger:
      props.item.inventoryId === "Offhand" ||
      props.item.inventoryId === "Offhand2" ||
      props.item.inventoryId === "Weapon" ||
      props.item.inventoryId === "Weapon2",
    warning: props.item.inventoryId,
  });

  const itemType = className({
    // inventory position
    item: props.item.inventoryId,
    flask: props.item.inventoryId === "Flask",
    helm: props.item.inventoryId === "Helm",
    armour: props.item.inventoryId === "BodyArmour",
    gloves: props.item.inventoryId === "Gloves",
    boots: props.item.inventoryId === "Boots",
    ring: props.item.inventoryId === "Ring",
    ring2: props.item.inventoryId === "Ring2",
    offhand: props.item.inventoryId === "Offhand",
    amulet: props.item.inventoryId === "Amulet",
    belt: props.item.inventoryId === "Belt",
    weapon: props.item.inventoryId === "Weapon",
    trinket: props.item.inventoryId === "Trinket",
    hidden:
      props.item.inventoryId === "Weapon2" ||
      props.item.inventoryId === "Offhand2",
    unique: props.item.frameType === 3,
    rare: props.item.frameType === 2,
    magic: props.item.frameType === 1,
    normal: props.item.frameType === 0,
  });

  const itemRarity = className({
    unique: props.item.frameType === 3,
    rare: props.item.frameType === 2,
    magic: props.item.frameType === 1,
    normal: props.item.frameType === 0,
  });

  // responsive css - popover oriented above for small screens
  const popoverOrientation = className({
    top: props.windowWidth < 700,
    left: props.windowWidth >= 700,
  });

  let implicitMods;
  if (props.item.implicitMods) {
    implicitMods = props.item.implicitMods.map((mod) => {
      return <div className="implicit-mod">{mod}</div>;
    });
  }

  let explicitMods;
  if (props.item.explicitMods) {
    explicitMods = props.item.explicitMods.map((mod) => {
      return <div className="explicit-mod">{mod}</div>;
    });
  }

  let properties;

  if (props.item.inventoryId === "Flask") {
    if (props.item.properties) {
      properties = props.item.properties.map((property) => {
        if (property.values[0]) {
          const textColor = className({
            simple: property.values[0][1] === 0,
            augmented: property.values[0][1] === 1,
            fire: property.values[0][1] === 2,
            cold: property.values[0][1] === 3,
            lightning: property.values[0][1] === 4,
            chaos: property.values[0][1] === 5,
          });
          return (
            <div className="property">
              {property.name}:{" "}
              <span className={textColor}>{property.values[0][0]}</span>
            </div>
          );
        } else {
          return <div className="property">{property.name}</div>;
        }
      });
    }
  }
  // each property has an array of values determing text colour and the name of the property
  // values [0]: ['string' (name of property), num (text color)]
  if (props.item.properties) {
    properties = props.item.properties.map((property) => {
      if (property.values[0]) {
        const textColor = className({
          simple: property.values[0][1] === 0,
          augmented: property.values[0][1] === 1,
          fire: property.values[0][1] === 2,
          cold: property.values[0][1] === 3,
          lightning: property.values[0][1] === 4,
          chaos: property.values[0][1] === 5,
        });
        // if the property has placeholders for the values then this will replace the
        // placeholders with those values
        // only used for flasks
        let combindProperty;
        if (property.name.includes("{0}")) {
          combindProperty = property.name.replace("{0}", property.values[0][0]);
          if (property.name.includes("{1}")) {
            combindProperty = combindProperty.replace(
              "{1}",
              property.values[1][0]
            );
          }
          return <div className="property">{combindProperty}</div>;
        }

        return (
          <div className="property">
            {property.name}:{" "}
            <span className={textColor}>{property.values[0][0]}</span>
          </div>
        );
      } else {
        return <div className="property">{property.name}</div>;
      }
    });
  }

  let requirements;

  if (props.item.requirements) {
    requirements = props.item.requirements.map((requirement) => {
      return (
        <span className="requirement">
          {requirement.name}{" "}
          <span className="simple">{requirement.values[0][0]}</span>
        </span>
      );
    });
  }

  let utilityMods;
  if (props.item.utilityMods) {
    utilityMods = props.item.utilityMods.map((utilityMod) => {
      return <div className="implicit-mod">{utilityMod}</div>;
    });
  }

  let craftedMods;
  if (props.item.craftedMods) {
    craftedMods = props.item.craftedMods.map((craftedMod) => {
      return <div className="crafted-mod">{craftedMod}</div>;
    });
  }

  let enchantMods;
  if (props.item.enchantMods) {
    enchantMods = (
      <div className="crafted-mod">
        <i>{props.item.enchantMods}</i>
      </div>
    );
  }

  let fracturedMods;
  if (props.item.fracturedMods) {
    fracturedMods = props.item.fracturedMods.map((fracturedMod) => {
      return <div className="fracturedMod">{fracturedMod}</div>;
    });
  }

  let flavourText;
  if (props.item.flavourText) {
    flavourText = (
      <div className="flavour">
        <i>{props.item.flavourText}</i>
      </div>
    );
  }

  let influenced;
  let crusader;
  let redeemer;
  let hunter;
  let warlord;

  if (props.item.influences) {
    influenced = true;

    crusader = props.item.influences.crusader ? (
      <div className="crusader">
        <i>Crusader Influenced</i>
      </div>
    ) : null;

    redeemer = props.item.influences.redeemer ? (
      <div className="redeemer">
        <i>Redeemer Influenced</i>
      </div>
    ) : null;

    hunter = props.item.influences.hunter ? (
      <div className="hunter">
        <i>Hunter Influenced</i>
      </div>
    ) : null;

    warlord = props.item.influences.warlord ? (
      <div className="warlord">
        <i>Warlord Influenced</i>
      </div>
    ) : null;
  }

  const elder = props.item.elder ? (
    <div className="elder">
      <i>Elder Influenced</i>
    </div>
  ) : null;

  const shaper = props.item.shaper ? (
    <div className="shaper">
      <i>Shaper Influenced</i>
    </div>
  ) : null;

  const fractured = props.item.fractured ? (
    <div className="corrupted">
      <i>Fractured</i>
    </div>
  ) : null;

  const corrupted = props.item.corrupted ? (
    <div className="corrupted">
      <i>Corrupted</i>
    </div>
  ) : null;

  const popover = (
    <Popover id={itemRarity} style={{ minWidth: "300px" }}>
      <Popover.Title className="item-title">
        <b>{props.item.name || null}</b>
        {props.item.typeLine && (
          <div>
            <b>{props.item.typeLine}</b>
          </div>
        )}
      </Popover.Title>
      <Popover.Content style={{ minHeight: "75px" }}>
        <div className="item-pills">
          <h6>
            <Badge pill variant={pillType}>
              {props.item.inventoryId}
            </Badge>{" "}
          </h6>
          <h6>
            <Badge pill variant="dark">
              iLevel: {props.item.ilvl}
            </Badge>{" "}
          </h6>
        </div>

        {properties && <div className="item-separator" />}
        {properties}
        {/* {requirements && <div className="item-separator" />}
        {requirements && <span className="requirement">Requires</span>}
        {requirements} */}
        {utilityMods && <div className="item-separator" />}
        {utilityMods}
        {enchantMods && <div className="item-separator" />}
        {enchantMods}
        {implicitMods && <div className="item-separator" />}
        {implicitMods}
        {explicitMods && <div className="item-separator" />}
        {fracturedMods}
        {explicitMods}
        {craftedMods}
        {influenced && <div className="item-separator" />}
        {elder}
        {shaper}
        {crusader}
        {hunter}
        {redeemer}
        {warlord}
        {/* {fractured && <div className="item-separator"/>}
        {fractured} */}
        {corrupted && <div className="item-separator" />}
        {corrupted}
        {flavourText && <div className="item-separator" />}
        {flavourText}
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={itemType}>
      <OverlayTrigger
        trigger="hover"
        placement={popoverOrientation}
        overlay={popover}
      >
        <img className="icon" src={props.item.icon} />
      </OverlayTrigger>
    </div>
  );
}
