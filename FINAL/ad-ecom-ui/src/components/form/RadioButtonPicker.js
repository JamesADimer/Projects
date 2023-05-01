import { React } from 'react';
import _ from 'lodash';
import FormItemRadio from './FormItemRadio';

/**
 * RadioButtonPicker
 * @param {props} string[]: options, string: id, object: newPromoData, bool: defaultOption
 * @returns radio button group component
 */
const RadioButtonPicker = ({
  options, id, onChange, newPromoData, defaultOption
}) => (
  <>
    {options && options.map((radio) => (

      <div key={radio}>
        <FormItemRadio
          name={id}
          id={id}
          label={_.capitalize(radio)}
          newPromoData={newPromoData}
          onChange={onChange}
          value={radio}
          defaultChecked={radio === defaultOption}
        />
      </div>
    ))}
  </>
);

export default RadioButtonPicker;
