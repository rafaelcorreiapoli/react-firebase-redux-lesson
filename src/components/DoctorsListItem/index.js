import React, { PropTypes } from 'react'

const DoctorsListItem = ({
  name,
  age
}) => (
  <div>
    <p>{name}</p>
    -
    <b>{age}</b>
  </div>
)

DoctorsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
}
export default DoctorsListItem
