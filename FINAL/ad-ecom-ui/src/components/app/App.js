import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styles from './App.module.css';
import Home from '../home-page/Home';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import PatientsPage from '../patients-page/PatientsPage';
import CreatePatientPage from '../create-patient-page/CreatePatientPage';
import PatientDetails from '../patient-details-page/PatientDetails';
import CreateEncounterPage from '../create-encounter-page/CreateEncounterPage';
import EditEncounterPage from '../edit-encounter-page/EditEncounterPage';
import EditPatientPage from '../edit-patient-page/EditPatientPage';
/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className={styles.pageWrapper}>
    <BrowserRouter forceRefresh>
      <Header />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/patients" render={() => <PatientsPage />} />
          <Route exact path="/patients/create" render={() => <CreatePatientPage />} />
          <Route exact path="/patients/:patientId" render={() => <PatientDetails />} />
          <Route exact path="/patients/:patientId/encounters/create" render={() => <CreateEncounterPage />} />
          <Route exact path="/patients/:patientId/encounters/:encounterId/edit" render={() => <EditEncounterPage />} />
          <Route exact path="/patients/:patientId/edit" render={() => <EditPatientPage />} />
        </Switch>
        <ToastContainer />
      </div>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
