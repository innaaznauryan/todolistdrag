import {useState, memo} from "react"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {BOARDS} from "./globalVars"
import {Item} from "./Item"
import {Edit} from "./Edit"
import {Delete} from "./Delete"
import "./list.scss"

export const List = memo(({
  boardId, 
  name, 
  color,
  items,
  boards, 
  setBoards, 
  stringValidate, 
  formatText, 
  formatTitle,
  draggableItem,
  setDraggableItem,
  sourceBoardId,
  setSourceBoardId
}) => {

  const [editMode, setEditMode] = useState({mode: false, id: null, boardId: null, toEdit: null})
  const [deleteMode, setDeleteMode] = useState({mode: false, id: null, boardId: null})
  const [focused, setFocused] = useState(false)

  const allowDrop = e => {
    if(e.target.classList.contains("list")) {
      e.preventDefault()
    }
  }

  const handleDrop = () => {
    setFocused(false)
    const newBoards = (boards => boards.map(board => {
      if(board.id === sourceBoardId) {
        return {...board, items: board.items.filter(item => item.id !== draggableItem.id)}
      } else if (board.id === boardId) {
        return {...board, items: [...board.items, draggableItem]}
      } else {
        return board
      }
    }))(boards)
    setBoards(newBoards)
    localStorage.setItem(BOARDS, JSON.stringify(newBoards))
  }

  const handleDragEnter = e => {
    if(e.target === e.currentTarget) {
    setFocused(true)
    }
  }

  const handleDragLeave = (e) => {
    if(e.target === e.currentTarget) {
      setFocused(false)
    }
  }

  const deleteBoard = () => {
    const newBoards = (boards => {
      return boards.filter(board => board.id !== boardId)
    })(boards)
    setBoards(newBoards)
    localStorage.setItem(BOARDS, JSON.stringify(newBoards))
  }

  return (
    <>
      <div 
        className="list" 
        onDragOver={allowDrop} 
        onDrop={handleDrop} 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave} 
        style={{backgroundColor: focused ? "gray" : color}}>
          <div className="borderName">
            <h2>{name}</h2>
            <AiFillEdit onClick={() => setEditMode({mode: true, id: null, boardId: boardId, toEdit: "board"})} />
            <AiFillDelete onClick={deleteBoard} />
          </div>
        
        {items
        .map(({id, title, description}) => {
              return <Item 
                key={id} 
                id={id} 
                title={title} 
                description={description} 
                boardId={boardId} 
                setEditMode={setEditMode} 
                setDeleteMode={setDeleteMode}
                draggableItem={draggableItem}
                setDraggableItem={setDraggableItem}
                setSourceBoardId={setSourceBoardId}
              />
            })
        }
      </div>
      
      {editMode.mode && <Edit 
        boards={boards} 
        setBoards={setBoards} 
        id={editMode.id} 
        boardId={editMode.boardId}
        toEdit={editMode.toEdit}
        setEditMode={setEditMode} 
        stringValidate={stringValidate}
        formatText={formatText}
        formatTitle={formatTitle} />}
      {deleteMode.mode && <Delete 
        boards={boards} 
        setBoards={setBoards} 
        id={deleteMode.id} 
        boardId={deleteMode.boardId} 
        setDeleteMode={setDeleteMode} />}
    </>
  )
})