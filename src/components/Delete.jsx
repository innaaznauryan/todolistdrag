import React from 'react'

const Delete = ({list, id, setDeleteMode, deleteItem}) => {
  return (
    <>
        <div className="veil"></div>
        <div className="modal">
            <h1>Delete</h1>
            <p>Are you sure you want to delete this task?</p>
            <p>{list.find(item => item.id === id).title}</p>
            <p>{list.find(item => item.id === id).description}</p>
            <button type='button' onClick={() => setDeleteMode({mode: false, id: null})}>Cancel</button>
            <button type='button' onClick={() => deleteItem(id)}>Delete</button>
        </div>
    </>
  )
}

export default Delete