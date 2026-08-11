import api from './axios';

export const getIdeas = () => api.get('ideas/');
export const getIdea = (id) => api.get(`ideas/${id}/`);
export const getMyIdeas = () => api.get('ideas/my_ideas/');
export const createIdea = (formData) =>
  api.post('ideas/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateIdea = (id, formData) =>
  api.patch(`ideas/${id}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteIdea = (id) => api.delete(`ideas/${id}/`);

export const createAccessRequest = (ideaId, message) =>
  api.post('access-requests/', { idea: ideaId, message });
export const getMyAccessRequests = () => api.get('access-requests/');
export const approveRequest = (id) => api.post(`access-requests/${id}/approve/`);
export const denyRequest = (id) => api.post(`access-requests/${id}/deny/`);

export const getIdeaDocumentUrl = (id) => `${api.defaults.baseURL}ideas/${id}/document/`;

export const getComments = (ideaId) => api.get(`comments/?idea=${ideaId}`);
export const createComment = (ideaId, text) => api.post('comments/', { idea: ideaId, text });