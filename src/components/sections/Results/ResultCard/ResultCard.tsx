import React, { forwardRef } from 'react';
import styles from './ResultCard.module.css';

interface Review {
  quote: string;
  author: string;
  client: string;
  metric: string;
}

interface ResultCardProps {
  review: Review;
  style?: React.CSSProperties;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ review, style }, ref) => {
  return (
    <article 
      className={styles.card} 
      ref={ref}
      style={style}
      data-animate="card"
    >
      <div className={styles.inner}>
        <div className={styles.quoteMark} aria-hidden="true">"</div>
        <div className={styles.text} data-animate="content">
          <p>{review.quote}</p>
        </div>
        <footer className={styles.footer}>
          <cite className={styles.author}>{review.author}</cite>
          <span className={styles.divider} aria-hidden="true">|</span>
          <span className={styles.client}>{review.client}</span>
        </footer>
      </div>
    </article>
  );
});

ResultCard.displayName = 'ResultCard';

export default ResultCard;
