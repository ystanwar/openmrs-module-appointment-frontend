import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { appointmentTimePicker } from './TimePicker.module.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const AppointmentTimePicker = (props) => {
    const { intl, placeHolderTranslationKey, defaultValue } = props;

    const placeholder = intl.formatMessage({
        id: placeHolderTranslationKey, defaultMessage: defaultValue
    });

    return (
        <TimePicker
            onChange={props.onChange}
            showSecond={false}
            use12Hours
            placeholder={placeholder}
            className={appointmentTimePicker} />
    );
};

AppointmentTimePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeHolderTranslationKey: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired
}

export default injectIntl(AppointmentTimePicker);