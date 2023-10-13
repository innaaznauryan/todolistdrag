import {memo} from "react"
import {BOARDS} from "./globalVars"

export const Delete = memo(({
  boards, 
  setBoards, 
  id, 
  boardId, 
  setDeleteMode
}) => {

  const deleteItem = (id) => {
    try {
        if(typeof id !== "string") {
          throw new Error("wrong datatype")
        }
        setBoards(prev => {
          return prev.map(board => board.id === boardId ? {...board, items: board.items.filter(item => item.id != id)} : board)
        })
        localStorage.setItem(BOARDS, JSON.stringify(((boards)=>{
          return boards.map(board => board.id === boardId ? {...board, items: board.items.filter(item => item.id != id)} : board)
      })(boards)))
        setDeleteMode({mode: false, id: null, boardId: null})
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
        <div className="veil"></div>
        <div className="modal flex">
            <h1>Delete</h1>
            <p>Are you sure you want to delete this task?</p>
            <p className='deleteInfo'>{boards.find(board => board.id === boardId).items.find(item => item.id === id).title}</p>
            <p className='deleteInfo'>{boards.find(board => board.id === boardId).items.find(item => item.id === id).description}</p>
            <div className="btns">
              <button type='button' onClick={() => setDeleteMode({mode: false, id: null, boardId: null})}>Cancel</button>
              <button type='button' onClick={() => deleteItem(id)}>Delete</button>
            </div>
        </div>
    </>
  )
})