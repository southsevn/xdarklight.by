import apiClient from "@/services/apiClient";
const companyId = process.env.COMPANY_ID;

export const CompanyService = {
  getCurrencies() {
    return apiClient.$get(`/currencies`);
  },
  getCareContent() {
    return apiClient.$get(`/companies/${companyId}/care`);
  },
  getDeliveryContent() {
    return apiClient.$get(`/companies/${companyId}/delivery`);
  },
  getPaymentContent() {
    return apiClient.$get(`/companies/${companyId}/payments`);
  }
}