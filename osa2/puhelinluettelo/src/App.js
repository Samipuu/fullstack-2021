import React, { useState, useEffect } from 'react'
import personServer from './services/personServer'

const App = () => {
  const [ persons, setPersons] = useState([]) 

  const fetchPersons = () => {
    personServer
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  } 
  
  useEffect(fetchPersons, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.some(per => per.name === newName)) {
        
      const modPerson = persons.find(person => person.name === newName)
      const confirmation = window.confirm(`${newName} is aleady added to phonebook. Do you want to replace the number ${modPerson.number} with ${newNumber}?`)

      if(confirmation) {
        personServer
          .update(modPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== modPerson.id ? person : response))
            setNotification("Number for " + modPerson.name + " have been changed to " + newNumber + ".") 
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          })
          .catch(error => {
            setErrorMessage(modPerson.name + " is already removed from the server")
            setPersons(persons.filter(person => person.id !== modPerson.id))
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }

      } else {
        personServer
          .create(newPerson)
          .then(response => {
            setPersons(persons.concat(response))
            setNotification(newName + " have been added to the Phonebook") 
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          })
        }
      
    setNewName('')
    setNewNumber('')  
  
  }
  
  const removePerson = (event) => {
    const id = parseInt(event.target.id)

    const removable = persons.find(person => {
      return person.id === id
    })

    const confirm = window.confirm("Are you sure you want to remove " + removable.name)
    if(confirm) {
      personServer
        .remove(id)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response)
          )

          setNotification(removable.name + " have been removed") 
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          setErrorMessage(removable.name + " is already removed from the server")
          setPersons(persons.filter(person => person.id !== removable.id))
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter = {filter} handleFilter = {handleFilter} />
      <ErrorMessage errorMessage = {errorMessage} />
      <Notification notification = {notification} />
      <Form addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Content persons = {persons} removePerson={removePerson} filter = {filter} />
    </div>
  )
  
}

const Filter = ({filter, handleFilter}) => {
  return (
    <p>
      Filter: <input value = {filter} onChange = {handleFilter} />
    </p>
  )
}

const Form = (props) => {
  return (
    <form onSubmit = {props.addPerson}>
        <h2>Add new person</h2>
        <div>
          Name: <input value = {props.newName} onChange = {props.handleNameChange} />
          <br></br>
          Number: <input value = {props.newNumber} onChange = {props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Content = ({persons, filter, removePerson}) => {
  return (
    <div>
      {persons.map(person => {
        if(typeof(person.name) === "undefined") {
          return null
        }
        if(person.name.toLowerCase().includes(filter.toLowerCase())) {
          return Person({person, removePerson})
        }
        return null
      })} 
    </div>
  )
}

const Notification = ({notification}) => {
  const notiStyle = {
    color: 'green',
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'green',
    borderStyle: "solid",
    display: "inline",
    backgroundColor: 'rgb(190,190,190)',
    padding: 5
  }

  if (notification === null) {
    return null
  }

  return (
    <div className="notification" style={notiStyle}>
      {notification}
    </div>
  )
}

const ErrorMessage = ({errorMessage}) => {
  const errorStyle = {
    color: 'red',
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'red',
    borderStyle: "solid",
    display: "inline",
    backgroundColor: 'rgb(190,190,190)',
    padding: 5
  }

  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {errorMessage}
    </div>
  )
}

const Person = ({person, removePerson}) => {
  return (
    <p key = {person.id}>
      {person.name} {person.number} <ButtonDelete removePerson={removePerson} id={person.id} />
    </p>
  )
}

const ButtonDelete = ({id, removePerson}) => {
  return (
    <button type="button" id={id} onClick={removePerson}>Delete</button>
  )
}

export default App