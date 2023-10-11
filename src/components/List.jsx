import {useState} from "react"
import Item from "./Item"
import Edit from "./Edit"
import Delete from "./Delete"
import "./list.scss"

const List = ({name, status, boards, setBoards, stringValidate}) => {

  const [editMode, setEditMode] = useState({mode: false, id: null})
  const [deleteMode, setDeleteMode] = useState({mode: false, id: null})

  function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const allowDrop = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    const draggableItem = JSON.parse(e.dataTransfer.getData("draggable_item"))
    if(boards.find(board => board.status === status).items.find(item => item.id === draggableItem.id)) {
      return
    }
    setBoards(prev => {
      return prev.map(board => board.status === status ? {...board, items: [...board.items, draggableItem]} : board)
    })
    // localStorage set 
  }

  const handleDragEnter = (e) => {
      const draggableItem = JSON.parse(e.dataTransfer.getData("draggable_item"))
  }

  return (
    <>
      <div className={status} onDragOver={allowDrop} onDrop={handleDrop} onDragEnter={handleDragEnter} style={{backgroundColor: getRandomColor()}} >
        <h2>{name}</h2>
        {boards
        .find(board => board.status === status)
        .items
        .map(({id, title, description}) => {
              return <Item key={id} id={id} title={title} description={description} status={status} setEditMode={setEditMode} setDeleteMode={setDeleteMode} />
            })
        }
      </div>
      
      {editMode.mode && <Edit boards={boards} setBoards={setBoards} id={editMode.id} status={editMode.status} setEditMode={setEditMode} stringValidate={stringValidate} />}
      {deleteMode.mode && <Delete boards={boards} setBoards={setBoards} id={deleteMode.id} status={deleteMode.status} setDeleteMode={setDeleteMode} />}
    </>
  )
}

export default List