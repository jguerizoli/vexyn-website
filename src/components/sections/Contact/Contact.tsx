import React, { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../../common/Button/Button';

export default function Contact() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.message) newErrors.message = true;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  return (
    <section id="contact-form" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.info}>
          <h2 className={styles.title}>START A<br />PROJECT</h2>
          <p className={styles.description}>
            LET'S BUILD THE NEXT GENERATION OF YOUR DIGITAL PRESENCE WITH SURGICAL PRECISION.
          </p>
          
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>LOCATION</span>
              <span className={styles.detailValue}>SÃO PAULO / BR</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>EMAIL</span>
              <span className={styles.detailValue}>HELLO@VEXYN.COM</span>
            </div>
          </div>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup} ${errors.name ? styles.hasError : ''}`}>
            <label className={styles.label}>
              NAME {errors.name && <span className={styles.errorMarker}>[ERROR_NULL_INPUT]</span>}
            </label>
            <input 
              type="text" 
              name="name"
              className={styles.input} 
              placeholder="YOUR FULL NAME" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${styles.inputGroup} ${errors.email ? styles.hasError : ''}`}>
            <label className={styles.label}>
              EMAIL {errors.email && <span className={styles.errorMarker}>[ERROR_NULL_INPUT]</span>}
            </label>
            <input 
              type="email" 
              name="email"
              className={styles.input} 
              placeholder="EMAIL@EXAMPLE.COM" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${styles.inputGroup} ${errors.message ? styles.hasError : ''}`}>
            <label className={styles.label}>
              MESSAGE {errors.message && <span className={styles.errorMarker}>[ERROR_NULL_INPUT]</span>}
            </label>
            <textarea 
              name="message"
              className={`${styles.input} ${styles.textarea}`} 
              placeholder="TELL US ABOUT YOUR PROJECT" 
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <Button variant="primary" size="lg" type="submit" className={styles.submitBtn}>
            SEND MESSAGE
            <span style={{ marginLeft: '1rem' }}>→</span>
          </Button>
        </form>
      </div>
    </section>
  );
}
