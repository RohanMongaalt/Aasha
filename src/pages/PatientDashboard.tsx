import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "@/components/Dashboard";

const PatientDashboard = () => {
  const [patientSession, setPatientSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('patientSession');
    if (!session) {
      navigate('/patient-login');
      return;
    }
    setPatientSession(JSON.parse(session));
  }, [navigate]);

  if (!patientSession) {
    return null;
  }

  return <Dashboard isPatient={true} patientSession={patientSession} />;
};

export default PatientDashboard;