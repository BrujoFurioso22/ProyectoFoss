import React from 'react'

export const Puntaje = (props) => {
  return (
    <div>
        <div>
            <span>Puntaje:</span>
            <span>{props.puntaje}/{props.puntajetotal}</span>
        </div>
    </div>
  )
}
