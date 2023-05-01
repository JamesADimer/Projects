import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import styles from './FormItem.module.css';

const RatingWidget = ({
  onChange, value, precision, id, label, errorMessage
}) => (
  <div>
    <div className={styles.ratinglabel}>
      {label}
      <div className={styles.rating}>
        <Rating
          onChange={onChange}
          id={id}
          name={id}
          defaultValue={value}
          precision={precision}
          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
          sx={{
            mb: 0
          }}
        />
      </div>
    </div>
    <span className={styles.span}>{errorMessage}</span>
  </div>
);

export default RatingWidget;
