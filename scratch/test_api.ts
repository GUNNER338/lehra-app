
import axios from 'axios';

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/tempo/calculate', {
      bpm: 60,
      notes: [
        { note: 'Sa', duration: 1 },
        { note: 'Re', duration: 1 },
        { note: 'Ga', duration: 2 }
      ]
    });
    console.log('Response:', JSON.stringify(res.data, null, 2));
  } catch (err: any) {
    console.error('Error:', err.response?.data || err.message);
  }
}

test();
