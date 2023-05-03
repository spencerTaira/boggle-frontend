const URL = process.env.BACKENDURL || 'http://localhost:8000';
console.log('BACKEND ENV VARIABLE', process.env.BACKENDURL, 'THIS HAS ENDED');
export default URL;
