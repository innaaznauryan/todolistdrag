import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import "./item.scss"

const Item = ({id, title, description, status, setEditMode, setDeleteMode}) => {

    const handleDragStart = (e) => {
      e.dataTransfer.setData("draggable_item", JSON.stringify({id, title, description}))
    }

  return (
    <div data-id={id} className="item" draggable onDragStart={handleDragStart} >
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="controls">
            <AiFillEdit className='edit' onClick={() => setEditMode({mode: true, id: id, status: status})} />
            <AiFillDelete className='delete' onClick={() => setDeleteMode({mode: true, id: id, status: status})} />
        </div>
    </div>
  )
}

export default Item