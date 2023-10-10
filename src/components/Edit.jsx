import React, { useState } from 'react'

const Edit = ({list, id, setEditMode, editItem, error}) => {

    const [editInfo, setEditInfo] = useState(() => {
        const itemToEdit = list.find(item => item.id === id)
        return {
            editTitle: itemToEdit.title,
            editDescription: itemToEdit.description
        }
    })

    const handleEditChange = (e) => {
        setEditInfo({...editInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editItem(id, e.target.editTitle.value, e.target.editDescription.value)
    }

  return (
    <>
    <div className="veil"></div>
    <div className="modal">
        <h1>Edit</h1>
        <form onSubmit={handleSubmit}>
            <input onChange={handleEditChange} type="text" name="editTitle" id='editTitle' value={editInfo.editTitle} />
            <input onChange={handleEditChange} type="text" name="editDescription" id='editDescription' value={editInfo.editDescription} />
            <button type='button' onClick={() => setEditMode({mode: false, id: null})}>Cancel</button>
            <button type='submit'>Save</button>
        </form>
        {error && <p className="error">{error}</p>}
    </div>
    </>
  )
}

export default Edit