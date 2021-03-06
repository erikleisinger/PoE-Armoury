import "./Skill.scss";

import { Popover, OverlayTrigger } from "react-bootstrap";

// outputs an individual skill with all of the appropriate lines of text
export default function Skill(props) {
  const name = props.gem.typeLine;

  let gemType;
  // will change the container of the gem to be either square for active
  // or circle for support
  if (props.gem.support) {
    gemType = "support";
  } else {
    gemType = "activeGem";
  }

  let properties;

  if (props.gem.properties) {
    properties = props.gem.properties.map((property) => {
      if (property.values[0]) {
        return (
          <div className="property">
            {property.name}: <span>{property.values[0][0]}</span>
          </div>
        );
      } else {
        return <div className="property">{property.name}</div>;
      }
    });
  }

  let requirements;

  if (props.gem.requirements) {
    requirements = props.gem.requirements.map((requirement) => {
      return (
        <span className="requirement">
          {requirement.name}{" "}
          <span className="simple">{requirement.values[0][0]}</span>
        </span>
      );
    });
  }
  let additionalProperties;

  if (props.gem.additionalProperties) {
    additionalProperties = props.gem.additionalProperties.map((property) => {
      if (property.values[0]) {
        return (
          <div className="property">
            {property.name}: <span>{property.values[0][0]}</span>
          </div>
        );
      } else {
        return <div className="property">{property.name}</div>;
      }
    });
  }
  let secDescrText = props.gem.secDescrText;

  let explicitMods;

  if (props.gem.explicitMods) {
    explicitMods = props.gem.explicitMods.map((mod) => {
      return <div className="explicit-mod">{mod}</div>;
    });
  }
  let descrText = props.gem.descrText;

  let corrupted = props.gem.corrupted ? (
    <div className="corrupted">
      <i>Corrupted</i>
    </div>
  ) : null;

  // some lines arent used but can be enabled if we want them to be seen later

  const popover = (
    <Popover style={{ minWidth: "300px" }}>
      <Popover.Title className="item-title">
        {props.gem.typeLine && (
          <div>
            <b>{props.gem.typeLine}</b>
          </div>
        )}
      </Popover.Title>
      <Popover.Content style={{ minHeight: "75px" }}>
        {properties}
        {/* {requirements && <div className="item-separator"/>}
      {requirements && <span className="requirement">Requires</span>}
      {requirements} */}
        {additionalProperties && <div className="item-separator" />}
        {additionalProperties}
        {/* {secDescrText && <div className="item-separator"/>}
      {secDescrText} */}
        {explicitMods && <div className="item-separator" />}
        {explicitMods}
        {/* {descrText && <div className="item-separator"/>}
      {descrText} */}
        {corrupted && <div className="item-separator" />}
        {corrupted}
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={gemType}>
      <OverlayTrigger trigger="hover" overlay={popover}>
        <img className="icon" src={props.gem.icon} />
      </OverlayTrigger>
    </div>
  );
}
