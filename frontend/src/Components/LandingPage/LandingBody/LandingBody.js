import React from 'react';
import { Button } from '../../../Components';
import { Calendar, Free, Priority } from '../../../assets/icons';

import styles from './LandingBody.module.scss';

const LandingBody = () => {
  return (
    <>
      <div className={styles.BodyHeader}>
        <h2> Job Triage</h2>
        <h3>Interactive way to manage and track your job applications</h3>
        <span>
          <Button onClick={() => window.open('https://github.com/jobtriage/jobtriage', '_blank')}>Github</Button>
        </span>

      </div>
      <div className={styles.BodyContent}>
        <div className={styles.FirstSection}>
          <h2>What is triage?</h2>
          <p>
            Triage is the process of determining the priority of patient&apos;s treatments based on the severity of their condition.
            This rations patient treatment efficiently when resources are insufficient for all to be treated immediately, influencing the order and priority of emergency treatment, emergency transport, or transport destination for the patient.
          </p>
        </div>
        <div className={styles.SecondSection}>
          <h2>Job triage</h2>
          <p>
            Job triage lets you manage job applications based on priority in kanban board style.
            Add notes, tasks which needs to be addressed before appearing for interview.
            <b> Self analysis </b>
            will help you to prepare your personal pitch and STAR stories.
          </p>
        </div>
        <div className={styles.ThirdSection}>
          <h2>Features</h2>
          <div className={styles.Row}>
            <div className={styles.Col}>
              <img src={Priority} alt="priority" className={styles.RowIcons} />
              <p>Priority based</p>
            </div>
            <div className={styles.Col}>
              <img src={Calendar} alt="calendar" className={styles.RowIcons} />
              <p>Google calendar Integration</p>
            </div>
            <div className={styles.Col}>
              <img src={Free} alt="free" className={styles.RowIcons} />
              <p>Completely free</p>
            </div>
          </div>
        </div>
        <div className={styles.FourthSection}>
          <h2>Contributing</h2>
          <p>
            Job Triage is completely open source and free and it always will be.
            Contribute to Job Triage by creating &nbsp;
            <a href="https://github.com/jobtriage/jobtriage/issues" target="_blank" rel="noopener noreferrer">issues </a>
            and
            <a href="https://github.com/jobtriage/jobtriage/pulls" target="_blank" rel="noopener noreferrer"> Pull requests </a>
          </p>
        </div>
        <div className={styles.LastSection}>
          <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a>
              from
              <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
        </div>
      </div>
    </>
  );
};

export default LandingBody;
