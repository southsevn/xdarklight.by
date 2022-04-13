import apiClient from "@/services/apiClient";
const companyId = process.env.COMPANY_ID;

export default {
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