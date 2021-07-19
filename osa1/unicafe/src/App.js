import React, {useState} from 'react'



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseBad = () => setBad(bad + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseGood = () => setGood(good + 1)


  return (
    <div>
      <Header />
      <Button text = "bad" handleClick = {increaseBad} />
      <Button text = "neutral" handleClick = {increaseNeutral} />
      <Button text = "good" handleClick = {increaseGood} />
      <Stats bad = {bad} neutral = {neutral} good = {good} />
    </div>
  )
}

const Header = () => <h1>Give feedback</h1>

const Button = ({text, handleClick}) => {
    return ( 
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = ({bad , neutral, good}) => {

  const total = () => bad + neutral + good
  const average = () => (bad * -1 + good * 1) / total()
  const positive = () => good / total() * 100

  if(total() === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>
          Statistics
        </h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value= {good} />
            <StatisticLine text="Neutral" value= {neutral} />
            <StatisticLine text="Bad" value= {bad} />
            <StatisticLine text="Total" value= {total()} />
            <StatisticLine text="Average" value= {average()} />
            <StatisticLine text="Positive" value= {positive()} mark = {"%"} />
          </tbody>
        </table>
      </>
    )
  }
}

const StatisticLine = ({text, value, mark}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {mark}</td>
    </tr>
  )
}

export default App;
