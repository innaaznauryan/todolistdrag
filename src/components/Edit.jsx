import {useState, memo} from 'react'
import {BOARDS, EDITTITLE, EDITDESCRIPTION, EDITBOARD} from "./globalVars"
import {InputEdit} from './InputEdit'

export const Edit = memo(({
    boards, 
    setBoards, 
    id, 
    boardId, 
    toEdit, 
    setEditMode, 
    stringValidate, 
    formatText, 
    formatTitle
}) => {
    const [itemInfo, setItemInfo] = useState(() => {
        const itemToEdit = boards.find(board => board.id === boardId).items.find(item => item.id === id)
        return {
            editTitle: itemToEdit?.title,
            editDescription: itemToEdit?.description
        }
    })
    const [boardInfo, setBoardInfo] = useState(() => {
        const boardToEdit = boards.find(board => board.id === boardId)
        return {
            editBoard: boardToEdit.name
        }
    })

    const handleEditChange = (toEdit) => (e) => {
        switch(toEdit) {
            case "item":
                setItemInfo({...itemInfo, [e.target.name]: e.target.value})
                break
            case "board":
                setBoardInfo({...boardInfo, [e.target.name]: e.target.value})
                break
            default:
                break
        }
    }

    const handleSubmit = (toEdit) => (e) => {
        e.preventDefault()
        switch(toEdit) {
            case "item":
                editItem(id, e.target.editTitle.value, e.target.editDescription.value)
                break
            case "board":
                editBoard(boardId, e.target.editBoard.value)
                break
            default:
                break
        }
    }

    const editItem = (id, title, description) => {
        try {
            stringValidate(id, title, description)
            const updatedItem = {id, title: formatTitle(title), description: formatText(description)}
            const newBoards = (boards => {
                return boards.map(board => board.id === boardId ? {...board, items: board.items.map(item => item.id === id ? updatedItem : item)} : board)
              })(boards)
            setBoards(newBoards)
            localStorage.setItem(BOARDS, JSON.stringify(newBoards))
        } catch (error) {
            console.log(error)
        } finally {
            setEditMode({mode: false, id: null, boardId: null, toEdit: null})
        }
    }

    const editBoard = (boardId, name) => {
        try {
            stringValidate(boardId, name)
            const newBoards = (boards => {
                return boards.map(board => board.id === boardId ? {...board, name: formatTitle(name)} : board)
            })(boards)
            setBoards(newBoards)
            localStorage.setItem(BOARDS, JSON.stringify(newBoards))
        } catch (error) {
            console.log(error)
        } finally {
            setEditMode({mode: false, id: null, boardId: null, toEdit: null})
        }
    }

  return (
    <>
    <div className="veil"></div>
    <div className="modal">
        <h1>Edit</h1>
        <form onSubmit={handleSubmit(toEdit)} className='flex'>
            {toEdit === "item" ?
                <>
                    <InputEdit toEdit={toEdit} valueType={EDITTITLE} handleEditChange={handleEditChange} editInfo={itemInfo} />
                    <InputEdit toEdit={toEdit} valueType={EDITDESCRIPTION} handleEditChange={handleEditChange} editInfo={itemInfo} />
                </>  
            :
                <InputEdit toEdit={toEdit} valueType={EDITBOARD} handleEditChange={handleEditChange} editInfo={boardInfo} />}
            
            <div className="btns">
                <button type='button' onClick={() => setEditMode({mode: false, id: null, status: null})}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
    </>
  )
})
