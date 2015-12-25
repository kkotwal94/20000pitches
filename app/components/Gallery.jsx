import React from 'react';

import styles from 'scss/components/_about';

export default class Gallery extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>Gallery page</h1>
        <p className={styles.about__description}>Gallery stuff</p>
      </div>
    );
  }
}
