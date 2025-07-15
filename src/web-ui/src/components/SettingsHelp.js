import React from "react"
import { Alert, Row } from "react-bootstrap"

const SettingsHelp = ({ show }) => {
  if (show) {
    return (
      <Row>
        <Alert bsStyle="danger" className="text-center">
          There is an issue with your settings configuration.
        </Alert>
      </Row>
    )
  }
  return ""
}

export default SettingsHelp
