import React from 'react';

import styles from 'scss/components/_about';

export default class Pitch extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>Create Pitch</h1>
        <p className={styles.about__description}>Create Pitch here!</p>
      </div>
    );
  }
}
