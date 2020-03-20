import axios from 'axios';

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJkZXZpY2VVdWlkXCI6XCI4ZTU2MDRhZi05OWRiLTQ3YTUtYjVlOS00NjUwNDA0ODY2OTBcIixcImRldmljZVV1aWRTb3VyY2VcIjpcIkZJTkdFUlBSSU5UXCIsXCJpbXBsVmVyc2lvblwiOlwiMy4wXCIsXCJzb3VyY2VcIjpcIldFQl9QSFwiLFwiZXhwaXJpYXRpb25EYXRlXCI6MTYxMzg0MDU3OTkyMyxcImNyZWRlbnRpYWxzTm9uRXhwaXJlZFwiOnRydWUsXCJhY2NvdW50Tm9uRXhwaXJlZFwiOnRydWUsXCJhY2NvdW50Tm9uTG9ja2VkXCI6dHJ1ZSxcImVuYWJsZWRcIjp0cnVlfSJ9.Vb8z6yhQi8QUWqfsUR89pJbBv_tSF8hYpn7EBhLgTT2KPTicXey70_-UTOECjk2_KkBemBIA0yAHdR7lFTDLDg";

export const apiClient = axios.create({
  baseURL: 'https://stage-amrest.3e.pl/ordering-api/rest',
  headers: {
    'Accept-Language': 'en',
    'Source': 'WEB',
    'Brand': 'PH',
    'Authorization': 'Bearer ' + token
  }
});
