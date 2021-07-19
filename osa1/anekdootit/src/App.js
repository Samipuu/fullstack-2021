import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the develpment time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood test when diagnosing patients.'
  ]

  

  const [selected, setSelected] = useState(0)
  const random = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0)) 

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const most = () => {
    let pos = 0
    let highest = 0
    let i = 0
    
    points.forEach(element => {
      if(element > highest) {
        pos = i
        highest = element
      }
      i++
    });
    
    return pos
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <Anecdote text = {anecdotes[selected]} points = {points[selected]} />
      <Button text = "Next one" handleClick = {random} />
      <Button text = "Vote" handleClick = {vote} />
      <h1>
        Most voted anecdote
      </h1>
      <Anecdote text = {anecdotes[most()]} points = {points[most()]} />
    </div>
  )
}

const Anecdote = ({text, points}) => {
  return(
    <>

      <p>
        {text}
        <br></br>
        <br></br>
        Has {points} votes
      </p>
    </>
  )
}

const Button = ({text, handleClick}) => {
  return ( 
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

export default App