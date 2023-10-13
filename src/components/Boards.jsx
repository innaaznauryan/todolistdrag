import {useEffect, useState} from "react"
import {v4 as uuidv4} from 'uuid'
import {INITIALBOARDS, BOARDS, MAINBOARD} from "./globalVars"
import {List} from "./List"
import "./boards.scss"

export const Boards = () => {
    const [boards, setBoards] = useState(() => localStorage.boards ? JSON.parse(localStorage.boards) : INITIALBOARDS)
    const [error, setError] = useState(null)

    useEffect(() => {
        localStorage.setItem(BOARDS, JSON.stringify(boards))
    }, [])

    function formatText (string) {
        return string
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .map((elem, index) => index === 0 ? elem[0].toUpperCase()+elem.slice(1).toLowerCase() : elem.toLowerCase())
            .join(" ")
    }

    function formatTitle (string) {
        return string
            .replace(/[\\\s-_/.,]+/g, " ")
            .trim()
            .split(" ")
            .map(elem => elem[0].toUpperCase()+elem.slice(1).toLowerCase())
            .join(" ")
    }

    function stringValidate (...strings) {
        if(strings.some(string => !string.replace(/\s+/g, " ").trim())) {
            setError("Please fill the form!")
            setTimeout(() => {
                setError(null)
            }, 2000);
            throw new Error("empty value")
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const addItem = (e) => {
        e.preventDefault()
        const {title, description} = e.target 
        try{
            stringValidate(title.value, description.value)
            const newItem = {
                id: uuidv4(),
                title: formatTitle(title.value),
                description: formatText(description.value)
            }
            const newBoards = (boards =>{
                return boards.map(board => board.name === MAINBOARD ? {...board, items: [...board.items,newItem]} : board)
            })(boards)
            setBoards(newBoards)
            localStorage.setItem(BOARDS, JSON.stringify(newBoards))
        } catch (error) {
            console.log(error)
        } finally {
            e.target.reset()
        }
    }

    const addBoard = (e) => {
        e.preventDefault()
        const {boardName} = e.target
        try {
            stringValidate(boardName.value)
            const newBoard = {
                id: uuidv4(),
                name: formatTitle(boardName.value),
                color: getRandomColor(),
                items: []
            }
            setBoards(prev => [...prev, newBoard])
            localStorage.setItem(BOARDS, JSON.stringify((boards => [...boards, newBoard])(boards)))
        } catch (error) {
            console.log(error)
        } finally {
            e.target.reset()
        }
    }

  return (
<>
    <div className="boards">
        {boards.map(({id, name, color}) => {
            return <List 
                key={id}
                boardId={id} 
                name={name}
                color={color}
                boards={boards} 
                setBoards={setBoards} 
                stringValidate={stringValidate}
                formatText={formatText}
                formatTitle={formatTitle}
            />
        })}
    </div>
    <form className="add-item" onSubmit={addItem}>
        <input type="text" name="title" id="title" placeholder="Title" required/>
        <input type="text" name="description" id="description" placeholder="Description" required/>
        <button type="submit">Add Item</button>
    </form>
    <form className="add-board" onSubmit={addBoard}>
        <input type="text" name="boardName" id="boardName" placeholder="Status" required />
        <button type="submit">Add Board</button>
    </form>

    <p className="error">{error || ""}</p>
</>
  )
}