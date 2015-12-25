import React from 'react';

import styles from 'scss/components/_about';

export default class About extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>About 20,000 pitches</h1>
        <p className={styles.about__description}>About 20,000 pitches and how we plan to change the pitch world</p>
      </div>
    );
  }
}
