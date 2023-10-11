import {useState} from 'react'

const Edit = ({boards, setBoards, id, status, setEditMode, stringValidate}) => {

    const [editInfo, setEditInfo] = useState(() => {
        const itemToEdit = boards.find(board => board.status === status).items.find(item => item.id === id)
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

    const editItem = (id, title, description) => {
        try {
            stringValidate(id, title, description)
            const updatedItem = {id, title, description}
            setBoards(prev => {
              return prev.map(board => board.status === status ? {...board, items: board.items.map(item => item.id === id ? updatedItem : item)} : board)
            })
            localStorage.setItem("boards", JSON.stringify((boards => {
              return boards.map(board => board.status === status ? {...board, items: board.items.map(item => item.id === id ? updatedItem : item)} : board)
            })(boards)))
        } catch (error) {
            console.log(error)
        } finally {
            setEditMode({mode: false, id: null, status: null})
        }
      }

  return (
    <>
    <div className="veil"></div>
    <div className="modal">
        <h1>Edit</h1>
        <form onSubmit={handleSubmit} className='flex'>
            <input onChange={handleEditChange} type="text" name="editTitle" id='editTitle' value={editInfo.editTitle} />
            <input onChange={handleEditChange} type="text" name="editDescription" id='editDescription' value={editInfo.editDescription} />
            <div className="btns">
                <button type='button' onClick={() => setEditMode({mode: false, id: null, status: null})}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Edit