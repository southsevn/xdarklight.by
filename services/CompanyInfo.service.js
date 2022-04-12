import apiClient from "@/services/apiClient";
const companyId = process.env.COMPANY_ID;

export default {
  getCareDescription() {
    return apiClient.$get(`/companies/${companyId}/care`);
  },
  getDeliveryDescription() {
    return apiClient.$get(`/companies/${companyId}/delivery`);
  },
  getPaymentDescription() {
    return apiClient.$get(`/companies/${companyId}/payments`);
  }
}