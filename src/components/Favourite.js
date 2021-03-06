import { useState } from "react";

import "./Favourite.scss";
import { AiFillDelete } from "react-icons/ai";

export default function Favourite(props) {
  // setting the deleted/not deleted msgs
  const [msg, setMsg] = useState(null);
  // for delete transitions
  const [deleted, setDeleted] = useState(false);

  async function handleRemoveFavourite(name) {
    setDeleted(true);
    setTimeout(async () => {
      setDeleted(false);
      setMsg(null);
      await props.removeFavourite(name);
    }, 2000);
  }

  function removeCheck() {
    setMsg("Are you sure you want to delete?");
  }
  // for clicking a character and going to their character page
  const handleCharacterChange = function (account, character, id) {
    props.getCharacter(account, character);
  };

  const classIcon = `/icons/${props.fav.class.toLowerCase()}_icon.png`;

  if (!msg) {
    return (
      <tr id="favouriteList" className="d-flex">
        <td
          className="col-3"
          onClick={(e) => {
            e.preventDefault();
            handleCharacterChange(
              props.fav.account_name,
              props.fav.name,
              props.fav.id
            );
          }}
        >
          <div>
            <img src={classIcon} alt={props.fav.class} /> {props.fav.class}
          </div>
        </td>
        <td
          className="col-3"
          onClick={(e) => {
            e.preventDefault();
            handleCharacterChange(
              props.fav.account_name,
              props.fav.name,
              props.fav.id
            );
          }}
        >
          {props.fav.name}
        </td>
        <td
          className="col-3"
          onClick={(e) => {
            e.preventDefault();
            handleCharacterChange(
              props.fav.account_name,
              props.fav.name,
              props.fav.id
            );
          }}
        >
          {props.fav.level}
        </td>
        <td className="col-3">
          <AiFillDelete size="2em" onClick={() => removeCheck()} />
        </td>
      </tr>
    );
  } else if (deleted) {
    return (
      <tr id="favouriteList" className="d-flex">
        <td
          className="col-12"
          style={{ backgroundColor: "rgba(249, 189, 189, 0.5", color: "white" }}
          id="deleted"
        >
          Deleted!
        </td>
      </tr>
    );
  } else {
    return (
      <tr id="favouriteList" className="d-flex">
        <td
          className="col-12 trash"
          style={{ backgroundColor: "rgba(249, 189, 189, 0.5", color: "white" }}
        >
          <a
            href="#"
            onClick={() => handleRemoveFavourite(props.fav.character_name)}
            variant="primary"
            size="lg"
          >
            Are you sure you want to remove from favourites?
            <AiFillDelete size="3em"></AiFillDelete>
          </a>{" "}
        </td>
      </tr>
    );
  }
}
