import React, { FunctionComponent } from 'react';
import classes from './app-Header.module.css';

export interface AppHeaderProps {
  title: string;
}

export const AppHeader: FunctionComponent<AppHeaderProps> = ({ title }): JSX.Element =>
  <>
    <header className={classes["App-Header"]}>
      <h1>{title}</h1>
    </header>
  </>

export default AppHeader;
