import React from 'react';
import styles from '../styles/TeamMemberCard.module.css';

const TeamMemberCard = ({ name, position, image }) => {
  return (
    <div className={styles.memberContainer}>
    <div className={styles.imageContainer}>
      <img src={image} alt={name} className={styles.memberImage} />
    </div>
    <div className={styles.textContainer}>
      <h3 className={styles.memberName}>{name}</h3>
      <p className={styles.memberPosition}>{position}</p>
    </div>
  </div>
  );
};

export default TeamMemberCard;
