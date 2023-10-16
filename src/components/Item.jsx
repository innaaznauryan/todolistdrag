import {memo} from "react"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import "./item.scss"

export const Item = memo(({
  id, 
  title, 
  description, 
  boardId, 
  setEditMode, 
  setDeleteMode, 
  setDraggableItem,
  setSourceBoardId
}) => {

  const handleDragStart = () => {
    setDraggableItem({id, title, description})
    setSourceBoardId(boardId)
  }

  return (
  <div 
    data-id={id} 
    className="item" 
    draggable 
    onDragStart={handleDragStart} >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="controls">
        <AiFillEdit onClick={() => setEditMode({mode: true, id: id, boardId: boardId, toEdit: "item"})} />
        <AiFillDelete onClick={() => setDeleteMode({mode: true, id: id, boardId: boardId, toEdit: "item"})} />
      </div>
  </div>
  )
})