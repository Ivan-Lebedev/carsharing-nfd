export const actionsHeaders = (basicToken) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${basicToken}`,
  },
})

export const getHeaders = (basicToken) => ({
  headers: {
    Authorization: `Bearer ${basicToken}`,
  },
})

export const authHeaders = (basicToken) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${basicToken}`,
  },
})

export const defaultHeaders = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  Authorization: "Bearer 4cbcea96de",
}
