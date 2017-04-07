import React, { PropTypes } from 'react'
import DoctorsListItem from '../DoctorsListItem'

const COLORS = [
  'red',
  'blue',
  'green'
]
const InjectRandomColor = colors => WrappedComponent =>
  class extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        color: 'red'
      }
    }

    componentDidMount () {
      setInterval(() => {
        this.setState({
          color: colors[Math.round(Math.random() * (COLORS.length - 1))]
        })
      }, 1000)
    }
    render () {
      return (
        <WrappedComponent
          {...this.props}
          color={this.state.color}
        />
      )
    }
  }

const Ball = ({
  color,
  radius,
  onClick
}) => (
  <div
    style={{
      backgroundColor: color,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius
    }}
    onClick={onClick}
  />
)

const BallWithRandomColor = InjectRandomColor(COLORS)(Ball)

const DoctorsList = ({
  doctors,
  loading,
  onClickBall
}) => (
  <div>
    <BallWithRandomColor
      radius={25}
      onClick={onClickBall}
    />
    <BallWithRandomColor
      radius={25}
    />
    {
      loading
      ? <p>Loadig..</p>
      : <div>
        {doctors.map(doctor => (
          <DoctorsListItem
            key={doctor.key}
            {...doctor}
          />
        ))}
      </div>
    }

  </div>
)

const doctorPropTypes = PropTypes.object({
  name: PropTypes.string.isRequired,
  age: PropTypes.number
})

DoctorsList.propTypes = {
  doctors: PropTypes.arrayOf(doctorPropTypes)
}
export default DoctorsList
/*
{
doctors: [{
name: 'Paulo'
}]
}
*/
