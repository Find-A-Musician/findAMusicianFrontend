function findUrl() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:8000';
    case 'production':
      return ''; // need to determine when prod
  }
}

const apiUrl = findUrl();

export { apiUrl };
