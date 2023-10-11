import React from 'react'

const Delete = ({boards, setBoards, id, status, setDeleteMode}) => {

  const deleteItem = (id) => {
    try {
        if(typeof id != "string") {
          throw new Error("wrong datatype")
        }
        setBoards(prev => {
          return prev.map(board => board.status === status ? {...board, items: board.items.filter(item => item.id != id)} : board)
        })
        localStorage.setItem("boards", JSON.stringify(((boards)=>{
          return boards.map(board => board.status === status ? {...board, items: board.items.filter(item => item.id != id)} : board)
      })(boards)))
        setDeleteMode({mode: false, id: null, status: null})
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
            <p className='delete'>{boards.find(board => board.status === status).items.find(item => item.id === id).title}</p>
            <p className='delete'>{boards.find(board => board.status === status).items.find(item => item.id === id).description}</p>
            <div className="btns">
              <button type='button' onClick={() => setDeleteMode({mode: false, id: null, status: null})}>Cancel</button>
              <button type='button' onClick={() => deleteItem(id)}>Delete</button>
            </div>
        </div>
    </>
  )
}

export default Delete