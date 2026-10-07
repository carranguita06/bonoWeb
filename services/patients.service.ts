import type { Patient } from "@/types/patient";
import { patients } from "@/mocks/patients";

export async function getPatients(): Promise<Patient[]> {
  return [...patients];
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  return patients.find((patient) => patient.id === id);
}

export async function searchPatients(query: string): Promise<Patient[]> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...patients];
  }

  return patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();

    return fullName.includes(normalizedQuery);
  });
}