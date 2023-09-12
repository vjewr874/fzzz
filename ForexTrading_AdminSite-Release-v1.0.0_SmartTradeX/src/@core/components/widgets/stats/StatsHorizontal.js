// ** Third Party Components
import PropTypes from 'prop-types'
import { Card, CardBody } from 'reactstrap'

const StatsHorizontal = ({ icon, color, stats, statTitle, className, ...rest }) => {
  return (
    <Card>
      <CardBody className={`${className} p-0`}>
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{ marginRight: "10px" }} className={`avatar avatar-stats p-50   ${color ? `bg-light-${color}` : 'bg-light-primary'}`}>
            <div className='avatar-content'>{icon}</div>
          </div>
          <div className='w-75'>
            <h2 className='font-weight-bolder mb-0 text-dot text-dot-1'>{stats}</h2>
            <p className='card-text'>{statTitle}</p>
          </div>

        </div>
      </CardBody>
    </Card>
  )
}

export default StatsHorizontal

// ** PropTypes
StatsHorizontal.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  className: PropTypes.string
}
