import React from 'react'
import SecondaryButton from '../buttons/secondaryButton/SecondaryButton'


const ResetFilters = () => {

  const handlerButton = ()=> {
    setTimeout(function() {
      window.location.reload()
    }, 500)
    
  }

  return (
    <div>
      <SecondaryButton onClick={handlerButton}>
        Reset filters
      </SecondaryButton>
    </div>
  )
}

export default ResetFilters