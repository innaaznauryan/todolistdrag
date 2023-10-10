import {useState} from "react"
import Edit from "./Edit"
import Delete from "./Delete"
import List from "./List"
import "./boards.scss"

const Boards = () => {

    const [currentId, setCurrentId] = useState(() => {
        let ID
        if(!localStorage.getItem("currentId")) {
            ID = 1
            localStorage.setItem("currentId", ID)
        } else {
            ID = +localStorage.getItem("currentId")
        }
        return ID
    })
    const [boards, setBoards] = useState(() => {
        let BOARDS
        if (!localStorage.getItem("boards")) {
            BOARDS = [
                {
                    id: "board-1",
                    name: "To do",
                    status: "to_do",
                    items: []
                },
                {
                    id: "board-2",
                    name: "In progress",
                    status: "in_progress",
                    items: []
                },
                {
                    id: "board-3",
                    name: "Completed",
                    status: "completed",
                    items: []
                }
            ]
            localStorage.setItem("boards", JSON.stringify(BOARDS))
        } else {
            BOARDS = JSON.parse(localStorage.getItem("boards"))
        }
        return BOARDS
    })

    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState({mode: false, id: null})
    const [deleteMode, setDeleteMode] = useState({mode: false, id: null})

    function format (string) {
        return string.trim().replace(/\s+/g, " ")
    }
    function stringValidate (...strings) {
        if(strings.some(string => !format(string))) {
            setError("Please fill the form!")
            setTimeout(() => {
                setError(null)
            }, 2000);
            throw new Error("empty value")
        }
    }
    function numValidate(num) {
        if(!Number.isFinite(num)) {
            throw new Error("wrong datatype")
        }
    }

    const addItem = (e) => {
        e.preventDefault()
        const {title, description} = e.target 
        try{
            stringValidate(title.value, description.value)
            const newItem = {
                id: currentId,
                ...Object.fromEntries([...new FormData(e.target)])
            }
            const boardsCopy = [...boards]
            const bordIndex = boardsCopy.findIndex(board => board.status === "to_do")
            boardsCopy[bordIndex].items.push(newItem)
            localStorage.setItem("boards", JSON.stringify(boardsCopy))
            localStorage.setItem("currentId", currentId + 1)
            setBoards(boardsCopy)
            setCurrentId(prev => prev + 1)
        } catch (error) {
            console.log(error)
        } finally {
            e.target.reset()
        }
    }



    
    // const editItem = (id, title, description) => {
    //     try {
    //         numValidate(id)
    //         stringValidate(title, description)
    //         const updatedItem = {id, title, description, status: "to-do"}
    //         const updatedList = list.with(list.findIndex(item => item.id === id), updatedItem)
    //         setList(updatedList)
    //         localStorage.setItem("list", JSON.stringify(updatedList))
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setEditMode({mode: false, id: null})
    //     }
    // }

    // const deleteItem = (id) => {
    //     try {
    //         numValidate(id)
    //         const updatedList = list.filter(item => item.id != id)
    //         setList(updatedList)
    //         localStorage.setItem("list", updatedList)
    //         setDeleteMode({mode: false, id: null})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

  return (
<>
    <div className="boards">
        {boards.map(({id, name, status}) => {
            return <List key={id} name={name} status={status} boards={boards} setBoards={setBoards} setEditMode={setEditMode} setDeleteMode={setDeleteMode} />
        })}
    </div>
    <form className="add-item" onSubmit={addItem}>
        <input type="text" name="title" id="title" placeholder="Title" required/>
        <input type="text" name="description" id="description" placeholder="Description" required/>
        <button type="submit">Add</button>
    </form>

    {error && <p className="error">{error}</p>}
    {/* {editMode.mode && <Edit list={list} id={editMode.id} setEditMode={setEditMode} editItem={editItem} error={error} />}
    {deleteMode.mode && <Delete list={list} id={deleteMode.id} setDeleteMode={setDeleteMode} deleteItem={deleteItem} />} */}
</>
  )
}

export default Boards