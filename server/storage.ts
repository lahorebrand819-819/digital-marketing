import fs from 'fs';
import path from 'path';
import { AgencyData } from '../src/types';
import { initialAgencyData } from './initialData';
import {
  telcaPricingPackages,
  telcaFaqs,
  telcaClients,
  telcaProjects,
  telcaTasks,
  telcaCampaigns,
  telcaResearchProjects,
  telcaIntegrations,
  telcaAuditLogs,
  telcaInvoices,
  telcaNotifications,
  telcaLeads
} from './telcaData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Ensure necessary directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

let cachedData: AgencyData | null = null;

export function getData(): AgencyData {
  if (cachedData) {
    return cachedData;
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
      cachedData = JSON.parse(fileContent) as AgencyData;

      let changed = false;

      // Ensure all 10 service packages exist
      if (!cachedData.pricingPackages || cachedData.pricingPackages.length < 15) {
        cachedData.pricingPackages = telcaPricingPackages;
        changed = true;
      }

      // Ensure all 19 FAQs exist
      if (!cachedData.faqs || cachedData.faqs.length < 15) {
        cachedData.faqs = telcaFaqs;
        changed = true;
      }

      // Ensure leads exist
      if (!cachedData.leads || cachedData.leads.length === 0) {
        cachedData.leads = telcaLeads;
        changed = true;
      }

      // Ensure clients exist
      if (!cachedData.clients || cachedData.clients.length === 0) {
        cachedData.clients = telcaClients;
        changed = true;
      }

      // Ensure projects exist
      if (!cachedData.projects || cachedData.projects.length === 0) {
        cachedData.projects = telcaProjects;
        changed = true;
      }

      // Ensure tasks exist
      if (!cachedData.tasks || cachedData.tasks.length === 0) {
        cachedData.tasks = telcaTasks;
        changed = true;
      }

      // Ensure campaigns exist
      if (!cachedData.campaigns || cachedData.campaigns.length === 0) {
        cachedData.campaigns = telcaCampaigns;
        changed = true;
      }

      // Ensure research projects exist
      if (!cachedData.researchProjects || cachedData.researchProjects.length === 0) {
        cachedData.researchProjects = telcaResearchProjects;
        changed = true;
      }

      // Ensure integrations exist
      if (!cachedData.integrations || cachedData.integrations.length === 0) {
        cachedData.integrations = telcaIntegrations;
        changed = true;
      }

      // Ensure audit logs exist
      if (!cachedData.auditLogs || cachedData.auditLogs.length === 0) {
        cachedData.auditLogs = telcaAuditLogs;
        changed = true;
      }

      // Ensure invoices exist
      if (!cachedData.invoices || cachedData.invoices.length === 0) {
        cachedData.invoices = telcaInvoices;
        changed = true;
      }

      // Ensure notifications exist
      if (!cachedData.notifications || cachedData.notifications.length === 0) {
        cachedData.notifications = telcaNotifications;
        changed = true;
      }

      if (changed) {
        saveData(cachedData);
      }

      return cachedData;
    }
  } catch (error) {
    console.error('Error reading db.json, falling back to initial data:', error);
  }

  // Initialize with seed data
  cachedData = JSON.parse(JSON.stringify(initialAgencyData));
  cachedData!.pricingPackages = telcaPricingPackages;
  cachedData!.faqs = telcaFaqs;
  cachedData!.leads = telcaLeads;
  cachedData!.clients = telcaClients;
  cachedData!.projects = telcaProjects;
  cachedData!.tasks = telcaTasks;
  cachedData!.campaigns = telcaCampaigns;
  cachedData!.researchProjects = telcaResearchProjects;
  cachedData!.integrations = telcaIntegrations;
  cachedData!.auditLogs = telcaAuditLogs;
  cachedData!.invoices = telcaInvoices;
  cachedData!.notifications = telcaNotifications;
  saveData(cachedData as AgencyData);
  return cachedData as AgencyData;
}

export function saveData(data: AgencyData): boolean {
  try {
    cachedData = data;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving data to db.json:', error);
    return false;
  }
}
