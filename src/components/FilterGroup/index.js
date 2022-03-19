import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderRadioButtonInput = () => {
    const {onRadioButtonOption} = props

    const onGetRadioOption = event => {
      onRadioButtonOption(event.target.id)
    }
    return (
      <ul className="salary-list-container">
        <h1 className="salary-range-text">Salary Range</h1>
        {salaryRangesList.map(eachItem => (
          <li className="salary-item" key={eachItem.salaryRangeId}>
            <input
              onChange={onGetRadioOption}
              type="radio"
              name="option"
              id={eachItem.salaryRangeId}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    )
  }

  const renderCheckBoxInput = () => {
    const {onCheckBoxOption} = props

    const getCheckboxOption = event => {
      onCheckBoxOption(event.target.id)
    }

    return (
      <ul className="employee-list-container">
        <h1 className="employee-type-text">Type of Employment</h1>
        {employmentTypesList.map(eachItem => (
          <li className="employee-item" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              onChange={getCheckboxOption}
              id={eachItem.employmentTypeId}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="filter-container">
      {renderCheckBoxInput()}

      {renderRadioButtonInput()}
    </div>
  )
}

export default FilterGroup
