import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import "./item.scss"

const Item = ({id, title, description, status, boards, setBoards, setEditMode, setDeleteMode}) => {

    const handleDragStart = (e) => {
      e.dataTransfer.setData("draggable_id", id)
      e.dataTransfer.setData("draggable_status", status)
    }

  return (
    <div data-id={id} className="item" draggable onDragStart={handleDragStart}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="controls">
            <AiFillEdit className='edit' onClick={() => setEditMode({mode: true, id: id})} />
            <AiFillDelete className='delete' onClick={() => setDeleteMode({mode: true, id: id})} />
        </div>
    </div>
  )
}

export default Item