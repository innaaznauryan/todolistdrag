import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import "./item.scss"

export const Item = ({id, title, description, boardId, setEditMode, setDeleteMode, setDraggableItem}) => {

 
  const handleDragStart = () => {
    const draggableItem = {id, title, description}
    setDraggableItem(draggableItem)
    localStorage.setItem("draggableItem", JSON.stringify(draggableItem))
  }

  const handleDragEnd = () => {
    // setDraggableItem(null)
    // localStorage.removeItem("draggableItem")
  }

  return (
  <div data-id={id} className="item" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="controls">
      <AiFillEdit onClick={() => setEditMode({mode: true, id: id, boardId: boardId, toEdit: "item"})} />
      <AiFillDelete onClick={() => setDeleteMode({mode: true, id: id, boardId: boardId, toEdit: "item"})} />
    </div>
  </div>
  )
}